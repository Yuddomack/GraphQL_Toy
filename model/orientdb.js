const config = require('./config').orientdb;
const OrientDB = require('orientjs');

const server = OrientDB({
   host:       config.host,
   port:       config.port,
   username:   config.username,
   password:   config.password
});

const db = server.use('o3');

module.exports = db;
