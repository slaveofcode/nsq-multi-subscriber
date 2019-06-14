'use strict';

require('dotenv').config()

const express = require('express')

const port = process.env.port || 3000

const app = express()

const msgConsumer = require('./daemon/message_consumer')
const msgConsumerMultiLookup = require('./daemon/message_consumer_multi_lookuphost')

// running the daemon
if (process.env.multi_lookup) {
  msgConsumerMultiLookup()
} else {
  msgConsumer()
}

app.listen(port, () => {
  console.log('Server running at:', port)
})
