const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const cellSchema = new Schema( {
  col     : Number,
  row     : Number,
  sheetId : String,
  // sheet : 'Sheet',
  value   : String,
  expr    : String
  // shared : Object,
  // directorId : String
} )

module.exports = mongoose.model( 'Cell', cellSchema );
