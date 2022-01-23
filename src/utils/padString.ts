export const padLeftString = (str: string, padBit: number, padChar: string) => {
  if (str.length < padBit) {
    let result = str;
    const needPadLen = padBit - str.length;
    for (let i = 0; i < needPadLen; i += 1) {
      result = padChar + result;
    }
    return result;
  }

  return str;
};
