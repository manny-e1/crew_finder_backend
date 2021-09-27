import {
  createConversation,
  getConversations,
} from '../../services/conversation.services.js';

async function httpCreateConversation(req, res) {
  res.status(201).json(await createConversation(req.body));
}

async function httpGetConversations(req, res) {
  res.status(200).json(await getConversations(req.user._id));
}

export { httpCreateConversation, httpGetConversations };
