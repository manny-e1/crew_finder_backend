import mongoose from 'mongoose';
import { STATUS } from '../constants/enums.constants.js';


const applicationSchema = mongoose.Schema({
    auditionPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuditionPost',
        required: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applicationLetter: {
        type: String,
        required: true,
    }, 
    applicationStatus: {
        type: String,
        default: STATUS.PENDING,
        enum: Object.values(STATUS),
    }
}, {
    timestamps: true,
})

const ApplicationModel = mongoose.model('Application', applicationSchema)

export default ApplicationModel