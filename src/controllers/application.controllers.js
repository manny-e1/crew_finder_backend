import { createApplication, deleteApplication, deleteApplications, getApplication, getApplications, getAuditionPostApplications, updateApplication } from "../services/application.services.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { validationResult } from "express-validator";

async function httpCreateApplication(req,res){
    let errorMessages = {};
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach((error) => {
            errorMessages[error.param] = error.msg;
        });
        throw new ErrorResponse(JSON.stringify(errorMessages), 400);
    };

    const alreadyApplied = await getApplication({
        auditionPostId: req.body.auditionPostId,
        applicantId: req.user._id
    });
    if(alreadyApplied) throw new ErrorResponse("you have already applied", 400);

    return res
            .status(201)
            .json(createApplication(req.body,req.user._id));
}

async function httpGetApplications(req,res){
    return res
            .status(200)
            .json(await getApplications());
}

async function httpGetAuditionPostApplications(req,res){
    return res
            .status(200)
            .json(await getAuditionPostApplications(req.params.auditionPostId));
}

async function httpGetApplication(req,res){
    const application = await getApplication({_id: req.params.id});
    if (!application){
        throw new ErrorResponse('Application does not exist',404);
    }
    return res
            .status(200)
            .json(application);
}

async function httpUpdateApplication(req,res){
    const application = await getApplication({_id: req.params.id});
    if (!application){
        throw new ErrorResponse('Application does not exist',404);
    }
    if (application.applicantId.toString() !== req.user._id.toString())      
             throw new ErrorResponse("You're not authorized to do this", 403);
    
    return res
            .status(200)
            .json(await updateApplication(application.id,req.body));
}

async function httpDeleteApplication(req,res) {
    const application = await getApplication({_id: req.params.id});
    if (!application){
        throw new ErrorResponse('Application does not exist',404);
    }
    return res
            .status(200)
            .json(await deleteApplication(req.params.id));
}

async function httpDeleteApplications(req,res) {
    const applicationsExist = await getApplications();
    if (!applicationsExist){
        throw new ErrorResponse('There is no application',404);
    }
    return res
            .status(200)
            .json(await deleteApplications());
}

export {
    httpCreateApplication,
    httpUpdateApplication,
    httpGetApplications,
    httpGetAuditionPostApplications,
    httpGetApplication,
    httpDeleteApplication,
    httpDeleteApplications,
}