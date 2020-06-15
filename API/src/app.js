const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const database = require('./db/');

const tasksCreation = 'CREATE TABLE IF NOT EXISTS tasks (id serial PRIMARY KEY, email varchar(80) not null, name varchar(100) not null, detail varchar(500) not null, completed boolean DEFAULT false not null, returned integer DEFAULT 0 not null)';

database
    .query(tasksCreation)
    .catch(e => console.error(e.stack));

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;