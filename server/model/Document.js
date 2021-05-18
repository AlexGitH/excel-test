const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const documentSchema = new Schema( {
  name    : String,
  ownerId : String
  // sheets  : ['Sheet'], //relation in sheet
  // editors : ['User'],
  // viewers : ['User']
} )

module.exports = mongoose.model( 'Document', documentSchema );
