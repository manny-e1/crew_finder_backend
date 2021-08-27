import { endorseUser, getAllEndorsements, getEndorsementByID, getGivenEndorsements, getReceivedEndorsements } from "../../services/endorsement.services";

async function httpEndorseUser (req,res) {
  res
    .status(201)
    .json(await endorseUser(req.user._id, res.body.endorseeId));
}

async function httpGetAllEndorsements (_,res) {
  res
    .status(200)
    .json(await getAllEndorsements());
}

async function httpGetEndorsementById (req,res) {
  res
    .status(200)
    .json(await getEndorsementByID(req.params.id));
}

async function httpGetGivenEndorsements (_,res) {
  res
    .status(200)
    .json(await getGivenEndorsements(res.body.endorserId));
}

async function httpGetReceivedEndorsements (_,res) {
  res
    .status(200)
    .json(await getReceivedEndorsements(res.body.endorseeId));
}

export {
  httpEndorseUser,
  httpGetAllEndorsements,
  httpGetEndorsementById,
  httpGetGivenEndorsements,
  httpGetReceivedEndorsements
}