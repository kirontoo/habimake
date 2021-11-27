import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma, Habit } from "@prisma/client";

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
        let userId = req.headers["x-habimake-auth"] || req.body.userId;
        let habits: Habit[] = await prisma.habit.findMany({
            where: { userId: String(userId) }
        });

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

        const data: Prisma.HabitCreateInput = { userId, ...habitData};
        const habit: Habit = await prisma.habit.create({ data });

        return res.status(200).json({
            habit
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

export default habitHandler;
