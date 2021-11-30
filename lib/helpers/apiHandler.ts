import { verifyJWT } from "lib/helpers/middlewares";
import errorHandler from "lib/helpers/errorHandler";
import { 
    NextApiRequest, 
    NextApiResponse, 
    NextApiHandler 
} from "next";

function apiHandler( handler: NextApiHandler ) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
       try {
           await verifyJWT(req, res);
           await handler(req, res);
        } catch(error) {
            errorHandler(error, res);
        }
    }
}

export default apiHandler;
