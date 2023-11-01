import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/types/apiData';
import { TypedFormGetter } from '@/utils/typedFormer';
import { PlayerRole } from '@/config/playerRole';
import { PlayerState } from '@/config/playerState';
import { PlayerTeam } from '@/config/playerTeam';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyPlayerData = {
  deviceId: '001',
  playerName: 'taro',
  playerIcon: 'icon01',
  playerRole: PlayerRole.Citizen,
  playerTeam: PlayerTeam.Townsfolk,
  playerState: PlayerState.Alive,
};

export async function POST(req: NextRequest) {
  const postData = await req.formData();
  const formGetter = new TypedFormGetter<APIData.APISendDeviceId>(postData);
  const deviceId = formGetter.get('deviceId');
  console.log('info: post data is ' + deviceId);
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
