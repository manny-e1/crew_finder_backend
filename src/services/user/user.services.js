import UserModel from "../../models/user.mongoose.js";

async function getUser(filter, projection={}){
    return UserModel.findOne(filter, projection);   
}

async function getUsers(){
    return UserModel.find();
} 

async function deleteUser(id){
    return UserModel.findByIdAndDelete(id);
}

async function deleteUsers() {
    return UserModel.deleteMany();
}


export {
    getUser,
    getUsers,
    deleteUser,
    deleteUsers
}