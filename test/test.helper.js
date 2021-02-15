import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/user_test', { useUnifiedTopology: true, useNewUrlParser: true });

before(() => {
    mongoose.connection
        .once('open', (done) => {
            console.log('good to go...');
            console.info('connected to db...');
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
})


// hook for cleaning up the database before and after testings
beforeEach((done) => {
    // drops the collection from the database
    const { users, blogposts, comments } = mongoose.connection.collections;
    users.drop(() => {
        blogposts.drop(() => {
            comments.drop(() => {
                done();
            })
        })
    });
});