import AuditionPostModel from "../models/auditionPost.mongoose.js";

async function createAuditionPost(body,author){
    return AuditionPostModel.create({
        ...body,
        author
    })
}

async function getAuditionPosts(){
    return AuditionPostModel
            .find()
            .populate('author', 'id fullName role verification');
}

async function getAuditionPost(id){
    return AuditionPostModel
            .findById(id)
            .populate('author', 'id fullName role verification');
}

async function updateAuditionPost(id, body){
    return AuditionPostModel.updateOne(
        { _id:id },
        body
    );
}

async function deleteAuditionPost(id){
    return AuditionPostModel.findByIdAndDelete(id);
}

async function deleteAuditionPosts(){
    return AuditionPostModel.deleteMany();
}

async function getApplicationCount(id){
    const auditionPost = await getAuditionPost(id);
    return auditionPost.applicationCount;
}

export {
    createAuditionPost,
    getAuditionPosts,
    getAuditionPost,
    updateAuditionPost,
    deleteAuditionPost,
    deleteAuditionPosts,
    getApplicationCount
}