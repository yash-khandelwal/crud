import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/user_test');

mongoose.connection
    .once('open', () => {
        console.log('Good to go!');
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });