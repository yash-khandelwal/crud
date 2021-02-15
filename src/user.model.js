import mongoose from 'mongoose';
import {postSchema} from './post.schema.js'

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
    postCount: {
        type: Number,
        default: 0
    },
    posts: {
        type: [postSchema],
        default: []
    }
});

export const User = mongoose.model('user', userSchema);