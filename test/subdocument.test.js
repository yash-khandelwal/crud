import assert from 'assert';
import { User } from '../src/user.model.js';

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const testUser = new User({
            name: 'kritagya',
            posts: [
                {
                    title: 'post title 1'
                },
                {
                    title: 'post title 2'
                }
            ]
        });
        testUser
            .save()
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(user.posts[0].title === 'post title 1');
                done();
            });
    });

    it('can add subdocuments to an existing record', (done) => {
        const testUser = new User({
            name: 'kritagya',
            posts: [
                {
                    title: 'post title 1'
                },
                {
                    title: 'post title 2'
                }
            ]
        });
        testUser
            .save()
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                user.posts.push({
                    title: 'new post title'
                });
                return user.save();
            })
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(user.posts[2].title === 'new post title');
                done();
            });
    })

    it('can remove a subdocument', (done) => {
        const testUser = new User({
            name: 'kritagya',
            posts: [
                {
                    title: 'post title 1'
                },
                {
                    title: 'post title 2'
                }
            ]
        });
        testUser
            .save()
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                user.posts[0].remove();
                return user.save()
            })
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(user.posts.length === 1);
                done();
            });
    })

})