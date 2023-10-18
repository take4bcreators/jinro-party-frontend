import { APIRouting } from '@/config/apiRouting';
import { APIData } from '@/config/apiData';
import { TypedFormData } from './util';
import { GameState } from '@/config/gameState';

/**
 * エンドポイントURL作成
 * @param routingPoint エンドポイントのパス
 * @returns 作成したURL
 */
export function makeAPIEndpointURL(routingPoint: APIRouting.Point): string {
  const apiHost = process.env.NEXT_PUBLIC_HOST;
  if (apiHost == undefined) {
    return '';
  }
  return `${apiHost}/${routingPoint}`;
}

/**
 * ゲーム状態 API GET実行
 * @param apiEndpointURL エンドポイントURL
 * @returns ゲームの状態ID（プロミス）
 */
export async function execGETGameState(
  apiEndpointURL: string
): Promise<GameState | undefined> {
  if (apiEndpointURL === '') {
    return;
  }
  const res = await fetch(apiEndpointURL);
  const resData: APIData.APIReplyGameState = await res.json();
  return resData.gameState;
}

/**
 * デバイスID存在確認 API POST実行
 * @param apiEndpointURL エンドポイントURL
 * @param requestDataObject リクエスト送信値オブジェクト
 * @returns 存在確認結果（プロミス）
 */
export async function execPOSTExistsDevice(
  apiEndpointURL: string,
  requestDataObject: APIData.APISendDeviceId
): Promise<boolean | undefined> {
  if (apiEndpointURL === '') {
    return;
  }
  const form = new TypedFormData(requestDataObject);
  const res = await fetch(apiEndpointURL, {
    method: 'POST',
    body: form,
  });
  const resData: APIData.APIReplyExistsDeviceId = await res.json();
  return resData.exists;
}
