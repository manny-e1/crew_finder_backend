import { ROLE } from "../constants/enums.constants.js";
import EndorsementModel from "../models/endorsement.model.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { getUser } from "./user/user.services.js";

async function endorseUser(endorserId, endorseeId) {
  const endorsee = await getUser({_id:endorseeId});
  if (!endorsee) {
    console.log(ok);
    throw new ErrorResponse("User not found", 404);
  } 
  console.log(endorsee);
  if (endorsee.role === ROLE.PRO_DIRECTOR) throw new ErrorResponse("Can't endorse directors or producers", 400);
  return EndorsementModel.create({
    endorserId,
    endorseeId
  });
}

async function getAllEndorsements() {
  return EndorsementModel.find();
}

async function getEndorsementByID(id) {
  const endorsement = await EndorsementModel.findById(id);
  if (!endorsement) throw new ErrorResponse("Endorsement not found", 404);
  return endorsement;
}

async function getGivenEndorsements(endorserId) {
  return EndorsementModel.find({endorserId});
}

async function getReceivedEndorsements(endorseeId) {
  return EndorsementModel.find({endorseeId});
}

export {
  endorseUser,
  getAllEndorsements,
  getEndorsementByID,
  getGivenEndorsements,
  getReceivedEndorsements
}