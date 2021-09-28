import { ROLE } from '../../constants/enums.constants.js';
import ApplicationModel from '../../models/application.mongoose.js';
import AuditionPostModel from '../../models/auditionPost.mongoose.js';
import UserModel from '../../models/user.mongoose.js';
import { generateJWT } from '../../utils/generateJWT.js';

async function getUser(filter, projection = {}) {
  return UserModel.findOne(filter, projection);
}

async function getMatchingUsers(query) {
  return UserModel.find({
    $or: [
      {
        talent: { $regex: query, $options: 'i' },
      },
      {
        fullName: { $regex: query, $options: 'i' },
      },
      {
        username: { $regex: query, $options: 'i' },
      },
      {
        otherTalents: {
          $in: [new RegExp(query, 'i')],
        },
      },
    ],
    role: {
      $in: [ROLE.APPLICANT, ROLE.PRO_DIRECTOR],
    },
  });
}

async function getAllUsers() {
  return UserModel.find().select('-__v -password');
}

async function deleteUser(id) {
  await UserModel.findByIdAndDelete(id);
  await AuditionPostModel.deleteMany({ author: id });
  await ApplicationModel.deleteMany({ applicantId: id });
  return {
    message: 'Success',
  };
}
async function updateSelf(id, body) {
  await UserModel.updateOne({ _id: id }, body);
  const user = await UserModel.findById(id).select('-__v -password');
  const token = await generateJWT(user._id);
  return {
    _id: user._id,
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
    avatar: user.avatar,
    token,
  };
}

async function deleteUsers() {
  return UserModel.deleteMany();
}

export {
  getUser,
  getMatchingUsers,
  getAllUsers,
  deleteUser,
  updateSelf,
  deleteUsers,
};
