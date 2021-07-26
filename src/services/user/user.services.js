import UserModel from "../../models/user.mongoose.js";

async function getUser(filter, projection={}){
    return UserModel.findOne(filter, projection);   
}

async function getUsers(){
    return UserModel.find();
} 

async function updateSelf({_id:id}){
    // const user = await UserModel.findById(id);

}


export {
    getUser,
    getUsers,
}