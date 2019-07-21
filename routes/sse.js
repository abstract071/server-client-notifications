const express = require( 'express' )
const sseRouter = express.Router()


sseRouter.get( '/events', ( req, res, next ) => {
  console.log( `Request url: ${req.url}` )

  const eventHistory = []

  req.on( 'close', () => {
    closeConnection( res )
  } )

  // if ( req.url.toLowerCase() === '/events' ) {
  res.writeHead( 200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  } )

  checkConnectionToRestore( req, res, eventHistory )

  sendEvents( res, eventHistory )
  // } else {
  //   res.writeHead( 404 )
  //   res.end()
  // }

  // return res.status( 200 ).json( { response: 'GET /current OK' } )
} )

const sendEvents = ( response, eventHistory ) => {
  setTimeout( () => {
    if ( !response.finished ) {
      const eventString = 'id: 1\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landing"}\n\n'
      response.write( eventString )
      eventHistory.push( eventString )
    }
  }, 3000 )

  setTimeout( () => {
    if ( !response.finished ) {
      const eventString = 'id: 2\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landed"}\n\n'
      response.write( eventString )
      eventHistory.push( eventString )
    }
  }, 6000 )

  setTimeout( () => {
    if ( !response.finished ) {
      const eventString = 'id: 3\nevent: flightRemoval\ndata: {"flight": "I768"}\n\n'
      response.write( eventString )
      eventHistory.push( eventString )
    }
  }, 9000 )

  setTimeout( () => {
    if ( !response.finished ) {
      const eventString = 'id: 4\nevent: closedConnection\ndata: \n\n'
      eventHistory.push( eventString )
    }
  }, 12000 )
}

const closeConnection = ( response ) => {
  if ( !response.finished ) {
    response.end()
    console.log( 'Stopped sending events.' )
  }
}

const checkConnectionToRestore = ( request, response, eventHistory ) => {
  if ( request.headers['last-event-id'] ) {
    const eventId = parseInt( request.headers['last-event-id'] )

    const eventsToReSend = eventHistory.filter( ( e ) => e.id > eventId )

    eventsToReSend.forEach( ( e ) => {
      if ( !response.finished ) {
        response.write( e )
      }
    } )
  }
}

module.exports = sseRouter
