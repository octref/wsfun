import * as WebSocket from 'ws'
import * as readline from 'readline'

const socket = new WebSocket('ws://localhost:4000')

socket.onopen = ev => {
  console.log('connection established')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '-> '
  })

  rl.prompt()

  rl.on('line', line => {
    console.log(`-> ${line.trim()}`)
    socket.send(line.trim())

    setTimeout(() => {
      rl.prompt()
    }, 100)
  }).on('close', () => {
    console.log('done')
    process.exit()
  })
}

socket.onmessage = ev => {
  console.log(`<- received msg: ${ev.data}`)
}
