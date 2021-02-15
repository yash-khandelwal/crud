import mongoose from 'mongoose';
import { Comment } from './comment.model.js';

const blogpostSchema = mongoose.Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

export const BlogPost = mongoose.model('blogpost', blogpostSchema);