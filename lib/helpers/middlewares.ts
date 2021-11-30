import expressJwt from "express-jwt";
import { promisify } from "util";
import { 
    NextApiRequest, 
    NextApiResponse 
} from 'next';

function verifyJWT(req: NextApiRequest, res: NextApiResponse) {
    return promisify(
        expressJwt({ 
            secret: process.env.JWT_SECRET, 
            algorithms: ['HS256'] }
        ).unless({
            path: [ ]
        })
    )(req, res);
}

export { verifyJWT };
