'use strict'

const nsq = require('nsqjs')

const TOPIC = 'MESSAGE'
const CHANNEL = 'MESSAGE_CONSUMER'

const fn = () => {
  const reader = new nsq.Reader(TOPIC, CHANNEL, {
    lookupdPollInterval: 10, // 10 secs pool interval
    lookupdHTTPAddresses: [
      process.env.nsq_lookup_host_tcp, // 127.0.0.1:4160
      process.env.nsq_lookup_host_http, // 127.0.0.1:4161
      // another lookup here...
    ],
  })

  // connecting
  reader.connect()

  // event handlers
  reader.on(nsq.Reader.ERROR, err => {
    console.log('[NSQ] Reader error:', err)
  })
  reader.on(nsq.Reader.NSQD_CONNECTED, () => {
    console.info('[NSQ] NSQ connected!')
  })

  // message handler
  reader.on('message', msg => {
    // finish the message so it'll now repeated on another instances
    msg.finish()

    // do something with message
    const { id, text } = msg.json()
    console.log(`Processing message [${id}]: ${text}`)
  })
}

module.exports = fn
