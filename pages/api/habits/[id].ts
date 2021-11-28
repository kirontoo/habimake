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
        const habitId = req.query.id;
        let userId = req.headers["x-habimake-auth"] || req.body.userId;

        // verify user exists
        let user = await prisma.user.findUnique({
            where: { id: String(userId) }
        });

        if ( !user ) {
            return res.status(403).send({
                error: "Forbidden"
            });
        }

        let data = await prisma.user.findUnique({
            where: { id: String(habitId) }
        });

        return res.status(200).json(data);
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
        const habitId = req.query.id;
        let userId = req.headers["x-habimake-auth"] || req.body.userId;

        if ( !userId ) {
            return res.status(403).send("forbidden");
        }

        // verify user exists
        let user = await prisma.user.findUnique({
            where: { id: String(userId) }
        });

        if ( !user ) {
            return res.status(403).send({
                error: "Forbidden"
            });
        }

        const { name, description } = req.body;

        let habit: Habit = await prisma.habit.update({
            where: { id: Number.parseInt(String(habitId)) },
            data: {
                name,
                description
            }
        });

        return res.status(200).json(habit);
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
        const habitId = req.query.id || null;

        if ( !habitId ) {
            throw new Error("missing habit id");
        }

        const accessToken = req.headers['x-supabase-auth'] || null;
        supabase.auth.setAuth(String(accessToken));

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

export default habitHandler;