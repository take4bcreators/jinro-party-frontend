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
    let host = process.env.NEXT_PUBLIC_HOSTNAME;
    if (host == undefined || host === '') {
      host = window.location.hostname;
    }
    let port = process.env.NEXT_PUBLIC_PORT;
    if (port == undefined || port === '') {
      port = '8080';
    }
    const apiHost = `http://${host}:${port}`;
    return `${apiHost}${routingPoint}`;
  }

  /**
   * ゲーム状態 API GET実行
   * @param apiEndpointURL エンドポイントURL
   * @returns ゲームの状態ID（プロミス）
   */
  export async function getGetGameState(): Promise<GameState | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(APIRouting.Point.GetGetGameState);
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
  export async function postExistsDeviceId(
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
  export async function postCheckPlayerAlive(
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
    return resData.aliveStatus;
  }

  /**
   * 新規ゲーム情報保存 API POST実行
   * @param apiEndpointURL エンドポイントURL
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 新規ゲーム情報保存結果 (プロミス)
   */
  export async function postSaveNewGame(
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
  export async function postExistsEntryDeviceId(
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
  export async function postCheckDuplEntryPlayerName(
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
  export async function postPlayerTempRegist(
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
  export async function postPlayerRegist(
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
  export async function postPlayerRegistRemove(
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
  export async function getExecAllPlayerRemove() {
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
  export async function getExecAllEntryRemove() {
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
  export async function getExecEntryRegist() {
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
  export async function postChangeGameState(
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

  /**
   * 全プレイヤーデータ取得 API GET実行
   * @returns 全プレイヤーデータ（プロミス）
   */
  export async function getFetchAllPlayerInfo() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetFetchAllPlayerData
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyAllPlayerData = await res.json();
    return resData.allPlayerData;
  }

  /**
   * 役職確認済み情報送信 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 処理結果 （プロミス）
   */
  export async function postSelfRoleChecked(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostSelfRoleChecked
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
   * プレイヤーデータ取得 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns プレイヤーデータ (プロミス)
   */
  export async function postFetchPlayerData(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<APIData.APIReplyPlayerData | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostFetchPlayerData
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyPlayerData = await res.json();
    return resData;
  }

  /**
   * 接続用疎通確認実行 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function getExecPing() {
    const apiEndpointURL = makeAPIEndpointURL(APIRouting.Point.GetExecPing);
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }

  /**
   * 追放者投票対象プレイヤー取得 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function getFetchMainVoteReceivers() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetFetchMainVoteReceivers
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyAllPlayerData = await res.json();
    return resData;
  }

  /**
   * 追放者投票登録 API POST実行
   * @param requestDataObject リクエスト送信値オブジェクト
   * @returns 処理結果（プロミス）
   */
  export async function postSaveMainVote(
    requestDataObject: APIData.APISendVotePlayerData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostSaveMainVote
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
   * 投票結果取得 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function getFetchVoteResult() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetFetchVoteResult
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyAllVotePlayerData = await res.json();
    return resData;
  }

  /**
   * 追放者プレイヤー情報取得 API GET実行
   * @returns 処理結果（プロミス）
   */
  export async function getFetchDropoutPlayer() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetFetchDropoutPlayer
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIPlayerBasicData = await res.json();
    return resData;
  }

  export async function postExistsNightActionData(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExistsNightActionData
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

  export async function postFetchNightActionData(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<APIData.APIReplyPlayerData | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostFetchNightActionData
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIReplyPlayerData = await res.json();
    return resData;
  }

  export async function postFetchOtherAlivePlayers(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<APIData.APIMultiPlayerBasicData | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostFetchOtherAlivePlayers
    );
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const res = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const resData: APIData.APIMultiPlayerBasicData = await res.json();
    return resData;
  }

  export async function postExecSeerAction(
    requestDataObject: APIData.APISendNightActionData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExecSeerAction
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

  export async function postExecEnqueteAction(
    requestDataObject: APIData.APISendNightActionData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExecEnqueteAction
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

  export async function postExecHunterAction(
    requestDataObject: APIData.APISendNightActionData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExecHunterAction
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

  export async function postExecWerewolfAction(
    requestDataObject: APIData.APISendNightActionData
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExecWerewolfAction
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

  export async function postExecMediumAction(
    requestDataObject: APIData.APISendDeviceId
  ): Promise<boolean | undefined> {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostExecMediumAction
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

  export async function getFetchAliversForWerewolf() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetFetchAliversForWerewolf
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIMultiPlayerBasicData = await res.json();
    return resData;
  }

  export async function postCheckWerewolfExecuter(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.PostCheckWerewolfExecuter
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

  export async function getFetchWinningTeam() {
    const apiEndpointURL = makeAPIEndpointURL(
      APIRouting.Point.GetFetchWinningTeam
    );
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIWinningTeam = await res.json();
    return resData.winningTeam;
  }

  export async function getEndGameReset() {
    const apiEndpointURL = makeAPIEndpointURL(APIRouting.Point.GetEndGameReset);
    if (apiEndpointURL === '') {
      return;
    }
    const res = await fetch(apiEndpointURL);
    const resData: APIData.APIReplyProcessResult = await res.json();
    return resData.result;
  }
}
