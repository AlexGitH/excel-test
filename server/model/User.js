const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const userSchema = new Schema( {
  firstName : String,
  lastName  : String,
  email     : String,
  login     : String,
  password  : String
  // documents     : ['Document'],
  // editableShare : ['Document'], //not owner
  // viewableShare : ['Document']
  // shared : Object,
  // directorId : String
} )

module.exports = mongoose.model( 'User', userSchema );
