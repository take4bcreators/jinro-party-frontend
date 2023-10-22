import * as Http from 'http';
import * as Sockjs from 'sockjs';
import type { APIWsData } from '../../src/types/apiWsData';
import { WsDestinationType } from '../../src/config/wsDestinationType';
import { WsSenderType } from '../../src/config/wsSenderType';
import { WsRequestAction } from '../../src/config/wsRequestAction';

// 接続情報指定
// const LISTEN_HOST: string = 'localhost';
const LISTEN_HOST: string = '192.168.11.4';
const LISTEN_PORT: number = 3001;
const END_POINT: string = '/api/ws';

// サーバー起動
const sockjsServer = Sockjs.createServer();
const httpServer = Http.createServer();
sockjsServer.installHandlers(httpServer, { prefix: END_POINT });
httpServer.listen(LISTEN_PORT, LISTEN_HOST);

let sessions: Sockjs.Connection[] = [];

// WebSocket 接続時の処理
sockjsServer.on('connection', (session) => {
  console.log('debug: SockJS Connection');
  // === Open Process Here ===
  sessions.push(session);

  // メッセージ取得時の処理
  session.on('data', (receive) => {
    console.log('debug: SockJS data');
    console.log('debug: message...');
    console.log(receive);
    const receiveData: APIWsData = JSON.parse(receive);
    console.log(receiveData.requestAction);
    // === Receive Process Here ===

    // メッセージ送信
    // const sendData: APIWsData = {
    //   destinationType: WsDestinationType.Player,
    //   destinationDeviceId: '',
    //   senderType: WsSenderType.Server,
    //   senderDeviceId: '',
    //   requestAction: WsRequestAction.GameEnd,
    //   actionParameter01: '',
    //   actionParameter02: '',
    //   actionParameter03: '',
    // };
    // const sendJsonData = JSON.stringify(sendData);
    // conn.write(sendJsonData);

    const sendData = receiveData;
    const sendJsonData = JSON.stringify(sendData);
    for (const oneSession of sessions) {
      oneSession.write(sendJsonData);
    }
  });

  // WebSocket 切断時の処理
  session.on('close', () => {
    console.log('debug: SockJS Close');
    // === Close Process Here ===

    const newSessions = sessions.filter((oneSession) => oneSession !== session);
    sessions = newSessions;
  });
});
