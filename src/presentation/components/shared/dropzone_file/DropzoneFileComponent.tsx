import {  ChangeEvent, FC } from "react";
import { DropzoneBox } from "./DropzoneBox";
import { DropzoneImagePreview } from "./DropzoneImagePreview";
interface Props {
    onFileChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    filePreview: string | null;
    name: string | null;
    files: File | undefined,

}
export const DropzoneFileComponent:FC<Props> = ({onFileChangeHandler, filePreview, name,files}) => {
   
  return (
   <>
 <DropzoneBox onFileChange={onFileChangeHandler}/>
{
    files && filePreview && (
 <DropzoneImagePreview filePreview={filePreview} name={name}/>
    )
}
   </>
  )
}
