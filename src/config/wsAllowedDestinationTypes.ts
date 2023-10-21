import { WsDestinationType } from './wsDestinationType';
import { WsSenderType } from './wsSenderType';

export const WS_ALLOWED_DESTINATION_TYPES = new Map<
  WsSenderType,
  WsDestinationType[]
>([
  [
    WsSenderType.GameMasterSite,
    [
      WsDestinationType.All,
      WsDestinationType.AllSite,
      WsDestinationType.GameMasterSite,
    ],
  ],
  [
    WsSenderType.MonitorSite,
    [
      WsDestinationType.All,
      WsDestinationType.AllSite,
      WsDestinationType.MonitorSite,
    ],
  ],
  [
    WsSenderType.PlayerSite,
    [
      WsDestinationType.All,
      WsDestinationType.AllSite,
      WsDestinationType.PlayerSite,
      WsDestinationType.Player,
    ],
  ],
  [
    WsSenderType.Debug,
    [
      WsDestinationType.All,
      WsDestinationType.Server,
      WsDestinationType.AllSite,
      WsDestinationType.GameMasterSite,
      WsDestinationType.MonitorSite,
      WsDestinationType.PlayerSite,
      WsDestinationType.Player,
    ],
  ],
]);
