import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/types/apiData';
import { TypedFormGetter } from '@/utils/typedFormer';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyProcessResult = {
  result: true,
};

export async function POST(req: NextRequest) {
  const postData = await req.formData();
  const formGetter = new TypedFormGetter<APIData.APISendEntryPlayerData>(
    postData
  );
  const deviceId = formGetter.get('deviceId');
  const playerName = formGetter.get('playerName');
  const playerIcon = formGetter.get('playerIcon');
  console.log('info: post data is ' + deviceId);
  console.log('info: post data is ' + playerName);
  console.log('info: post data is ' + playerIcon);
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
