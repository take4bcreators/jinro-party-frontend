import SockJS from 'sockjs';
import * as Http from 'http';
import { APIWsData } from '@/types/apiWsData';
import { APIRouting } from '@/config/apiRouting';

export default function Home(): JSX.Element {
  const wsHostName = process.env.NEXT_PUBLIC_HOSTNAME;
  const wsPortNum = parseInt(process.env.NEXT_PUBLIC_WEB_SOCKET_PORT ?? '');
  const wsEndPoint = APIRouting.Point.WebSocket;
  const sockjsServer = SockJS.createServer();
  const httpServer = Http.createServer();
  sockjsServer.installHandlers(httpServer, { prefix: wsEndPoint });
  httpServer.listen(wsPortNum, wsHostName);

  let sessions: SockJS.Connection[] = [];
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
      const newSessions = sessions.filter(
        (oneSession) => oneSession !== session
      );
      sessions = newSessions;
    });
  });

  return (
    <main>
      <p>Create WebSocket Server</p>
    </main>
  );
}
