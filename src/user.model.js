import mongoose from 'mongoose';
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

// virtual type attribute of the schema
// value will be calculated by below geter function when attribute is read
userSchema.virtual('postCount').get(function(){ // function(){} notation is important here because of 'this' keyword
    return this.posts.length;
});

// middleware
userSchema.pre('deleteOne', {document: true}, function(next){
    const BlogPost = mongoose.model('blogpost');   // to get hold of BlogPost model
    console.log('middleware called ............');
    BlogPost
        .remove({ _id: {$in: this.blogPosts}})
        .then(() => next());
});

export const User = mongoose.model('user', userSchema);