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

  /**
   * 新規ゲーム情報保存 API POST実行
   * @param apiEndpointURL エンドポイントURL
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 新規ゲーム情報保存結果 (プロミス)
   */
  export async function execPOSTSaveNewGame(
    requestDataObject: APIData.APISendNewGame
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(APIRouting.Point.PostSaveNewGame);
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * エントリー用デバイスID存在確認 API POST実行
   * @param apiEndpointURL エンドポイントURL
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 存在確認結果（プロミス）
   */
  export async function execPOSTExistsEntryDeviceId(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExistsEntryDeviceId
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
   * エントリー用プレイヤー名重複確認 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 重複確認結果（プロミス）
   */
  export async function execPOSTCheckDuplEntryPlayerName(
    requestDataObject: APIData.APISendEntryPlayerData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostCheckDuplEntryPlayerName
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    console.log(res);
    const resData: APIData.APIReplyDuplicationResult = await res.json();
    console.log(resData);
    console.log(resData.existsDuplicate);
    return resData.existsDuplicate;
  }

  /**
   * エントリー用プレイヤーデータ仮登録 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 処理結果（プロミス）
   */
  export async function execPOSTPlayerTempRegist(
    requestDataObject: APIData.APISendEntryPlayerData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostPlayerTempRegist
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * エントリー用プレイヤーデータ登録 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 処理結果（プロミス）
   */
  export async function execPOSTPlayerRegist(
    requestDataObject: APIData.APISendEntryPlayerData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostPlayerRegist
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * エントリー用プレイヤーデータ削除 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 処理結果（プロミス）
   */
  export async function execPOSTPlayerRegistRemove(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostPlayerRegistRemove
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * プレイヤーデータ全削除 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function execGETExecAllPlayerRemove() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetExecAllPlayerRemove
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * エントリープレイヤーデータ全削除実行 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function execGETExecAllEntryRemove() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetExecAllEntryRemove
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * エントリープレイヤーデータ本登録実行 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function execGETExecEntryRegist() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetExecEntryRegist
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * ゲーム状態変更 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 処理結果（プロミス）
   */
  export async function execPOSTChangeGameState(
    requestDataObject: APIData.APISendGameState
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostChangeGameState
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }
}
