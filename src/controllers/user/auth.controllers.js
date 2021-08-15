import { createUser, forgotPassword, resetPassword, loginUser, confirmEmail } from "../../services/user/auth.js";
import { generatePasswordHash } from "../../utils/hashpassword.js";
import { validationResult } from "express-validator";
import { ErrorResponse } from "../../utils/errorResponse.js";


async function httpCreateUser(req,res){
    let errorMessages = {};
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach((error) => {
            errorMessages[error.param] = error.msg;
        });
        throw new ErrorResponse(JSON.stringify(errorMessages), 400);
    };

    req.body.password = await generatePasswordHash(req.body.password);
    await createUser(req.body, req.headers.host);
    return res
            .status(201)
            .json("success");

}

async function httpLoginUser(req,res){

    return res
            .status(200)
            .json(await loginUser(req.body));

}


async function httpForgotPassword (req, res) {

    const { email } = req.body;
    return res
            .status(200)
            .json(await forgotPassword(email, req.headers.host));

  };
  
async function httpResetPassword(req, res) {

    return res
            .status(200)
            .json(await resetPassword(req.body.password, req.params.resetToken));

};

async function httpConfirmEmail(req, res) {

    return res
            .status(200)
            .json(await confirmEmail(req.params.confirmToken));

};


export {
    httpCreateUser,
    httpLoginUser,
    httpForgotPassword,
    httpResetPassword,
    httpConfirmEmail
}