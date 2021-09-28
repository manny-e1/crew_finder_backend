import UserModel from '../../models/user.mongoose.js';
import {
  deleteUser,
  deleteUsers,
  getAllUsers,
  getMatchingUsers,
  getUser,
  updateSelf,
} from '../../services/user/user.services.js';
import { ErrorResponse } from '../../utils/errorResponse.js';

async function httpGetUsers(req, res) {
  const query = req.query.search ?? '';

  res.status(200).json(await getMatchingUsers(query));
}

async function httpGetAllUsers(req, res) {
  res.status(200).json(await getAllUsers());
}

// async function getMatchingUsers(req, res) {
//   const query = req.query.search ?? '';
//   const matched = await UserModel.find({
//     $or: [
//       {
//         talent: { $regex: query, $options: 'i' },
//       },
//       {
//         fullName: { $regex: query, $options: 'i' },
//       },
//       {
//         username: { $regex: query, $options: 'i' },
//       },
//       {
//         otherTalents: {
//           $in: [new RegExp(query, 'i')],
//         },
//       },
//     ],
//   });
//   res.json(matched);
// }

async function httpGetUser(req, res) {
  res.status(200).json(await getUser({ _id: req.params.id }));
}

async function httpDeleteUser(req, res) {
  const userExists = await getUser({ _id: req.params.id });
  if (!userExists) {
    throw new ErrorResponse('User does not exist', 404);
  }
  res.status(200).json(await deleteUser(req.params.id));
}

async function httpUpdateSelf(req, res) {
  console.log(req.body);
  let body = {};
  if (req.file && req.file.path) {
    console.log(req.file.path);
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/))
      throw new error('Only image files (jpg, jpeg, png) are allowed!', 400);
    body = {
      showcasePics: req.file.path,
    };
  }
  body = { ...req.body };

  res.status(200).json(await updateSelf(req.user._id, body));
}

async function httpDeleteUsers(req, res) {
  res.status(200).json(await deleteUsers());
}

export {
  httpDeleteUser,
  httpGetAllUsers,
  // getMatchingUsers,
  httpDeleteUsers,
  httpUpdateSelf,
  httpGetUser,
  httpGetUsers,
};
