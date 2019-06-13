'use strict'

const nsq = require('nsqjs')
const shortId = require('shortid')
const delaying = require('delaying')

const TOPIC = 'MESSAGE'

const getArgs = (startFromIdx = 2) => {
  const args = []
  for (const arg of process.argv.slice(startFromIdx)) {
    args.push(arg)
  }
  return args
}

const runSimulation = async () => {
  const args = getArgs()
  const nsqHost = args[0]
  const nsqPort = args[1]
  
  const writer = new nsq.Writer(nsqHost, nsqPort)
 
  writer.connect()

  let x = 1
  while (true) {
    const msg = {id: shortId.generate(), text: 'Message number ' + x}
    console.log('Publishing:', msg)
    writer.publish(TOPIC, msg)

    x++
    await delaying('1000')
  }
}

runSimulation()
