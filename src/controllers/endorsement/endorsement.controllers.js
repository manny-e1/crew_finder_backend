import {
  deleteEndorsement,
  deleteEndorsements,
  endorseUser,
  getAllEndorsements,
  getEndorsementByID,
  getGivenEndorsements,
  getReceivedEndorsements,
} from '../../services/endorsement.services.js';

async function httpEndorseUser(req, res) {
  await endorseUser(req.user._id, req.body.endorseeId);
  res.status(201).json({ message: 'success' });
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
async function httpDeleteEndorsement(req, res) {
  res.status(200).json(await deleteEndorsement(req.params.id));
}

export {
  httpEndorseUser,
  httpGetAllEndorsements,
  httpGetEndorsementById,
  httpGetGivenEndorsements,
  httpGetReceivedEndorsements,
  httpDeleteEndorsements,
  httpDeleteEndorsement,
};
