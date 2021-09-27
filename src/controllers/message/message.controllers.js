import {
  retrieveMessages,
  sendMessage,
} from '../../services/message.services.js';

async function httpSendMessage(req, res) {
  res.status(201).json(await sendMessage(req.body));
}

async function httpRetrieveMessages(req, res) {
  res.status(200).json(await retrieveMessages(req.params.conversationId));
}

export { httpRetrieveMessages, httpSendMessage };
