'use client';
import type { APIWsData } from '@/types/apiWsData';
import { GameState } from '@/config/gameState';
import { WsService } from '@/utils/wsService';
import { useEffect, useState } from 'react';

import { WsSenderType } from '@/config/wsSenderType';
import { WsDestinationType } from '@/config/wsDestinationType';
import { WsRequestAction } from '@/config/wsRequestAction';

export default function Home(): JSX.Element {
  const [wsReceiveData, setWsReceiveData] = useState<APIWsData | undefined>(
    undefined
  );
  const [_wsOpen, setWsOpen] = useState(false);
  const [wsService, setWsService] = useState<WsService | undefined>(undefined);
  const defaultSendData: APIWsData = {
    destinationType: WsDestinationType.MonitorSite,
    destinationDeviceId: '',
    senderType: WsSenderType.Server,
    senderDeviceId: '',
    requestAction: WsRequestAction.GameScreenChange,
    actionParameter01: GameState.NightPhase,
    actionParameter02: '',
    actionParameter03: '',
  };
  const defaultSendDataJson = JSON.stringify(defaultSendData, null, '\t');
  const [sendData, setSendData] = useState(defaultSendDataJson);

  useEffect(() => {
    setWsService(
      new WsService(WsSenderType.Debug, setWsOpen, setWsReceiveData)
    );
  }, []);

  if (wsService == undefined) {
    return (
      <>
        <p>Now Loading...</p>
      </>
    );
  }

  console.log(wsReceiveData);
  const wsReceiveDataJson = JSON.stringify(wsReceiveData, null, '\t');

  function handleInputText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    // console.log(e.target.value);
    setSendData(e.target.value);
  }

  function wsSend() {
    const sendDataJson: APIWsData = JSON.parse(sendData);
    wsService?.send(sendDataJson);
  }

  return (
    <>
      <h1>WebSocket TEST</h1>
      <section>
        <h2>操作</h2>
        <form action="">
          <fieldset>
            <legend>送信・受信</legend>
            <p>
              <textarea
                name="send-msg"
                id="send-msg"
                onInput={handleInputText}
                value={sendData}
                cols={80}
                rows={12}
                placeholder="メッセージを入力"
              />
            </p>
            <p>
              <input type="button" defaultValue="送信" onClick={wsSend} />
            </p>
          </fieldset>
        </form>
      </section>
      <section>
        <h2>受信メッセージ</h2>
        <pre>
          <code>{wsReceiveDataJson}</code>
        </pre>
      </section>
    </>
  );
}
