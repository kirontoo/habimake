import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";
import parseToken from "lib/helpers/parseToken";

async function userHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const TABLE = "User";
    const { method } = req;
    let token = parseToken(req.headers.authorization);
    supabase.auth.setAuth(token);

    switch (method) {
        case 'GET':
            return await GetUser(req, res);
        case 'DELETE':
            return await DeleteUser(req, res);
        case 'PATCH':
        return res.status(200).end();
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
            res.status(405).end('Method ${method} Not Allowed')
    }

    async function GetUser( req: NextApiRequest, res: NextApiResponse ) {
        try {
            const id = req.query.id;
            let { data, error } = await supabase
                .from(TABLE)
                .select()
                .eq("id", id)
                .single()

            if (error) {
                throw error;
            }

            return res.status(200).json(data);
        } catch(error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }

    async function DeleteUser( req: NextApiRequest, res: NextApiResponse ) {
        try {
            const id = req.query.id;
            await supabase
                .from(TABLE)
                .delete()
                .eq("id", id)
                .limit(1)
                .single()

            return res.status(200).end();
        } catch (error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }
}

export default apiHandler(userHandler);
