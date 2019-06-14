'use strict'

const nsq = require('nsqjs')
const shortId = require('shortid')
const delaying = require('delaying')

/**
 * Running this script by:
 * 
 * >> node tool/multi_nsq_publisher_simulator.js <nsqd_host_1>:<nsqd_port_1> <nsqd_host_2>:<nsqd_port_2>
 */

const TOPIC = 'MESSAGE_BOOM'

const getArgs = (startFromIdx = 2) => {
  const args = []
  for (const arg of process.argv.slice(startFromIdx)) {
    args.push(arg)
  }
  return args
}

const getNSQAddress = () => {
  const args = getArgs()
  const nsqHosts = []
  for (const arg of args) {
    nsqHosts.push(arg.split(':'))
  }
  return nsqHosts
}

const simulatePublication = async (simulatorId, nsqHost, nsqPort) => {
  const writer = new nsq.Writer(nsqHost, nsqPort)
 
  writer.connect()

  let x = 1
  while (true) {
    const msg = {
      simulator: simulatorId, 
      id: shortId.generate(), 
      text: 'Message number ' + x
    }
    console.log(`[${simulatorId}] Publishing:`, msg)
    writer.publish(TOPIC, msg, err => {
      if (err) {
        console.log('====== ERROR ======')
        console.log(err)
      }
    })

    x++
    await delaying('0.1')
  }
}

let simulatorId = 1
const getSimulatorId = () => {
  return 'SIM_' + simulatorId++
}

const runSimulation = () => {
  const nsqAddrs = getNSQAddress()
  for (const [host, port] of nsqAddrs) {
    simulatePublication(getSimulatorId(), host, port).catch(err => {
      console.log(err)
    })
  }
}

runSimulation()
