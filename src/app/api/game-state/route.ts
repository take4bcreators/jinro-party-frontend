import { NextRequest, NextResponse } from 'next/server';
import type { ApiData } from '@/config/api';
import { GameState } from '@/config/game';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: ApiData.GameStateAPIRequest = {
  gameState: GameState.PreGame,
};

export function GET(_req: NextRequest): NextResponse {
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
