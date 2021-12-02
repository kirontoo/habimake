import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";
import parseToken from "lib/helpers/parseToken";

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
            return res.status(200).send("delet entry")
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    // TODO: get habit entries based on month using the query string
    
    async function CreateHabitEntry( req: NextApiRequest, res, NextApiResponse ) {
        try {
            // TODO: check if the an entry already exists for today

            const habitId = req.query.id;
            const data: Prisma.HabitEntryCreateInput = {
                habitId, 
                createdAt: new Date().toISOString(),
            };

            const { data: entry, error } = await supabase
                .from(TABLE)
                .insert([{...data}])
                .single();

            return res.status(200).json(entry);
        } catch(error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }

    async function DeleteHabitEntry( req: NextApiRequest, res, NextApiResponse ) {
       try {
            // TODO: get today's date and compare it with today's habit entry?
            const habitId = req.query.id;

        } catch(error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }
}

export default apiHandler(handler);
