const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
require('colors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            movement: '/api/movements'
        }

        // Connect Data Base
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Applications Routs
        this.routes();
    }

    middlewares() {
        //Cors
        this.app.use(cors())

        // Read and code parse
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'))
    }

    async connectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.movement, require('../routes/movement.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('[RobotsInMarsApp] Server is conected to port: '.green + this.port.green);
        })
    }
}


module.exports = Server;