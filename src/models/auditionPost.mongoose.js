import mongoose from 'mongoose';
import { GENDER, TALENT } from '../constants/enums.constants.js';
const auditionPostSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    talents: [
        {
            type: String,
            enum: Object.values(TALENT),
            required: true
        }
    ],
    applicationCount: {
        type: Number,
        default: 0
    },
    ageRange: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    languages: [{
        type: String,
        required: true
    }],
    gender: [{
        type: String,
        required: true,
        enum: Object.values(GENDER)
    }],
    region: {
        type: String,
        required: true
    },
    endorsementCount: {
        type: Number,
        required: true
    },
    isAcceptingApplication: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
})

const AuditionPostModel = mongoose.model('AuditionPost', auditionPostSchema)

export default AuditionPostModel