import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/types/apiData';
import { TypedFormGetter } from '@/utils/typedFormer';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIMultiPlayerBasicData = {
  allData: [
    {
      deviceId: '001',
      playerName: 'taro',
      playerIcon: 'icon01',
    },
    {
      deviceId: '002',
      playerName: 'jiro',
      playerIcon: 'icon02',
    },
    {
      deviceId: '003',
      playerName: 'hanako',
      playerIcon: 'icon03',
    },
  ],
};

export async function POST(req: NextRequest) {
  const postData = await req.formData();
  const formGetter = new TypedFormGetter<APIData.APISendDeviceId>(postData);
  const deviceId = formGetter.get('deviceId');
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
