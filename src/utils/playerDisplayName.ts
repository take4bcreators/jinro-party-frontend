import { StringUtil } from './stringUtil';

export class PlayerDisplayName {
  private TRUNCATE_BYTE_LENGTH: number = 12;
  private originPlayerName: string;
  private playerName: string;

  constructor(playerName: string) {
    this.originPlayerName = playerName;
    this.playerName = this.truncateName(playerName);
  }

  private truncateName(name: string) {
    return StringUtil.truncateText(name, this.TRUNCATE_BYTE_LENGTH);
  }

  public getPlayerName(): string {
    return this.playerName;
  }

  public setPlayerName(playerName: string) {
    this.originPlayerName = playerName;
    this.playerName = this.truncateName(playerName);
  }

  public getOriginPlayerName(): string {
    return this.originPlayerName;
  }
}
