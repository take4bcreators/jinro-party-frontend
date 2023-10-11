import { NextRequest, NextResponse } from 'next/server';
import type { ApiData } from '@/config/api';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: ApiData.DeviceIdAPIResponse = {
  exists: true,
};

export async function POST(req: NextRequest) {
  const postData = await req.formData();
  const deviceId = postData.get('deviceId');
  console.log('info: post data is ' + deviceId);
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
