/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

export class Utils {
  static encodeToUrlEncoded = (text: string): string => {
    const encodedText = text.split(' ').join('%20');
    return encodedText;
  };

  static convertFileImageToUrlPreview = (e: ChangeEvent<HTMLInputElement>): string => {
    const fileUrl = URL.createObjectURL(e.target.files?.[0] as any);

    return fileUrl;
  }
}
