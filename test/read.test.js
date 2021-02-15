import assert from 'assert';
import {User} from '../src/user.model.js';

describe('Reading users out of the database', () => {
    let testUser, testUser2, testUser3, testUser4;

    beforeEach((done) => {
        testUser = new User({
            name: 'kritagya'
        });
        testUser2 = new User({
            name: 'yash'
        });
        testUser3 = new User({
            name: 'karthik'
        });
        testUser4 = new User({
            name: 'diary'
        });
        Promise.all([
            testUser.save(),
            testUser2.save(),
            testUser3.save(),
            testUser4.save(),
        ]).then(() => done());
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

    it('can skip and limit the result set', (done) => {
        User
            .find({})
            .sort({name: 1})
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === testUser3.name);
                assert(users[1].name === testUser.name);
                done();
            })
    });

})