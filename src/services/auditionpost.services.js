import AuditionPostModel from '../models/auditionPost.mongoose.js';

async function createAuditionPost(body, author) {
  return AuditionPostModel.create({
    ...body,
    author,
  });
}

async function getAuditionPosts(filter) {
  console.log(filter);
  return AuditionPostModel.find(filter).populate(
    'author',
    'id fullName role verification'
  );
}

async function getMatchedAuditionPosts(query) {
  const regexx = new RegExp(query, 'i');
  return AuditionPostModel.find({
    $or: [
      {
        title: { $regex: query, $options: 'i' },
      },
      {
        region: { $regex: query, $options: 'i' },
      },
      {
        text: { $regex: query, $options: 'i' },
      },
      {
        talents: {
          $in: [regexx],
        },
      },
      {
        languages: {
          $in: [regexx],
        },
      },
    ],
  });
}

async function getAuditionPost(id) {
  return AuditionPostModel.findById(id).populate('author');
}

async function updateAuditionPost(id, body) {
  return AuditionPostModel.updateOne({ _id: id }, body);
}

async function deleteAuditionPost(id) {
  return AuditionPostModel.findByIdAndDelete(id);
}

async function deleteAuditionPosts() {
  return AuditionPostModel.deleteMany();
}

async function getApplicationCount(id) {
  const auditionPost = await getAuditionPost(id);
  return auditionPost.applicationCount;
}

export {
  createAuditionPost,
  getAuditionPosts,
  getAuditionPost,
  updateAuditionPost,
  deleteAuditionPost,
  deleteAuditionPosts,
  getApplicationCount,
  getMatchedAuditionPosts,
};
