import { NextRequest, NextResponse } from 'next/server';
import type { APIData } from '@/config/apiData';
import { GameState } from '@/config/gameState';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyGameState = {
  gameState: GameState.PreGame,
};

export function GET(_req: NextRequest): NextResponse {
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
