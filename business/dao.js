module.exports = {
  query: async function(sql, params){
    const conn = require('../model/orientdb');

    return await conn.query(sql, params);
  },
  ckSession: function(session){
    if(!session.rid) throw {name:'invalid session', message:'please login again'};

    return this;
  },
  join: require('./join'),
  login: require('./login'),
  board: require('./board'),
};
