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
    this.socket = new SockJS(wsURL);

    // WebSocket接続確立時の処理
    this.socket.addEventListener('open', (_event) => {
      console.log('WebSocket connected.');
      this.setWsIsOpenFunc(true);
    });

    // WebSocketでメッセージ受信時の処理
    this.socket.addEventListener('message', (event) => {
      console.log('WebSocket Receive');
      const receiveData: APIWsData = JSON.parse(event.data);
      // this.receiveData = receiveData;

      if (this.needsRendering(receiveData)) {
        this.setReceiveDataFunc(receiveData);
      }
    });

    // WebSocket接続終了時の処理
    this.socket.addEventListener('close', (_event) => {
      console.log('WebSocket disconnected.');
    });
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
        break;
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
    const selfDeviceId = DeviceIdService.getIfExists();
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
}