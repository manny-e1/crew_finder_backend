import EndorsementModel from "../models/endorsement.model.js";
import { ErrorResponse } from "../utils/errorResponse.js";

async function endorseUser(endorserId, endorseeId) {
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