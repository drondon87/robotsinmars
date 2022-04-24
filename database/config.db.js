const mongoose = require('mongoose');
require('colors');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('[RobotsInMarsApp] Data Base is Online'.green);


    } catch (error) {
        console.error(error);
        throw new Error('[RobotsInMarsApp] Error starting Data Base'.red);
    }
}

module.exports = {
    dbConnection
}