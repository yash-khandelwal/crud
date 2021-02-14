import mongoose from 'mongoose';

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
    }
});

export const User = mongoose.model('user', userSchema);