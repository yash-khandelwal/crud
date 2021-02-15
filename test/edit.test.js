import assert from 'assert';
import {User} from '../src/user.model.js';

describe('Updating Records', () => {
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

    const assertName = (operation, done) => {
        operation
            .then(() => {
                return User.findById(testUser._id);
            })
            .then((user) => {
                assert(user.name === 'khandelwal');
                done();
            })
    }

    it('model class using set and save', (done) => {
        testUser.set('name', 'khandelwal');
        assertName(testUser.save(), done);
    });

    it('model class find by id and update', (done) => {
        assertName(User.findByIdAndUpdate(testUser._id, {name: 'khandelwal'}), done);
    });

    it('A user can have their postCount incremented by 1', (done) => {
        User
            .updateMany({name: 'kritagya'}, {$inc: {likes: 1}})
            .then(() => {
                return User.findOne({name: 'kritagya'});
            })
            .then((user) => {
                assert(user.likes === 1);
                done();
            })
    })

})