export class Utils {
  static encodeToUrlEncoded = (text: string): string => {
    const encodedText = text.split(' ').join('%20');
    return encodedText;
  };
}
