'use strict';

const express = require('express')

const port = process.env.port || 3000

const app = express()

const msgConsumer = require('./daemon/message_consumer')

// running the daemon
msgConsumer()

app.listen(port, () => {
  console.log('Server running at:', port)
})
