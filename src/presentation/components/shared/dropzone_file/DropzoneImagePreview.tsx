import { FC, useState } from 'react';
import Modal from 'react-responsive-modal';

interface Props {
  filePreview: string | null;
  name: string | null;
}
export const DropzoneImagePreview: FC<Props> = ({ filePreview, name }) => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  return (
    <>
      <div className="flex mt-2 w-full animate__animated animate__zoomIn">
        <div onClick={() => setisOpen(!isOpen)} className="cursor-pointer h-[100px] w-[100px]  overflow-hidden bg-gray-100 rounded flex justify-center items-center">
          <img
            className="rounded"
            src={filePreview ?? ''}
            alt={name ?? ''}
            width={100}
            height={100}
          />
        </div>
      </div>
      <Modal center open={isOpen} onClose={() => setisOpen(!isOpen)}>
          <img
            className="rounded"
            src={filePreview ?? ''}
            alt={name ?? ''}
            // width={100}
            // height={100}
          />
      
      </Modal>
    </>
  );
};
