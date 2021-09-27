import ConversationModel from '../models/conversation.mongoose.js';

async function createConversation(body) {
  return ConversationModel.create({ ...body });
}

async function getConversations(userId) {
  return ConversationModel.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).populate('receiverId', 'id fullName email role');
}

export { createConversation, getConversations };
