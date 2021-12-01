import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma, Habit } from "@prisma/client";
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";
import jwt from "jsonwebtoken";

async function habitHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    switch (method) {
        case 'GET':
            return await GetHabits(req, res);
        case 'POST':
            return await CreateHabit(req, res);
        default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}

// Get all habits from current user
async function GetHabits(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        supabase.auth.setAuth(token);

        const { data: habits, error } = await supabase
            .from("Habit")
            .select("*")

        if (error) {
            return res.status(400).send("Bad Request");
        }

       return res.status(200).json({ habits });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function CreateHabit(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        supabase.auth.setAuth(token);

        let user = jwt.verify(token, process.env.JWT_SECRET);

        const data: Prisma.HabitCreateInput = {
            ...req.body,
            userId: user.sub,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // This client will now send requests as this user
        const { data: habit, error } = await supabase
            .from("Habit")
            .insert([{...data}]);

        if (error) {
            return res.status(401).send('Unauthorized');
        }

        return res.status(200).json(habit);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

export default apiHandler(habitHandler);
