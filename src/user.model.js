import mongoose from 'mongoose';
import { BlogPost } from './blogpost.model.js';
import { postSchema } from './post.schema.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => {
                return name.length > 2;
            },
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'Name is required!'],
    },
    likes: {
        type: Number,
        default: 0
    },
    posts: {
        type: [postSchema],
        default: []
    },
    blogPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogpost'
    }]
});

userSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

export const User = mongoose.model('user', userSchema);