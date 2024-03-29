import { Dispatch, SetStateAction } from 'react';
import SockJS from 'sockjs-client';
import { APIRouting } from '@/config/apiRouting';
import { GameState } from '@/config/gameState';
import { WS_ALLOWED_DESTINATION_TYPES } from '@/config/wsAllowedDestinationTypes';
import { WsDestinationType } from '@/config/wsDestinationType';
import { WsRequestAction } from '@/config/wsRequestAction';
import { WsSenderType } from '@/config/wsSenderType';
import { APIWsSelfInfo } from '@/types/apiWsSelfInfo';
import { APIService } from './apiService';
import { DeviceIdService } from './deviceIdService';
import { SessionIdService } from './sessionIdService';
import type { APIWsData } from '@/types/apiWsData';

export class WsService {
  private setWsIsOpenFunc: Dispatch<SetStateAction<boolean>>;
  private setReceiveDataFunc: Dispatch<SetStateAction<APIWsData | undefined>>;
  private selfInfo: APIWsSelfInfo;
  private socket: WebSocket | undefined;

  constructor(
    selfType: WsSenderType,
    setWsIsOpenFunc: Dispatch<SetStateAction<boolean>>,
    setReceiveDataFunc: Dispatch<SetStateAction<APIWsData | undefined>>
  ) {
    this.setWsIsOpenFunc = setWsIsOpenFunc;
    this.setReceiveDataFunc = setReceiveDataFunc;
    this.selfInfo = this.generateSelfInfo(selfType);
    this.openWebSocket();
    return;
  }

  /**
   * WebSocket開始
   * @returns
   */
  private openWebSocket() {
    let wsHost = '';
    const checkRegExp = /\.asse\.devtunnels\.ms/;
    if (checkRegExp.test(window.location.hostname)) {
      // VSCode のトンネル機能を使った場合は専用のオリジンを返す
      const originStr = window.location.origin;
      const serverPort = '8080';
      const replaceRegExp = /^(https?:\/\/.*?)-[0-9]+(\.asse\.devtunnels\.ms)$/;
      wsHost = originStr.replace(replaceRegExp, '$1-' + serverPort + '$2');
    } else {
      // 通常の場合は設定から判定する
      let host = process.env.NEXT_PUBLIC_WEB_SOCKET_HOST;
      if (host == undefined || host === '') {
        host = window.location.hostname;
      }
      let port = process.env.NEXT_PUBLIC_WEB_SOCKET_PORT;
      if (port == undefined || port === '') {
        port = '8080';
      }
      wsHost = `http://${host}:${port}`;
    }
    const wsEndPoint = APIRouting.Point.WebSocket;
    const wsURL = `${wsHost}${wsEndPoint}`;
    if (wsURL == undefined) {
      this.socket = undefined;
      return;
    }
    console.log('SockJS Before...');
    console.log(this.socket);

    const sessionId = SessionIdService.get();
    this.socket = new SockJS(wsURL, null, {
      sessionId: () => sessionId,
    });
    console.log('SockJS After...');
    console.log(this.socket);

    // WebSocket接続確立時の処理
    this.socket.addEventListener('open', (_event) => {
      console.log('WebSocket connected.');
      this.setWsIsOpenFunc(true);
    });

    // WebSocketでメッセージ受信時の処理
    this.socket.addEventListener('message', (event) => {
      console.log('WebSocket Receive...');
      const receiveData: APIWsData = JSON.parse(event.data);
      if (this.needsRendering(receiveData)) {
        console.log(receiveData);
        this.setReceiveDataFunc(receiveData);
      }
    });

    // WebSocket接続終了時の処理
    this.socket.addEventListener('close', (_event) => {
      console.log('WebSocket disconnected.');
      this.setWsIsOpenFunc(false);

      // 再接続処理
      this.reconnectingWebSocket();
    });
  }

  public async reconnectingWebSocket(): Promise<boolean> {
    const retryCount = 3;
    for (let index = 1; index <= retryCount; index++) {
      console.warn(`Warn: Reconnecting webSocket try ${index} times.`);
      const waitTime = 1000 * index;
      await this.sleep(waitTime);
      const result = await this.checkAndOpenWebSocket();
      if (result) {
        return true;
      }
      if (index === retryCount) {
        console.error('Error: Reconnecting webSocket failed');
      }
    }
    return false;
  }

  private async sleep(time: number): Promise<void> {
    await new Promise((r) => setTimeout(r, time));
  }

  private async checkAndOpenWebSocket(): Promise<boolean> {
    let result: boolean | undefined = undefined;
    try {
      result = await APIService.getExecPing();
    } catch (e) {
      console.warn(e);
      return false;
    }
    if (result != undefined) {
      this.openWebSocket();
      return true;
    }
    return false;
  }

  /**
   * レンダリング可否判定
   * @param receiveData
   * @returns
   */
  private needsRendering(receiveData: APIWsData): boolean {
    // 宛作判定
    if (!this.isAllowedDestinationTypes(receiveData)) {
      return false;
    }

    // 宛先デバイスID判定
    if (!this.isSendToMe(receiveData)) {
      return false;
    }

    // Debug用
    if (this.selfInfo.selfSenderType === WsSenderType.Debug) {
      switch (receiveData.requestAction) {
        case WsRequestAction.ReturnCurrentGameState:
          return true;
        default:
          break;
      }
    }

    // 命令判定
    // @note WebSocket とのインタフェースが増えた場合はここに変更が必要か確認する
    switch (receiveData.requestAction) {
      case WsRequestAction.GameScreenChange:
        if (this.includeConst(receiveData.actionParameter01, GameState)) {
          return true;
        }
        break;
      case WsRequestAction.VoteTableChange:
      case WsRequestAction.SelfRoleCheckUpdate:
      case WsRequestAction.NightActionUpdate:
      case WsRequestAction.ReturnEntryPlayerCount:
        return true;
      default:
        break;
    }
    return false;
  }

  /**
   * 受信可能送信先タイプ判定
   * @param receiveData
   * @returns
   */
  private isAllowedDestinationTypes(receiveData: APIWsData): boolean {
    const destinationType = receiveData.destinationType;
    const allowedDestinationTypes = this.selfInfo.allowedDestinationTypes;
    for (const allowedDestinationType of allowedDestinationTypes) {
      if (destinationType === allowedDestinationType) {
        return true;
      }
    }
    return false;
  }

  /**
   * 受信可能デバイス判定
   * @param receiveData
   * @returns
   */
  private isSendToMe(receiveData: APIWsData): boolean {
    if (receiveData.destinationType !== WsDestinationType.Player) {
      return true;
    }
    if (receiveData.destinationDeviceId === this.selfInfo.selfDeviceId) {
      return true;
    }
    return false;
  }

  /**
   * 自己WebSocket情報生成
   * @param selfType 自身の送信先タイプ
   * @returns 自身のWebSocket情報
   */
  private generateSelfInfo(selfType: WsSenderType): APIWsSelfInfo {
    const selfDeviceId = DeviceIdService.get();
    let allowedList = WS_ALLOWED_DESTINATION_TYPES.get(selfType);
    if (allowedList == undefined) {
      allowedList = [WsDestinationType.Empty];
    }
    const apiWsSelfInfo: APIWsSelfInfo = {
      selfSenderType: selfType,
      selfDeviceId: selfDeviceId,
      allowedDestinationTypes: allowedList,
    };
    return apiWsSelfInfo;
  }

  /**
   * 定数存在確認
   * @param src
   * @param constObject
   * @returns
   */
  private includeConst(src: string, constObject: object): boolean {
    for (const objValue of Object.values(constObject)) {
      if (src === objValue) {
        return true;
      }
    }
    return false;
  }

  /**
   * WebSocket送信
   * @param sendData 送信するデータ
   * @returns なし
   */
  public send(sendData: APIWsData): void {
    if (this.socket == undefined) {
      return;
    }
    const sendJsonData = JSON.stringify(sendData);
    this.socket.send(sendJsonData);
  }

  /**
   * 現在のゲーム状態問い合わせ
   */
  public getCurrentGameState(): void {
    const sendData: APIWsData = {
      destinationType: WsDestinationType.Server,
      destinationDeviceId: '',
      senderType: this.selfInfo.selfSenderType,
      senderDeviceId: this.selfInfo.selfDeviceId,
      requestAction: WsRequestAction.ReturnCurrentGameState,
      actionParameter01: '',
      actionParameter02: '',
      actionParameter03: '',
    };
    this.send(sendData);
  }

  /**
   * ゲーム状態更新要求
   */
  public updateGameState(nextGameState: GameState): void {
    const sendData: APIWsData = {
      destinationType: WsDestinationType.Server,
      destinationDeviceId: '',
      senderType: this.selfInfo.selfSenderType,
      senderDeviceId: this.selfInfo.selfDeviceId,
      requestAction: WsRequestAction.GameStateUpdate,
      actionParameter01: nextGameState,
      actionParameter02: '',
      actionParameter03: '',
    };
    this.send(sendData);
  }
}
