import { WsDestinationType } from '../config/wsDestinationType';
import { WsRequestAction } from '../config/wsRequestAction';
import { WsSenderType } from '../config/wsSenderType';

/**
 * WebSocket送受信用インタフェース
 */
export type APIWsData = {
  /** 送信先の種別 */
  destinationType: WsDestinationType;
  /** 送信先のデバイスID */
  destinationDeviceId: string;
  /** 送信元の種別 */
  senderType: WsSenderType;
  /** 送信元のデバイスID */
  senderDeviceId: string;
  /** リクエストするアクション名 */
  requestAction: WsRequestAction;
  /** アクションに渡すパラメータ1 */
  actionParameter01: string;
  /** アクションに渡すパラメータ2 */
  actionParameter02: string;
  /** アクションに渡すパラメータ3 */
  actionParameter03: string;
};
