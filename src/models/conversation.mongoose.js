import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

export default ConversationModel;
