module.exports = function(){
    const conn = require('../model/orientdb');

    return {
      getConnName: function(){ return conn.name },
    };
}();
