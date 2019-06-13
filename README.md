# NSQ Subscriber Simulation

This is a simple project which simulate the process of multiple NSQ subscribers. The project is based on Express framework (NodeJs), and prepared with simple subscriber & publisher.


## Installation
1. Run the `nsqd` & `nsqlookupd` daemon process on your machine (see: [nsq.io](https://nsq.io))
2. Clone this project and run `npm i` or `npm install` to install module dependencies
3. Make copy of `.env.example` with a new name called `.env` then configure the environment variables inside, including the nsqd address.
4. Run the server by execute `npm run server1` to start **server1**
5. Open new console/terminal then execute `npm run server2` to start **server2**
6. Now you have 2 different running process, which is subscribed to `MESSAGE` topic in NSQ.

## Start simulation
After you see both process server running on these 2 console/terminals, you can start simulation of publishing message by executing the script inside `tool` folder.

    >> node tool/publisher_simulator.js <NSQ_HOST> <NSQ_PORT_TCP>

## Example Demo

<img src="https://raw.github.com/slaveofcode/nsq-multi-subscriber/master/example.gif" align="right" />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
