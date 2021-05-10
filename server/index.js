const express = require( 'express' )
const bodyParser = require( 'body-parser' )

const port = 3001

const app = express()
// app.use( express.static( PUBLIC ) );

app.use( bodyParser.json() )

app.get( '/test', async( req, res ) => {
  res.type( 'json' );
  res.send( { status: 'ok', response: 'SERVER WORKS!' } );
} )

app.listen( port, () => {
  console.log( `Example app listening at http://localhost:${port}` )
} )
