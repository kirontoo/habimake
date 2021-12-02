import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import apiHandler from "lib/helpers/apiHandler";
import parseToken from "lib/helpers/parseToken";

async function handler( req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const TABLE = "Habit";

    let token = parseToken(req.headers.authorization);
    supabase.auth.setAuth(token);

    switch (method) {
        case 'GET':
            return res.status(200).send("get entry")
        case 'POST':
            return res.status(200).send("post entry")
        case 'DELETE':
            return res.status(200).send("delet entry")
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default apiHandler(handler);
