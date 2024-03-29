import { NextRequest, NextResponse } from 'next/server';
import { TypedFormGetter } from '@/utils/typedFormer';
import type { APIData } from '@/types/apiData';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyProcessResult = {
  result: true,
};

export async function POST(req: NextRequest) {
  const postData = await req.formData();
  const formGetter = new TypedFormGetter<APIData.APISendDeviceId>(postData);
  const deviceId = formGetter.get('deviceId');
  console.log('info: post data is ' + deviceId);
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
