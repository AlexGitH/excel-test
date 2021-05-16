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

 // DEBUG: remove after testing
cellSchema.virtual( 'coords' ).get( function() { return `${this.col}|${this.row}` } )

module.exports = mongoose.model( 'Cell', cellSchema );
