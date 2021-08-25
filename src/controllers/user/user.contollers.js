import { deleteUser, deleteUsers, getUser, getUsers } from "../../services/user/user.services.js";
import { ErrorResponse } from "../../utils/errorResponse.js";

async function httpGetUsers(_,res){
    res.status(200).json(await getUsers());
}

async function httpDeleteUser(req,res){
    const userExists = await getUser({_id: req.params.id});
    if (!userExists){
        throw new ErrorResponse('User does not exist',404);
    }
    res.status(200).json(await deleteUser(req.params.id));
}

async function httpDeleteUsers(req,res){
    res.status(200).json(await deleteUsers());
}


export {
    httpDeleteUser,
    httpDeleteUsers,
    httpGetUsers,
}