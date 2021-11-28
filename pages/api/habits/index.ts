import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma, Habit } from "@prisma/client";
import { supabase } from "lib/supabaseClient";

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
        let accessToken: string = String(req.headers["x-supabase-auth"]) || null;

        const userId = req.body.userId;
        if ( userId === null ) {
            return res.status(401).send("Unauthorized");
        }

        // TODO: jwt decode token to get user values

        // let habits: Habit[] = await prisma.habit.findMany({
        //     where: { userId: String(userId) }
        // });
        supabase.auth.setAuth(accessToken);

        const { data: habits, error} = await supabase
            .from("Habit")
            .select("*")
            .eq("userId", userId)

        if (error) {
            return res.status(400).send("Bad Request");
        }

       return res.status(200).json({
           habits
       });
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
        let { userId, ...habitData} = req.body;

        const data: Prisma.HabitCreateInput = {
            userId,
            ...habitData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // TODO: put into middleware?
        const accessToken = req.headers['x-supabase-auth'] || null;
        supabase.auth.setAuth(String(accessToken));

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

export default habitHandler;
