import assert from 'assert';
import {User} from '../src/user.model.js';

describe('virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const testUser = new User({
            name: 'kritagya',
            posts: [
                {
                    title: 'post title 1'
                }
            ]
        });
        testUser
            .save()
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(testUser.postCount === 1);
                done();
            });
    })
})