import mongoose from 'mongoose';
import { Comment } from './comment.model';

const blogpostSchema = mongoose.Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment
    }]
});

export const BlogPost = mongoose.model('blogpost', blogpostSchema);