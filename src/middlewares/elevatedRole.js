import { ROLE } from "../constants/enums.constants.js";
import { getUser } from "../services/user/user.services.js"
import { ErrorResponse } from "../utils/errorResponse.js";

export async function isDirectorOrProducer(req,_,next) {
    // const currentUser = await getUser({_id:req.user._id});
    if(req.user.role !== ROLE.PRO_DIRECTOR) throw new ErrorResponse("Not authorized to perform this action", 403);
    next();
}

export async function isAdmin(req,_,next) {
    // const currentUser = await getUser({_id:req.user._id});
    console.log(currentUser)
    if(req.user.role !== ROLE.ADMIN) throw new ErrorResponse("Not authorized to perform this action", 403);
    next();
}
