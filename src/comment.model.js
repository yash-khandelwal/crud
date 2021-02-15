import mongoose from 'mongoose';
import {User} from './user.model.js';

const commentSchema = mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

export const Comment = mongoose.model('comment', commentSchema);