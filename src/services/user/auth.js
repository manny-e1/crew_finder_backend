import UserModel from "../../models/user.mongoose.js";
import { getUser } from "./user.services.js";

import { generateToken, hashToken } from '../../utils/generateToken.js';
import { html } from "../../constants/emailHtml.js";
import { ErrorResponse } from "../../utils/errorResponse.js";
import { sendEmail } from '../../utils/sendmail.js';
import { generatePasswordHash, validatePassword } from "../../utils/hashpassword.js";
import { generateJWT } from "../../utils/generateJWT.js";

async function createUser(userInfo, host) {
    const { token, hashedToken, expiration } = generateToken();
    const user = Object.assign(userInfo, {
        token: hashedToken,
        tokenExpiration: expiration
    });

    const url = `${host}/users/confirm-email/${token}`;
    const htmlMessage = html(url, true);

    sendEmail({
        to: user.email,
        subject: "Email Confirmation Request",
        text: htmlMessage,
    });

    return UserModel.create(user);
}

async function loginUser({email,password}){
    const user = await getUser({email});

    if (!user) 
        throw new ErrorResponse("User not found", 404);
    const matchPassword = await validatePassword(password, user.password);

    if (!matchPassword) 
        throw new ErrorResponse("Wrong credentials", 400);

    const token = await generateJWT(user._id);
    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        verification: user.verification,
        phoneNumber: user.phoneNumber,
        address: user.address,
        birthdate: user.birthdate,
        gender: user.gender,
        otherTalents: user.otherTalents,
        username: user.username,
        talent: user.talent,
        token
    }
}

async function forgotPassword(email, host){
    const user = await getUser({email});
  
    if (!user) throw new ErrorResponse("No email could not be sent", 404);

    const { token, hashedToken, expiration } = generateToken();
    user.token = hashedToken;
    user.tokenExpiration = expiration;

    await user.save();

    const resetUrl = `${host}/users/passwordreset/${token}`;
    const htmlMessage = html(resetUrl);

    try {
        sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: htmlMessage,
        });
        return { 
            success: true, 
            message: "Email Sent" 
        };
    } catch (err) {
        console.log(err);
  
        user.token = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        throw new ErrorResponse("Email could not be sent", 500);
    }
}

async function resetPassword(password, resetToken){
    const resetPasswordToken = hashToken(resetToken);
  
    console.log(resetPasswordToken);
    const user = await getUser({
        token: resetPasswordToken,
        tokenExpiration: { 
            $gt: Date.now() 
        },
    });

    if (!user) throw new ErrorResponse("Invalid Token", 400);

    user.password = await generatePasswordHash(password);
    user.token = undefined;
    user.tokenExpiration = undefined;

    await user.save();

    return {
        success: true,
        message: "Password Updated Success",
        token: generateJWT(user._id),
    }
}

async function confirmEmail(confirmToken){
    const emailConfimationToken = hashToken(confirmToken);
  
    console.log(emailConfimationToken);
    const user = await getUser({
        token: emailConfimationToken,
        tokenExpiration: { 
            $gt: Date.now() 
        },
    });

    if (!user) throw new ErrorResponse("Invalid Token", 400);

    user.isActive = true;
    user.token = undefined;
    user.tokenExpiration = undefined;

    await user.save();

    return {
        success: true,
        message: "Email confirmation successful",
    }
}


export {
    createUser,
    loginUser,
    forgotPassword,
    resetPassword,
    confirmEmail,
}
