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
  return ApplicationModel.find();
}

async function getAuditionPostApplications(auditionPostId) {
  return ApplicationModel.find({ auditionPostId: auditionPostId })
    .populate({ path: 'auditionPostId', populate: { path: 'author' } })
    .populate('applicantId', 'id fullName email role talent');
}

async function getApplication(filter) {
  return ApplicationModel.findOne(filter);
}

async function updateApplication(id, body) {
  await ApplicationModel.updateOne({ _id: id }, body);
  return getApplication({ _id: id });
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
