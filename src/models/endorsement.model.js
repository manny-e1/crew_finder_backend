import mongoose from 'mongoose';

const endorsementSchema = mongoose.Schema(
  {
    endorser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    endorsee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EndorsementModel = mongoose.model('Endorsement', endorsementSchema);

export default EndorsementModel;
