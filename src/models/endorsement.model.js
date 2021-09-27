import mongoose from 'mongoose';

const endorsementSchema = mongoose.Schema({
    endorserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    endorseeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const EndorsementModel = mongoose.model('Endorsement', endorsementSchema);

export default EndorsementModel;