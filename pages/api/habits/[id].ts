import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";

async function habitHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
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
}

async function GetHabitById(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {

        let token = req.headers.authorization.split(" ")[1];
        supabase.auth.setAuth(token);

        const habitId = req.query.id;

        const { data: habit, error } = await supabase
            .from("Habit")
            .select()
            .eq("id", habitId)
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

async function UpdateHabit(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        supabase.auth.setAuth(token);

        const habitId = req.query.id;
        const { data: habit, error } = await supabase
            .from("Habit")
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

async function DeleteHabit(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const habitId = req.query.id;

        let token = req.headers.authorization.split(" ")[1];
        supabase.auth.setAuth(token);

        // check if owner before deleting
        const { data, error } = await supabase.from("Habit")
            .delete()
            .eq("id", Number.parseInt(String(habitId)));

        if ( error ) {
            throw new Error(error.message);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

export default apiHandler(habitHandler);
