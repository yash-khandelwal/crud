import assert from 'assert';
import {User} from '../src/user.model.js';

describe('Creating Records', () => {
    it('saves a user', () => {
        const testUser = new User({
            name: 'kritagya khandelwal'
        });
        testUser.save();
    });
});