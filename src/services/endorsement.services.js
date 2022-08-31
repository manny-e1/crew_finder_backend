import { ROLE, VERIFICATION } from '../constants/enums.constants.js';
import EndorsementModel from '../models/endorsement.model.js';
import UserModel from '../models/user.mongoose.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { getUser } from './user/user.services.js';

async function endorseUser(endorserId, endorseeId) {
  const endorsee = await getUser({ _id: endorseeId });
  if (!endorsee) {
    throw new ErrorResponse('User not found', 404);
  }
  if (endorsee.role === ROLE.PRO_DIRECTOR)
    throw new ErrorResponse("Can't endorse directors or producers", 400);
  const alreadyEndorsed = await EndorsementModel.findOne({
    endorserId: endorserId,
    endorseeId: endorseeId,
  });

  if (alreadyEndorsed)
    throw new Error('You have already endorsed this user', 400);
  const endorsed = await EndorsementModel.create({
    endorserId,
    endorseeId,
  });
  const famous = await UserModel.find({
    $and: [{ role: ROLE.PRO_DIRECTOR }, { verification: VERIFICATION.FAMOUS }],
  });

  const famousIds = famous?.map((fam) => fam._id);

  const endorsementCount = await EndorsementModel.find({
    $and: [
      { endorseeId: endorseeId },
      {
        endorserId: { $in: [...famousIds] },
      },
    ],
  });
  if (endorsementCount > 5) {
    await UserModel.updateOne(
      { _id: endorseeId },
      { verification: VERIFICATION.ENDORSED }
    );
  }
  return endorsed;
}

async function getAllEndorsements() {
  return EndorsementModel.find();
}

async function getEndorsementByID(id) {
  const endorsement = await EndorsementModel.findById(id);
  if (!endorsement) throw new ErrorResponse('Endorsement not found', 404);
  return endorsement;
}

async function getGivenEndorsements(endorserId) {
  return EndorsementModel.find({ endorserId }).populate(
    'endorsee',
    'id fullName role verification email'
  );
}

async function getReceivedEndorsements(endorseeId) {
  return EndorsementModel.find({ endorseeId }).populate(
    'endorser',
    'id fullName role verification email'
  );
}

async function deleteEndorsements() {
  return EndorsementModel.deleteMany();
}
async function deleteEndorsement(id) {
  return EndorsementModel.deleteById(id);
}

export {
  endorseUser,
  getAllEndorsements,
  getEndorsementByID,
  getGivenEndorsements,
  deleteEndorsements,
  deleteEndorsement,
  getReceivedEndorsements,
};
