import * as Http from 'http';
import * as Sockjs from 'sockjs';
import type { APIWsData } from '../../src/types/apiWsData';

// 接続情報指定
const LISTEN_HOST: string = 'localhost';
// const LISTEN_HOST: string = '192.168.11.4';
const LISTEN_PORT: number = 3001;
const END_POINT: string = '/api/ws';

const sockjsServer = Sockjs.createServer();
const httpServer = Http.createServer();
sockjsServer.installHandlers(httpServer, { prefix: END_POINT });
httpServer.listen(LISTEN_PORT, LISTEN_HOST);
let sessions: Sockjs.Connection[] = [];
sockjsServer.on('connection', (session) => {
  console.log('debug: SockJS Connection');
  sessions.push(session);

  session.on('data', (receive) => {
    console.log('debug: SockJS data');
    console.log('debug: message...');
    console.log(receive);
    const receiveData: APIWsData = JSON.parse(receive);
    console.log(receiveData.requestAction);
    const sendData = receiveData;
    const sendJsonData = JSON.stringify(sendData);
    for (const oneSession of sessions) {
      oneSession.write(sendJsonData);
    }
  });

  session.on('close', () => {
    console.log('debug: SockJS Close');
    const newSessions = sessions.filter((oneSession) => oneSession !== session);
    sessions = newSessions;
  });
});
