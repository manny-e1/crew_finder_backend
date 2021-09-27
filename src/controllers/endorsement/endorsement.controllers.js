import {
  deleteEndorsements,
  endorseUser,
  getAllEndorsements,
  getEndorsementByID,
  getGivenEndorsements,
  getReceivedEndorsements,
} from '../../services/endorsement.services.js';

async function httpEndorseUser(req, res) {
  res.status(201).json(await endorseUser(req.user._id, req.body.endorseeId));
}

async function httpGetAllEndorsements(_, res) {
  res.status(200).json(await getAllEndorsements());
}

function httpGetEndorsementById(req, res) {
  res.status(200).json(getEndorsementByID(req.params.id));
}

async function httpGetGivenEndorsements(req, res) {
  res.status(200).json(await getGivenEndorsements(req.user._id));
}

async function httpGetReceivedEndorsements(req, res) {
  res.status(200).json(await getReceivedEndorsements(req.params.endorseeId));
}
async function httpDeleteEndorsements(req, res) {
  res.status(200).json(await deleteEndorsements());
}

export {
  httpEndorseUser,
  httpGetAllEndorsements,
  httpGetEndorsementById,
  httpGetGivenEndorsements,
  httpGetReceivedEndorsements,
  httpDeleteEndorsements,
};
