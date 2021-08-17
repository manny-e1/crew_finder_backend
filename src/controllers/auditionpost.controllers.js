import { createAuditionPost, deleteAuditionPost, deleteAuditionPosts, getAuditionPost, getAuditionPosts, updateAuditionPost } from "../services/auditionpost.services.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { validationResult } from "express-validator";

async function httpCreateAuditionPost(req,res){
    let errorMessages = {};
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach((error) => {
            errorMessages[error.param] = error.msg;
        });
        throw new ErrorResponse(JSON.stringify(errorMessages), 400);
    };
    
    return res
            .status(201)
            .json(await createAuditionPost(req.body,req.user._id));
}

async function httpGetAuditionPosts(req,res){
    const auditionsExist = await getAuditionPosts();
    if (!auditionsExist){
        throw new ErrorResponse('There is no audition to show',404);
    }
    return res
            .status(200)
            .json(await getAuditionPosts());
}

async function httpGetAuditionPost(req,res){
    const auditionExists = await getAuditionPost({_id: req.params.id});
    if (!auditionExists){
        throw new ErrorResponse('Audition does not exist',404);
    }
    return res
            .status(200)
            .json(await getAuditionPost(req.params.id));
}

async function httpUpdateAuditionPost(req,res){
    const auditionpost = await getAuditionPost(req.params.id);
    if (!auditionpost){
        throw new ErrorResponse('Audition does not exist',404);
    }
    if (auditionpost.author._id.toString() !== req.user._id.toString()) throw new ErrorResponse("You're not authorized to do this", 403);

       

    return res
            .status(200)
            .json(await updateAuditionPost(auditionpost.id,req.body));
}

async function httpDeleteAuditionPost(req,res) {
    const auditionExists = await getAuditionPost({_id: req.params.id});
    if (!auditionExists){
        throw new ErrorResponse('Audition does not exist',404);
    }
    return res
            .status(200)
            .json(await deleteAuditionPost(req.params.id));
}

async function httpDeleteAuditionPosts(req,res) {
    const auditionsExist = await getAuditionPosts();
    if (!auditionsExist){
        throw new ErrorResponse('There is no audition to show',404);
    }
    return res
            .status(200)
            .json(await deleteAuditionPosts());
}

export {
    httpCreateAuditionPost,
    httpUpdateAuditionPost,
    httpGetAuditionPosts,
    httpGetAuditionPost,
    httpDeleteAuditionPost,
    httpDeleteAuditionPosts,
}