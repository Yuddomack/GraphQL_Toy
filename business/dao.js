module.exports = {
  query: async function(sql, params){
    const conn = require('../model/orientdb');

    return await conn.query(sql, params);
  },
  ckSession: function(session){
    if(!session.rid) throw "invalid session";

    return this;
  },
  join: require('./join'),
  login: require('./login'),
  board: require('./board'),
};
