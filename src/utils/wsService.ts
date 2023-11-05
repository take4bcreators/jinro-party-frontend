import { WsRequestAction } from '@/config/wsRequestAction';
import { Dispatch, SetStateAction } from 'react';
import type { APIWsData } from '@/types/apiWsData';
import { WsDestinationType } from '@/config/wsDestinationType';
import SockJS from 'sockjs-client';
import { APIRouting } from '@/config/apiRouting';
import { APIWsSelfInfo } from '@/types/apiWsSelfInfo';
import { WsSenderType } from '@/config/wsSenderType';
import { DeviceIdService } from './deviceIdService';
import { WS_ALLOWED_DESTINATION_TYPES } from '@/config/wsAllowedDestinationTypes';
import { GameState } from '@/config/gameState';
import { SessionIdService } from './sessionIdService';
import { APIService } from './apiService';

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
    const wsHost = process.env.NEXT_PUBLIC_WEB_SOCKET_HOST;
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
      // this.receiveData = receiveData;

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
          break;
        default:
          break;
      }
    }

    // 命令判定
    switch (receiveData.requestAction) {
      case WsRequestAction.GameScreenChange:
        if (this.includeConst(receiveData.actionParameter01, GameState)) {
          return true;
        }
        break;
      case WsRequestAction.CountdownTimerStart:
      case WsRequestAction.CountdownTimerPause:
      case WsRequestAction.CountdownTimerResume:
      case WsRequestAction.SurvivorInfoDisplay:
      case WsRequestAction.WerewolfAttackVoteInfoDisplay:
      case WsRequestAction.PlayerEliminationInfoDisplay:
      case WsRequestAction.SpectatorEliminationInfoDisplay:
      case WsRequestAction.VoteResultInfoDisplay:
      case WsRequestAction.FinalResultInfoDisplay:
      case WsRequestAction.RoleListInfoDisplay:
      case WsRequestAction.GameMasterGameInfoDisplay:
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
