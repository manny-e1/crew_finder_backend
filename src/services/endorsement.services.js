import EndorsementModel from "../models/endorsement.model.js";

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
  return EndorsementModel.findById(id);
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