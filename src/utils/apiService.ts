import { APIRouting } from '@/config/apiRouting';
import { TypedFormData } from './typedFormer';
import type { APIData } from '@/types/apiData';

export namespace APIService {
  // 共通

  function makeAPIEndpointURL(routingPoint: APIRouting.Point): string {
    // VSCode のトンネル機能を使った場合は専用のオリジンを返す
    const checkRegExp = /\.asse\.devtunnels\.ms/;
    if (checkRegExp.test(window.location.hostname)) {
      const originStr = window.location.origin;
      const serverPort = '8080';
      const replaceRegExp = /^(https?:\/\/.*?)-[0-9]+(\.asse\.devtunnels\.ms)$/;
      const apiHost = originStr.replace(
        replaceRegExp,
        '$1-' + serverPort + '$2'
      );
      return `${apiHost}${routingPoint}`;
    }
    // 通常の場合は設定から判定する
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

  async function apiGet<R>(routingPoint: APIRouting.Point) {
    const apiEndpointURL = makeAPIEndpointURL(routingPoint);
    if (apiEndpointURL === '') {
      return;
    }
    const response = await fetch(apiEndpointURL);
    const responseData: R = await response.json();
    return responseData;
  }

  async function apiPost<T extends Object, R>(
    routingPoint: APIRouting.Point,
    requestDataObject: T
  ) {
    const apiEndpointURL = makeAPIEndpointURL(routingPoint);
    if (apiEndpointURL === '') {
      return;
    }
    const form = new TypedFormData(requestDataObject);
    const response = await fetch(apiEndpointURL, {
      method: 'POST',
      body: form,
    });
    const responseData: R = await response.json();
    return responseData;
  }

  // GET

  export async function getGetGameState() {
    const responseData = await apiGet<APIData.APIReplyGameState>(
      APIRouting.Point.GetGetGameState
    );
    return responseData?.gameState;
  }

  export async function getExecAllPlayerRemove() {
    const responseData = await apiGet<APIData.APIReplyProcessResult>(
      APIRouting.Point.GetExecAllPlayerRemove
    );
    return responseData?.result;
  }

  export async function getExecAllEntryRemove() {
    const responseData = await apiGet<APIData.APIReplyProcessResult>(
      APIRouting.Point.GetExecAllEntryRemove
    );
    return responseData?.result;
  }

  export async function getExecEntryRegist() {
    const responseData = await apiGet<APIData.APIReplyProcessResult>(
      APIRouting.Point.GetExecEntryRegist
    );
    return responseData?.result;
  }

  export async function getFetchAllPlayerInfo() {
    const responseData = await apiGet<APIData.APIReplyAllPlayerData>(
      APIRouting.Point.GetFetchAllPlayerData
    );
    return responseData?.allPlayerData;
  }

  export async function getExecPing() {
    const responseData = await apiGet<APIData.APIReplyProcessResult>(
      APIRouting.Point.GetExecPing
    );
    return responseData?.result;
  }

  export async function getFetchMainVoteReceivers() {
    const responseData = await apiGet<APIData.APIReplyAllPlayerData>(
      APIRouting.Point.GetFetchMainVoteReceivers
    );
    return responseData;
  }

  export async function getFetchVoteResult() {
    const responseData = await apiGet<APIData.APIReplyAllVotePlayerData>(
      APIRouting.Point.GetFetchVoteResult
    );
    return responseData;
  }

  export async function getFetchDropoutPlayer() {
    const responseData = await apiGet<APIData.APIPlayerBasicData>(
      APIRouting.Point.GetFetchDropoutPlayer
    );
    return responseData;
  }

  export async function getFetchAliversForWerewolf() {
    const responseData = await apiGet<APIData.APIMultiPlayerBasicData>(
      APIRouting.Point.GetFetchAliversForWerewolf
    );
    return responseData;
  }

  export async function getFetchWinningTeam() {
    const responseData = await apiGet<APIData.APIWinningTeam>(
      APIRouting.Point.GetFetchWinningTeam
    );
    return responseData?.winningTeam;
  }

  export async function getEndGameReset() {
    const responseData = await apiGet<APIData.APIReplyProcessResult>(
      APIRouting.Point.GetEndGameReset
    );
    return responseData?.result;
  }

  export async function getFetchEntryPlayers() {
    const responseData = await apiGet<APIData.APIMultiPlayerBasicData>(
      APIRouting.Point.GetFetchEntryPlayers
    );
    return responseData;
  }

  export async function getFetchTimerData() {
    const responseData = await apiGet<APIData.APITimerData>(
      APIRouting.Point.GetFetchTimerData
    );
    return responseData;
  }

  export async function getFetchAllPlayerFullData() {
    const responseData = await apiGet<APIData.APIMultiPlayerFullData>(
      APIRouting.Point.GetFetchAllPlayerFullData
    );
    return responseData;
  }

  export async function getFetchNightAction() {
    const responseData = await apiGet<APIData.APIMultiNightActionData>(
      APIRouting.Point.GetFetchNightAction
    );
    return responseData;
  }

  // POST

  export async function postExistsDeviceId(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyExistsDeviceId
    >(APIRouting.Point.PostExistsDeviceId, requestDataObject);
    return responseData?.exists;
  }

  export async function postCheckPlayerAlive(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyCheckPlayerAlive
    >(APIRouting.Point.PostCheckPlayerAlive, requestDataObject);
    return responseData?.aliveStatus;
  }

  export async function postSaveNewGame(
    requestDataObject: APIData.APISendNewGame
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostSaveNewGame, requestDataObject);
    return responseData?.result;
  }

  export async function postExistsEntryDeviceId(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyExistsDeviceId
    >(APIRouting.Point.PostExistsEntryDeviceId, requestDataObject);
    return responseData?.exists;
  }

  export async function postCheckDuplEntryPlayerName(
    requestDataObject: APIData.APISendEntryPlayerData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyDuplicationResult
    >(APIRouting.Point.PostCheckDuplEntryPlayerName, requestDataObject);
    return responseData?.existsDuplicate;
  }

  export async function postPlayerTempRegist(
    requestDataObject: APIData.APISendEntryPlayerData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostPlayerTempRegist, requestDataObject);
    return responseData?.result;
  }

  export async function postPlayerRegist(
    requestDataObject: APIData.APISendEntryPlayerData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostPlayerRegist, requestDataObject);
    return responseData?.result;
  }

  export async function postPlayerRegistRemove(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostPlayerRegistRemove, requestDataObject);
    return responseData?.result;
  }

  export async function postChangeGameState(
    requestDataObject: APIData.APISendGameState
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostChangeGameState, requestDataObject);
    return responseData?.result;
  }

  export async function postSelfRoleChecked(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostSelfRoleChecked, requestDataObject);
    return responseData?.result;
  }

  export async function postFetchPlayerData(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyPlayerData
    >(APIRouting.Point.PostFetchPlayerData, requestDataObject);
    return responseData;
  }

  export async function postSaveMainVote(
    requestDataObject: APIData.APISendVotePlayerData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostSaveMainVote, requestDataObject);
    return responseData?.result;
  }

  export async function postExistsNightActionData(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyExistsDeviceId
    >(APIRouting.Point.PostExistsNightActionData, requestDataObject);
    return responseData?.exists;
  }

  export async function postFetchNightActionData(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyPlayerData
    >(APIRouting.Point.PostFetchNightActionData, requestDataObject);
    return responseData;
  }

  export async function postFetchOtherAlivePlayers(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIMultiPlayerBasicData
    >(APIRouting.Point.PostFetchOtherAlivePlayers, requestDataObject);
    return responseData;
  }

  export async function postExecSeerAction(
    requestDataObject: APIData.APISendNightActionData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostExecSeerAction, requestDataObject);
    return responseData?.result;
  }

  export async function postExecEnqueteAction(
    requestDataObject: APIData.APISendNightActionData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostExecEnqueteAction, requestDataObject);
    return responseData?.result;
  }

  export async function postExecHunterAction(
    requestDataObject: APIData.APISendNightActionData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostExecHunterAction, requestDataObject);
    return responseData?.result;
  }

  export async function postExecWerewolfAction(
    requestDataObject: APIData.APISendNightActionData
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostExecWerewolfAction, requestDataObject);
    return responseData?.result;
  }

  export async function postExecMediumAction(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostExecMediumAction, requestDataObject);
    return responseData?.result;
  }

  export async function postCheckWerewolfExecuter(
    requestDataObject: APIData.APISendDeviceId
  ) {
    const responseData = await apiPost<
      typeof requestDataObject,
      APIData.APIReplyProcessResult
    >(APIRouting.Point.PostCheckWerewolfExecuter, requestDataObject);
    return responseData?.result;
  }
}
