module.exports = function(){
    const conn = require('../model/orientdb');

    async function doLogin(id, pwd){
      let sql = 'select id from users where id=:id and pwd=:pwd';
      const result = await conn.query(sql, {
        params: {
          id: id,
          pwd: pwd
        }
      });

      return (result.length > 0) ? 200 : 400; // code 200
    }

    return {
      getConnName: function(){ return conn.name }, // <- db관련 상속받는 객체를 만들어서 공용메소드로 달아보자
      doLogin: doLogin,
    };
}();
