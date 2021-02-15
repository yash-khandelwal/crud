import assert from 'assert';
import { User } from '../src/user.model.js';
import { BlogPost } from '../src/blogpost.model.js';
import { Comment } from '../src/comment.model.js';

describe('Associations', () => {
    let testUser, testBlogPost, testComment;
    beforeEach((done) => {
        testUser = new User({
            name: 'kritagya'
        });
        testBlogPost = new BlogPost({
            title: 'KK is king',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt amet soluta, fugit totam doloribus officia at? Iste, eaque pariatur quod numquam laborum sunt autem ea sequi similique fugit dolorum.'
        });
        testComment = new Comment({
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, recusandae.'
        });
        // reference linking (mongoose is doing heavy lifting here)
        testUser.blogPosts.push(testBlogPost);
        testBlogPost.comments.push(testComment);
        testComment.user = testUser;
        Promise.all([
            testUser.save(),
            testBlogPost.save(),
            testComment.save()
        ]).then(() => {
            done();
        })
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User
            .findById(testUser._id)
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === testBlogPost.title);
                done();
            })
    });

    it('saves a full relation graph', (done) => {
        User
            .findById(testUser._id)
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user',
                        select: 'name'
                    }
                }
            })
            .then((user) => {
                assert(user.blogPosts[0].comments[0].user.name === testUser.name);
                done();
            })
    });

});