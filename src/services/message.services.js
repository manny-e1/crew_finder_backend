import MessageModel from '../models/message.mongoose.js';

async function sendMessage(body) {
  return MessageModel.create({ ...body });
}

async function retrieveMessages(conversationId) {
  return MessageModel.find({ conversationId: conversationId }).populate(
    'senderId',
    'id fullName email role'
  );
}

export { sendMessage, retrieveMessages };
