import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/user_test', { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection
    .once('open', () => {
        console.log('Good to go!');
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });

// hook for cleaning up the database before and after testings
beforeEach((done) => {
    // drops the collection from the database
    mongoose.connection.collections.users.drop(() => {
        // Ready to run the next test
        done();
    });
});