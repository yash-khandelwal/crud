import assert from 'assert';
import {User} from '../src/user.model.js';

describe('Reading users out of the database', () => {
    let testUser;

    beforeEach((done) => {
        testUser = new User({
            name: 'kritagya'
        });
        testUser
            .save()
            .then(() => {
                done();
            });
    })

    it('finds all users with name kritagya', (done) => {
        User.find({name: 'kritagya'})
            .then((users) => {
                assert(users[0]._id.toString() === testUser._id.toString());
                done();
            });
    });

    it('finds the user with particular _id', (done) => {
        User.findById(testUser._id)
            .then((user) => {
                assert(user.name === testUser.name);
                done();
            });
    })
})