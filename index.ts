import { Server as WSServer } from 'ws'

import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'

const serveClientIndex = (res: http.ServerResponse) => {
  const filePath = path.resolve(__dirname, './client/index.html')
  const stat = fs.statSync(filePath)

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream(filePath)
  readStream.pipe(res)
}

const server = http.createServer((req, res) => {
  serveClientIndex(res)
})

const wsServer = new WSServer({ server })

wsServer.on('connection', (conn) => {
  console.log('connection established')

  conn.on('pong', () => {
    console.log('<- pong from ws-client')
  })

  conn.on('message', (msg) => {
    console.log(`<- received msg: ${msg}`)

    console.log(`-> echoing back message ${msg}`)
    conn.send(msg)

    if (msg.toString().startsWith('ping')) {
      conn.ping('ping from ws-server')
    }
  })

  conn.on('close', (code, reason) => {
    console.log(`closed with code ${code} for reason ${reason}`)
  })
})

server.listen(4000, () => {
  console.log('Listening for ws:// and http:// at localhost:4000')
})

setInterval(() => {
  wsServer.clients.forEach((wsConn) => {
    wsConn.ping()
  })
}, 5000)