import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";

async function userHandler (
req: NextApiRequest, 
res: NextApiResponse) {

    const { method } = req;

    switch (method) {
        case 'GET':
            await GetUser(req, res);
        case 'POST':
            await PostUser(req, res);
        default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end('Method ${method} Not Allowed')
    }
}

async function GetUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query: {id} } = req;
    res.status(200).json(id);
}

// TODO: in the wrong file
async function PostUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query: { id } } = req;
    let user: Prisma.UserCreateInput;
    user = {
        id: id[0],
        username: 'Elsa Prisma'
    };

    let data = await prisma.user.create({ data: user });
    res.status(200).json(data);
}

export default userHandler;
