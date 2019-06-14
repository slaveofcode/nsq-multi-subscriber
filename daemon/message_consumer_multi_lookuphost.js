'use strict'

const nsq = require('nsqjs')

const TOPIC = 'MESSAGE_BOOM'
const CHANNEL = 'MESSAGE_CONSUMER'

const fn = () => {
  const reader = new nsq.Reader(TOPIC, CHANNEL, {
    lookupdPollInterval: 10, // 10 secs pool interval
    lookupdHTTPAddresses: [
      process.env.nsq_lookup_host_1_tcp, // 127.0.0.1:4160
      process.env.nsq_lookup_host_1_http, // 127.0.0.1:4161
      process.env.nsq_lookup_host_2_tcp, // 127.0.0.1:4160
      process.env.nsq_lookup_host_2_http, // 127.0.0.1:4161
      // another lookup here...
    ],
  })

  // connecting
  reader.connect()

  // event handlers
  reader.on(nsq.Reader.ERROR, err => {
    console.log('[NSQ] Reader error:', err)
  })
  reader.on(nsq.Reader.NSQD_CONNECTED, (hostName, port) => {
    console.info(`[NSQ] Connected on nsq{${hostName}:${port}}`)
  })

  // message handler
  reader.on('message', msg => {
    // finish the message so it'll now repeated on another instances
    msg.finish()

    // do something with message
    const { simulator, id, text } = msg.json()
    if (simulator) {
      console.log(`[${simulator}] Processing message [${id}]: ${text}`)
    } else {
      console.log(`Processing message [${id}]: ${text}`)
    }
  })
}

module.exports = fn
