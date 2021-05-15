const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const sheetSchema = new Schema( {
  name       : String,
  documentId : String
  // document : 'Document'
  // document : 'Document'
  // cells    : ['Cell']

  // shared : Object,
  // directorId : String
} )

module.exports = mongoose.model( 'Sheet', sheetSchema );
