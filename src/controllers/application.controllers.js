import { createApplication, deleteApplication, deleteApplications, getApplication, getApplications, updateApplication } from "../services/application.services.js";
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
            .json(await createApplication(req.body,req.user._id));
}

async function httpGetApplications(req,res){
    return res
            .status(200)
            .json(await getApplications());
}

async function httpGetApplication(req,res){
    return res
            .status(200)
            .json(await getApplication({_id:req.params.id}));
}

async function httpUpdateApplication(req,res){
    const application = await getApplication(req.params.id);
    if (application.applicantId.toString() !== req.user._id.toString()) throw new ErrorResponse("You're not authorized to do this", 403);
    return res
            .status(200)
            .json(await updateApplication(application.id,req.body));
}

async function httpDeleteApplication(req,res) {
    return res
            .status(200)
            .json(await deleteApplication(req.params.id));
}

async function httpDeleteApplications(req,res) {
    return res
            .status(200)
            .json(await deleteApplications());
}

export {
    httpCreateApplication,
    httpUpdateApplication,
    httpGetApplications,
    httpGetApplication,
    httpDeleteApplication,
    httpDeleteApplications,
}