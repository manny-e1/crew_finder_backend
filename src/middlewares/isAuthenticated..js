import jwt from 'jsonwebtoken'
import { getUser } from '../services/user/user.services';
import { ErrorResponse } from '../utils/errorResponse.js';

export async function isAuthenticated(req,_,next) {
    let token; 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const {id} = jwt.verify(token, process.env.SECRET_KEY);
            const currentUser = await getUser({id:req.user._id}).select("_id username name email");
            req.user = currentUser;
            next();
        } catch (error) {
            console.error(error);
            throw new ErrorResponse('Not Authenticated', 401);
        }
    }
    if (!token) throw new ErrorResponse("Not Authenticated, no token", 401);
}
