import assert from 'assert';
import {User} from '../src/user.model.js';

describe('Deleting a user', () => {
    let testUser;
    beforeEach((done) => {
        testUser = new User({
            name: 'kritagya'
        });
        testUser
            .save()
            .then(() =>{
                done();
            })
    });

    it('model instance remove', (done) => {
        testUser
            .remove()
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method remove', (done) => {
        // Remove all the users with the given filters
        User
            .remove({name: testUser.name})
            .then(() => {
                return User.findOne({name: testUser.name});
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User
            .findOneAndRemove({name: testUser.name})
            .then(() => {
                return User.findOne({name: testUser.name});
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User
            .findByIdAndRemove(testUser._id)
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(user === null);
                done();
            })
    });

});