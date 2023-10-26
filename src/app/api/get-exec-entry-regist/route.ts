import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/types/apiData';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyProcessResult = {
  result: true,
};

export function GET(_req: NextRequest): NextResponse {
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
