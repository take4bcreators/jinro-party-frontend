import * as Http from 'http';
import * as Sockjs from 'sockjs';
import type { APIWsData } from '../../src/config/apiWsData';
import { WsDestinationType } from '../../src/config/wsDestinationType';
import { WsSenderType } from '../../src/config/wsSenderType';
import { WsRequestAction } from '../../src/config/wsRequestAction';

// 接続情報指定
const LISTEN_HOST: string = 'localhost';
const LISTEN_PORT: number = 3001;
const END_POINT: string = '/api/ws';

// サーバー起動
const sockjsServer = Sockjs.createServer();
const httpServer = Http.createServer();
sockjsServer.installHandlers(httpServer, { prefix: END_POINT });
httpServer.listen(LISTEN_PORT, LISTEN_HOST);

// WebSocket 接続時の処理
sockjsServer.on('connection', (conn) => {
  console.log('debug: SockJS Connection');
  // === Open Process Here ===

  // メッセージ取得時の処理
  conn.on('data', (message) => {
    console.log('debug: SockJS data');
    console.log('debug: message...');
    console.log(message);
    const receiveData: APIWsData = JSON.parse(message);
    console.log(receiveData.requestAction);
    // === Receive Process Here ===

    // メッセージ送信
    const sendData: APIWsData = {
      destinationType: WsDestinationType.Player,
      destinationDeviceId: '',
      senderType: WsSenderType.Server,
      senderDeviceId: '',
      requestAction: WsRequestAction.GameEnd,
      actionParameter01: '',
      actionParameter02: '',
      actionParameter03: '',
    };
    const sendJsonData = JSON.stringify(sendData);
    conn.write(sendJsonData);
  });

  // WebSocket 切断時の処理
  conn.on('close', () => {
    console.log('debug: SockJS Close');
    // === Close Process Here ===
  });
});
