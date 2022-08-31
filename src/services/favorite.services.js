import FavoriteModel from '../models/favorite.mongoose.js';
import { ErrorResponse } from '../utils/errorResponse.js';

async function addToFavorites(auditionPostId, userId) {
  console.log('adding');

  const fav = await FavoriteModel.findOne({
    $and: [
      {
        auditionPost: auditionPostId,
      },
      {
        user: userId,
      },
    ],
  });
  if (fav) throw new ErrorResponse("You've already favorite this", 400);
  return FavoriteModel.create({ auditionPost: auditionPostId, user: userId });
}
async function getFavorite(id) {
  return FavoriteModel.findById(id)
    .populate({
      path: 'auditionPost',
      populate: {
        path: 'author',
        select: 'id fullName verification role email',
      },
    })
    .select('-__v -user');
}

async function checkFavorite(auditionPostId, userId) {
  return FavoriteModel.findOne({
    $and: [{ auditionPost: auditionPostId }, { user: userId }],
  })
    .populate({
      path: 'auditionPost',
      populate: {
        path: 'author',
        select: 'id fullName verification role email',
      },
    })
    .select('-__v -user');
}

async function removeFromFavorites(auditionPostId, userId) {
  return FavoriteModel.deleteOne({
    $and: [{ auditionPost: auditionPostId }, { user: userId }],
  });
}

async function getFavorites(userId) {
  return FavoriteModel.find({ user: userId })
    .populate({
      path: 'auditionPost',
      populate: {
        path: 'author',
        select: 'id fullName verification role email',
      },
    })
    .select('-__v -user');
}

export {
  addToFavorites,
  getFavorite,
  removeFromFavorites,
  getFavorites,
  checkFavorite,
};
