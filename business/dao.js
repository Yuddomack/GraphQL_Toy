module.exports = {
  query:async function(sql, params){
    const conn = require('../model/orientdb');

    return await conn.query(sql, params);
  }
  join:require('./join'),
  login:require('./login'),
};
