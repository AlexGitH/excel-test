const express = require( 'express' )
const app = express()
const mongoose = require( 'mongoose' )
const { graphqlHTTP } = require( 'express-graphql' );

const port = 3001 // common express port;
// const port = 3000 // use graphiql on react port for testing queries

const schema = require( './schema' );

mongoose.connect( 'mongodb://mongo-1:27017/a-excel', {
  useUnifiedTopology : true,
  useFindAndModify   : false,
  useNewUrlParser    : true
} );
const dbConnection = mongoose.connection;

dbConnection.on( 'error', err => console.log( `Connection error: ${err}` ) )
dbConnection.on( 'open', () => console.log( 'Connected to DB!' ) )

  app.use( '/graphql', graphqlHTTP( async() => ( {
    schema,
    graphiql : true, //console
    pretty   : true
  } ) ) )
  .listen( port, function( err_ ) {
    console.log( `GraphQL Server is now running on localhost:${port}` );
  } );
