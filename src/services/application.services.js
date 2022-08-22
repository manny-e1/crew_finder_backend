import ApplicationModel from '../models/application.mongoose.js';
import {
  getAuditionPost,
  getApplicationCount,
  updateAuditionPost,
} from './auditionpost.services.js';

async function createApplication(body, applicantId) {
  const newApplication = await ApplicationModel.create({
    ...body,
    applicantId,
  });
  const applicationCount = (await getApplicationCount(body.auditionPostId)) + 1;
  await updateAuditionPost(body.auditionPostId, { applicationCount });
  return newApplication;
}

async function getApplications() {
  return ApplicationModel.find()
    .populate({ path: 'auditionPostId', populate: { path: 'author' } })
    .populate('applicantId', 'id fullName email role talent');
}

async function getAuditionPostApplications(auditionPostId) {
  return ApplicationModel.find({ auditionPostId: auditionPostId })
    .populate({
      path: 'auditionPostId',
      select: 'id',
      populate: {
        path: 'author',
        select: 'id fullName email talent username ',
      },
    })
    .populate('applicantId', 'id fullName email role talent username');
}

async function getApplication(filter) {
  return ApplicationModel.findOne(filter).populate(
    'applicantId',
    'id fullName email talent role verification'
  );
}

async function updateApplication(id, body) {
  console.log('id: ', id);
  console.log('body: ', body);
  return ApplicationModel.updateOne({ _id: id }, body);
}

async function deleteApplication(id) {
  const application = await getApplication({ _id: id });
  const auditionPost = await getAuditionPost(application.auditionPostId);
  if (auditionPost) {
    console.log(auditionPost._id);
    const applicationCount = (await getApplicationCount(auditionPost._id)) - 1;
    console.log(applicationCount);
    await updateAuditionPost(auditionPost._id, { applicationCount });
  }
  return ApplicationModel.findByIdAndDelete(id);
}

async function deleteApplications() {
  return ApplicationModel.deleteMany();
}

export {
  createApplication,
  getApplications,
  getAuditionPostApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  deleteApplications,
};
