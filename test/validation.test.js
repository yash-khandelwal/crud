import assert from 'assert';
import {User} from '../src/user.model.js';

describe('Validating Records',() => {
    it('requires a user name', (done) => {
        const testUser = new User({ 
            name: undefined
        });
        const validationResult = testUser.validateSync(); // synchronous validation result there is a validate() which is async
        // console.log(validationResult);
        const { message } = validationResult.errors.name;
        // console.log(message);
        assert(message === 'Name is required!');
        done();
    });

    it('requires a user\'s name longer than 2 characters', (done) => {
        const testUser = new User({
            name: 'kr'
        });
        const validationResult = testUser.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters.');
        done();
    });

    it('disallows invalid records from being saved', (done) => {
        const testUser = new User({
            name: 'kr'
        });
        testUser
            .save()
            .then(() => {
                console.log('promise return resolved...');
                assert(false);
            })
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;
                console.log(message);
                assert(message === 'Name must be longer than two characters.');
                done();
            })
    });
});