import ReportModel from '../models/report.mongoose.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { getUser } from './user/user.services.js';

export async function reportUser(body, reporterId) {
  const user = await getUser({ _id: body.reportedUser });
  if (!user)
    throw new ErrorResponse('The user you tried to report does not exist', 404);

  const alreadyReported = await ReportModel.findOne({
    $and: [
      {
        reporter: reporterId,
      },
      {
        reportedUser: body.reportedUser,
      },
    ],
  });
  if (alreadyReported)
    throw new ErrorResponse("You've already reported this user.", 400);
  return ReportModel.create({ ...body, reporter: reporterId });
}

export async function getReports() {
  return ReportModel.find()
    .populate('reporter', 'id fullName email phoneNumber role talent')
    .populate('reportedUser', 'id fullName email phoneNumber role talent');
}

export async function getReportById(id) {
  return ReportModel.findById(id);
}

export async function deleteReport(id) {
  return ReportModel.findByIdAndDelete(id);
}
