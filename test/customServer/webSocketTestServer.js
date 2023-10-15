const http = require('http');
const sockjs = require('sockjs');

// 接続情報指定
const LISTEN_HOST = 'localhost';
const LISTEN_PORT = '3001';
const END_POINT = '/api/ws';

const sockjsServer = sockjs.createServer();
const httpServer = http.createServer();
sockjsServer.installHandlers(httpServer, { prefix: END_POINT });
httpServer.listen(LISTEN_PORT, LISTEN_HOST);

// WebSocket 接続時の処理
sockjsServer.on('connection', (conn) => {
  console.log('debug: SockJS Connection');
  // === Close Process Here ===

  // メッセージ取得時の処理
  conn.on('data', (message) => {
    console.log('debug: SockJS data');
    console.log('debug: message...');
    console.log(message);
    // === Close Process Here ===

    // メッセージ送信
    // conn.write('Hello from WebSocket Test Server');
  });

  // WebSocket 切断時の処理
  conn.on('close', () => {
    console.log('debug: SockJS Close');
    // === Close Process Here ===
  });
});
