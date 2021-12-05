import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";
import parseToken from "lib/helpers/parseToken";

async function habitHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    const TABLE = "Habit";

    let token = parseToken(req.headers.authorization);
    supabase.auth.setAuth(token);

    switch (method) {
        case 'GET':
            return await GetHabitById(req, res);
        case 'PATCH':
            return await UpdateHabit(req, res);
        case 'DELETE':
            return await DeleteHabit(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function GetHabitById( req: NextApiRequest, res: NextApiResponse ) {
        try {
            const habitId = req.query.id;

            const { data: habit, error } = await supabase
                .from(TABLE)
                .select()
                .eq("id", habitId)
                .limit(1)
                .single();

            if (error) {
                return res.status(401).json({ message: 'Invalid Token' });
            }

            return res.status(200).json(habit);
        } catch (error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }

    async function UpdateHabit( req: NextApiRequest, res: NextApiResponse ) {
        try {
            const habitId = req.query.id;

            const { data: habit, error } = await supabase
                .from(TABLE)
                .update({...req.body})
                .eq("id", habitId);

            if (error) {
                throw error;
            }

            return res.status(200).json({habit, error});
        } catch (error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }

    async function DeleteHabit( req: NextApiRequest, res: NextApiResponse ) {
        try {
            const habitId = req.query.id;

            const { data, error } = await supabase
                .from(TABLE)
                .delete()
                .eq("id", Number.parseInt(String(habitId)))
                .limit(1)
                .single();

            if (error) {
                throw new Error(error.message);
            }

            if (data === null) {
                return res.status(200).end();
            }


            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }
}

export default apiHandler(habitHandler);
