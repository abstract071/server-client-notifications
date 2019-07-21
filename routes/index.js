const express = require( 'express' )
const router = express.Router()


const sseRouter = require( './sse' )

if ( process.env.NODE_APP_MODE === 'sse' ) {
  router.use( '/api', sseRouter )
}

module.exports = router
