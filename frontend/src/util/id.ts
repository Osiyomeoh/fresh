const ID_LENGTH_CHARS = 16;

export const encodeCaseSensitiveClientID = (clientID: string): string => {
  let suffix = '';
  for (let i = 0; i < clientID.length; i++) {
    const char = clientID.charAt(i);
    if (char.toLowerCase() !== char) {
      suffix += i.toString(16);
    }
  }

  return `${clientID.toLowerCase()}${suffix}`;
};

export const decodeCaseSensitiveClientID = (encoded: string): string => {
  const replaceAt = (str: string, idx: number, replacement: string): string => {
    return (
      str.substring(0, idx) +
      replacement +
      str.substring(idx + replacement.length)
    );
  };

  if (encoded.length < ID_LENGTH_CHARS) {
    return encoded;
  }
  let response = encoded.substring(0, ID_LENGTH_CHARS);
  const suffix = encoded.substring(ID_LENGTH_CHARS);
  for (let i = 0; i < suffix.length; i++) {
    const offset = parseInt(suffix.charAt(i), 16);
    response = replaceAt(
      response,
      offset,
      response.charAt(offset).toUpperCase()
    );
  }
  return response;
};
