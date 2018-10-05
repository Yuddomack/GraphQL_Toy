module.exports = function(dao){
  const Graphql = require('graphql');

  const String = Graphql.GraphQLString;
  const Type = function(obj){
    return new Graphql.GraphQLObjectType(obj);
  };
  const List = function(obj){
    return new Graphql.GraphQLList(obj);
  };

  const userType = Type({
    name: "User",
    fields: {
      //'@rid': { type: String },
      id: { type: String },
      pwd: { type: String }
    }
  });

  const boardType = Type({
    name: "Board",
    fields: {
      //'@rid': { type: String },
      title: { type: String },
      content: { type: String },
      author: { type: userType }
    }
  })

  // https://github.com/graphql/graphql-js/issues/799#issuecomment-293398750
  const queryType = Type({
    name: "Query",
    fields: {

      allContents: {
        type: List(boardType),
        resolve: async function(_, _, session, _){
          console.log(session);
          return await dao.ckSession(session).board.gqlGetAllContent(); // 스키마의 throw는 {} 꼴로 하면 [object object]가 나옴, 그냥 메세지만 작성하면 됨
        }
      },

    }
  });

  return new Graphql.GraphQLSchema({ query: queryType });
}
