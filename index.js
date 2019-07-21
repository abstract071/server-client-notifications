const express = require( 'express' )
const cors = require( 'cors' )
const morgan = require( 'morgan' )
const errorHandler = require( 'errorhandler' )

const router = require( './routes' )


//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

//Initiate our app
const app = express()

//Configure our app
app.use( cors() )
app.use( morgan( 'dev' ) )
// app.use( express.urlencoded( { extended: false } ) )
app.use( express.json() )
app.use( router )

if( !isProduction ) {
  app.use( errorHandler() )
}

app.use( ( err, req, res, next ) => {
  res.status( err.status || 500 )

  res.json( {
    errors: {
      message: err.message,
      error: {}
    }
  } )
} )

app.listen( 8000, () => console.log( 'Server running on http://localhost:8000/' ) )
