import { WsDestinationType } from '@/config/wsDestinationType';
import { WsSenderType } from '@/config/wsSenderType';

/**
 * WebSocket判定用
 */
export type APIWsSelfInfo = {
  selfSenderType: WsSenderType;
  selfDeviceId: string;
  allowedDestinationTypes: WsDestinationType[];
};
