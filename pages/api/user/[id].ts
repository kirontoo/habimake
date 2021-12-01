import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";

async function userHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case 'GET':
            return await GetUser(req, res);
        default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Method ${method} Not Allowed')
    }

    async function GetUser( req: NextApiRequest, res: NextApiResponse ) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            supabase.auth.setAuth(token);

            const id = req.query.id;
            let { data, error } = await supabase
                .from("User")
                .select()
                .eq("id", id)
                .single()

            return res.status(200).json(data);
        } catch(error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }
}

export default apiHandler(userHandler);
