import {
  addToFavorites,
  getFavorite,
  getFavorites,
  removeFromFavorites,
  checkFavorite,
} from '../../services/favorite.services.js';

async function httpAddToFavorite(req, res) {
  console.log('fav', req.body.auditionPostId);
  await addToFavorites(req.body.auditionPostId, req.user._id);
  res.status(201).json({ message: 'Success' });
}

async function httpGetFavorite(req, res) {
  res.status(200).json(await getFavorite(req.params.id));
}

async function httpCheckFavorite(req, res) {
  const favorite = await checkFavorite(req.params.auditionPostId, req.user._id);
  if (favorite) {
    res.status(200).json({ message: 'Found' });
  } else {
    res.status(200).json({ message: 'Not Found' });
  }
}

async function httpRemoveFromFavorites(req, res) {
  await removeFromFavorites(req.params.id, req.user._id);
  res.status(200).json({ message: 'Success' });
}

async function httpGetFavorites(req, res) {
  res.status(200).json(await getFavorites(req.user._id));
}

export {
  httpAddToFavorite,
  httpGetFavorite,
  httpRemoveFromFavorites,
  httpGetFavorites,
  httpCheckFavorite,
};
