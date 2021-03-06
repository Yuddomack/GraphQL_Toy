module.exports = function(){
    const conn = require('../model/orientdb');

    async function doLogin(id, pwd){
      let sql = 'select id, @rid from users where id=:id and pwd=:pwd';
      const result = await conn.query(sql, {
        params: {
          id: id,
          pwd: pwd
        }
      });

      //console.log(result[0]['rid']);

      return (result.length > 0) ? {code : 200, rid : result[0]['rid']} : {code : 400}; // code 200
    }

    return {
      getConnName: function(){ return conn.name }, // <- db관련 상속받는 객체를 만들어서 공용메소드로 달아보자
      doLogin: doLogin,
    };
}();

/*
[ { '@class': 'users',
  '@type': 'd',
  id: 'qwer',
  pwd: 'qwer',
  '@rid': RecordID { cluster: 35, position: 0 },
  '@version': 1 } ]
*/


// context에 req.body에 관한 내용이 나오는지.
// 아니면 이러한 방식으로 넘겨주면 될지
// app.use('/graphql', graphqlHTTP(request => {
//   return {
//     schema: MyGraphQLSchema,
//     context: { startTime: Date.now() },
//     graphiql: true,
//     extensions
//   };
// }));
