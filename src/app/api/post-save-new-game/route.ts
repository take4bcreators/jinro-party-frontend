import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/types/apiData';
import { TypedFormGetter } from '@/utils/typedFormer';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyProcessResult = {
  result: true,
};

export async function POST(req: NextRequest) {
  const postData = await req.formData();
  const formGetter = new TypedFormGetter<APIData.APISendNewGame>(postData);
  const gameMode = formGetter.get('gameMode');
  console.log('info: game mode is ' + gameMode);
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
