import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";
import parseToken from "lib/helpers/parseToken";
import { DateTime } from "luxon";

async function handler( req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const TABLE = "HabitEntry";

    let token = parseToken(req.headers.authorization);
    supabase.auth.setAuth(token);

    switch (method) {
        case 'GET':
            return res.status(200).send("get entry")
        case 'POST':
            return await CreateHabitEntry(req, res);
        case 'DELETE':
            return await DeleteHabitEntry(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    // TODO: get habit entries based on month using the query string
    

    // TODO: check for owner
    async function CreateHabitEntry( req: NextApiRequest, res: NextApiResponse ) {
        try {
            const habitId = req.query.id;
            
            const now = DateTime.now();
            const yesterday = now.minus({day: 1}).toISO();

            const { data: habit } = await supabase
                .from("Habit")
                .select()
                .eq("id", habitId)
                .limit(1)
                .single();

            if (habit === null) {
                // user is not the owner
                return res.status(403).end("Not authorized")
            }

            const { data: prevEntry } = await supabase
                .from(TABLE)
                .select()
                .eq("habitId", habitId)
                .lt("createdAt", now.toISO())
                .gt("createdAt", yesterday)
                .limit(1)
                .single()

            if ( prevEntry ) {
                const entryDate = DateTime.fromISO(prevEntry.createdAt);

                if (entryDate.day == now.day && entryDate.year == now.year && entryDate.month == now.month) {
                    // entry for today already exists do not create another one
                    return res.status(200).json(prevEntry);
                }
            }

            const data = {
                habitId, 
                createdAt: now.toISO(),
            };

            const { data: habitEntry, error } = await supabase
                .from(TABLE)
                .insert([{...data}])
                .single();

            if (error) {
                throw error;
            }

            return res.status(200).json(habitEntry);
        } catch(error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }

    async function DeleteHabitEntry( req: NextApiRequest, res: NextApiResponse ) {
       try {
            const habitId = req.query.id;

            const { data: habit } = await supabase
                .from("Habit")
                .select()
                .eq("id", habitId)
                .limit(1)
                .single();

            if (habit === null) {
                // user is not the owner
                return res.status(403).end("Not authorized")
            }

            // NOTE: payload should include the date
            const { createdAt } = req.body

            let validDate = DateTime.fromISO(createdAt).invalid;
            if (!createdAt || validDate) {
                return res.status(400).end("Invalid Payload");
            }

            const { data: habitEntry, error } = await supabase
                .from(TABLE)
                .delete()
                .eq("habitId", habitId)
                .eq("createdAt", createdAt)
                .limit(1)
                .single()

            if (habitEntry === null) {
                return res.status(200).end();
            }

            if (error) {
                throw error;
            }

            return res.status(200).json(habitEntry);
        } catch(error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }
}

export default apiHandler(handler);
