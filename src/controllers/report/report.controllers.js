import {
  deleteReport,
  getReportById,
  getReports,
  reportUser,
} from '../../services/report.services.js';

export async function httpReportUser(req, res) {
  await reportUser(req.body, req.user._id);
  res.status(201).json({ message: 'Success' });
}

export async function httpGetReports(_, res) {
  res.status(200).json(await getReports());
}

export async function httpGetReportById(req, res) {
  res.status(200).json(await getReportById(req.params.id));
}

export async function httpDeleteReport(req, res) {
  await deleteReport(req.params.id);
  res.status(200).json({ message: 'Success' });
}
