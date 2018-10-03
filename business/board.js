module.exports = function(){
    const conn = require('../model/orientdb');

    async function gqlGetAllContent(session){
      let sql = 'select * from board fetchplan *:1';
      return await conn.query(sql);
    }

    return {
      gqlGetAllContent: gqlGetAllContent,
    };
}();
