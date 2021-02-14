import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    postCount: {
        type: Number,
        default: 0
    }
});

export const User = mongoose.model('user', userSchema);