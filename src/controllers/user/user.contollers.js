import { getUsers } from "../../services/user/user.services.js";

async function httpGetUsers(_,res){
    res.status(200).json(await getUsers());
} 
async function httpDeleteUser(_,res){
    await UserModel.deleteMany();
    res.status(204);
}


export {
    httpDeleteUser,
    httpGetUsers,
}