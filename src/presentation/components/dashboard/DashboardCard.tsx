import React, { FC } from 'react';
interface Props {
  children: React.ReactNode;
}
export const DashboardCard: FC<Props> = ({ children }) => {
  return (
    <div className="h-[75%] w-[500px] max-w[500px] text-start ml-2  rounded-md mt-4 p-5  bg-white flex flex-col items-center">
      {children}
    </div>
  );
};
