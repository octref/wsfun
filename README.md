# WebSockets Fun

## Usage

`yarn && yarn start`

## Links:

RFC: https://tools.ietf.org/html/rfc6455
WebSockets API on MDN: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

`ws`: https://github.com/websockets/ws

Armin Ronacher: http://lucumr.pocoo.org/2012/9/24/websockets-101/
Popular Medium Article: https://blog.sessionstack.com/how-javascript-works-deep-dive-into-websockets-and-http-2-with-sse-how-to-pick-the-right-path-584e6b8e3bf7

## Notes

### URL

`ws://` for 80 and `wss://` for 443.

### Framing: OpCode

- `0x00`: this frame continues the payload from the last.
- `0x01`: this frame includes utf-8 text data.
- `0x02`: this frame includes binary data.
- `0x08`: this frame terminates the connection.
- `0x09`: this frame is a ping.
- `0x0a`: this frame is a pong.

### Framing: Closing Frame

- `1000`: 1000 indicates a normal closure, meaning that the purpose for which the connection was established has been fulfilled.
- `1001`: 1001 indicates that an endpoint is "going away", such as a server going down or a browser having navigated away from a page.
- `1002`: 1002 indicates that an endpoint is terminating the connection due to a protocol error.
- `1003`: 1003 indicates that an endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).

```js
// client
socket.close(1000, 'close')

// server
conn.on('close', (code, reason) => { })
```

### Libraries

In Browser, use the native `WebSocket` object.
For Server side: [`ws`](https://github.com/websockets/ws) seems decent.

### Ping-Pong

Usually only server sends ping and client responds with pong.

### Heartbeat

https://github.com/websockets/ws#how-to-detect-and-close-broken-connections

## License

MIT © [Pine Wu](https://github.com/octref) 