import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/types/apiData';
import { PlayerRole } from '@/config/playerRole';
import { PlayerTeam } from '@/config/playerTeam';
import { PlayerState } from '@/config/playerState';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyAllPlayerData = {
  allPlayerData: [
    {
      deviceId: '001',
      playerName: 'taro',
      playerIcon: 'icon01',
      playerRole: PlayerRole.Citizen,
      playerTeam: PlayerTeam.Townsfolk,
      playerState: PlayerState.Alive,
    },
    {
      deviceId: '002',
      playerName: 'jiro',
      playerIcon: 'icon02',
      playerRole: PlayerRole.Citizen,
      playerTeam: PlayerTeam.Townsfolk,
      playerState: PlayerState.Alive,
    },
    {
      deviceId: '003',
      playerName: 'hanako',
      playerIcon: 'icon03',
      playerRole: PlayerRole.Werewolf,
      playerTeam: PlayerTeam.WerewolfPack,
      playerState: PlayerState.Alive,
    },
  ],
};

export function GET(_req: NextRequest): NextResponse {
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
