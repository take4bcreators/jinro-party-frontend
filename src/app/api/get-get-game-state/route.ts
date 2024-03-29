import { NextRequest, NextResponse } from 'next/server';
import { GameState } from '@/config/gameState';
import type { APIData } from '@/types/apiData';

// @note レスポンスデータ指定箇所
const RESPONSE_DATA: APIData.APIReplyGameState = {
  gameState: GameState.PreGame,
  // gameState: GameState.DayPhase,
  // gameState: GameState.PlayerJoining,
  // gameState: GameState.PlayerJoiningEnded,
};

export function GET(_req: NextRequest): NextResponse {
  const res = NextResponse.json(RESPONSE_DATA);
  return res;
}
