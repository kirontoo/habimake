import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";

async function userHandler (
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            return await GetUser(req, res);
        default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end('Method ${method} Not Allowed')
    }
}

async function GetUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id = req.query.id;
        let data = await prisma.user.findUnique({
            where: { id: String(id) }
        });
        return res.status(200).json(data);
    } catch(error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

export default userHandler;
