import mongoose from 'mongoose';

const blogpostSchema = mongoose.Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

export const BlogPost = mongoose.model('blogpost', blogpostSchema);