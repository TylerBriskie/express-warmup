const knex = require('./db/knex.js')
const bcrypt = require('bcrypt')

module.exports = {
  findUserByEmail: function(email){
      return knex('users').where('email', email).first()
  },

  decrypt: function(hash, plainText) {
      return bcrypt.compare(hash, plainText).then(function(res) {
        console.log(res);
            if (res === true) {
              return true;
            } else {
              return false;
            }
        });
    }


}
