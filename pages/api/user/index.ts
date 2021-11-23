import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma, User } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            return CreateUser(req, res);
        default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end('Method ${method} Not Allowed')
    }
}

async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, username } = req.body;

        // Check if the this user already exists
        const currUser = await prisma.user.findUnique({ 
            where: {
                username
            }
        });

        if ( currUser ) {
            return res.status(200).json(currUser);
        }

        if ( username === undefined || username == '' || username === null ) {
            throw new Error('missing username');
        }

        let user: Prisma.UserCreateInput = { id, username };

        let data = await prisma.user.create({ data: user });
        return res.status(200).json(data);
    } catch(error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
