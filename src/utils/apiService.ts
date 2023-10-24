import { APIRouting } from '@/config/apiRouting';
import type { APIData } from '@/types/apiData';
import { TypedFormData } from './typedFormer';
import { GameState } from '@/config/gameState';

export namespace APIService {
  /**
   * エンドポイントURL作成
   * @param routingPoint エンドポイントのパス
   * @returns 作成したURL
   */
  function makeAPIEndpointURL(routingPoint: APIRouting.Point): string {
    const apiHost = process.env.NEXT_PUBLIC_HOST;
    if (apiHost == undefined) {
      return '';
    }
    return `${apiHost}${routingPoint}`;
  }

  /**
   * ゲーム状態 API GET実行
   * @param apiEndpointURL エンドポイントURL
   * @returns ゲームの状態ID（プロミス）
   */
  export async function execGETGameState(): Promise<GameState | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(APIRouting.Point.GetGameState);
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
  export async function execPOSTExistsDeviceId(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExistsDeviceId
    );
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

  /**
   * プレイヤー生存確認 API POST実行
   * @param apiEndpointURL エンドポイントURL
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns プレイヤー生存確認結果 (プロミス)
   */
  export async function execPOSTCheckPlayerAlive(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostCheckPlayerAlive
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyCheckPlayerAlive = await res.json();
    return resData.isAlive;
  }
}
