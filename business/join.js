module.exports = function(){
    const conn = require('../model/orientdb');

    async function isExistId(id){
      let sql = 'select id from users where id=:id';
      const user = await conn.query(sql, {
        params: {
          id: id
        }
      });

      return (user.length > 0) ? true : false;
    }

    async function joinUser(id, pwd){
      if(await isExistId(id)) throw { name:'exist id', message:'id is existed' };

      let sql = 'insert into users(id, pwd) values(:id, :pwd)';
      const result = await conn.query(sql, {
        params: {
          id: id,
          pwd: pwd
        }
      });

      /*
      [ { '@class': 'users',
        '@type': 'd',
        id: 'qwer',
        pwd: 'qwer',
        '@rid': RecordID { cluster: 35, position: 0 },
        '@version': 1 } ]
      */
      //console.log(result[0]['@rid']);

      return (result.length > 0) ? {code : 200} : {code : 400}; // code 200
    }

    return {
      getConnName: function(){ return conn.name }, // <- db관련 상속받는 객체를 만들어서 공용메소드로 달아보자
      joinUser: joinUser,
    };
}();
