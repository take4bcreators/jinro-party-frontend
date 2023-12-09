export namespace StringUtil {
  /**
   * 文字列に全角を含むかを判定する
   * @param text
   * @returns
   */
  export function includeZenkaku(text: string) {
    const MATCH_REG_EXP = /^[^\x01-\x7E\uFF61-\uFF9F]+$/;
    for (const textChar of text.split('')) {
      const matchResult = textChar.match(MATCH_REG_EXP);
      if (matchResult) {
        return true;
      }
    }
    return false;
  }

  /**
   * 文字列を切り詰めて「...」を付ける
   * @param text
   * @param byteLength
   * @param omission
   * @returns
   */
  export function truncateText(
    text: string,
    byteLength: number,
    omission = '...'
  ) {
    if (!includeZenkaku(text) && text.length <= byteLength) {
      return text;
    }
    if (!includeZenkaku(text)) {
      return text.substring(0, byteLength) + omission;
    }
    const textArray = text.split('');
    let byteSum = 0;
    let newText = '';
    for (const thisChar of textArray) {
      const thisCharByte = includeZenkaku(thisChar) ? 2 : 1;
      if (byteSum + thisCharByte > byteLength) {
        break;
      }
      byteSum += thisCharByte;
      newText += thisChar;
    }
    return newText === text ? text : newText + omission;
  }
}
