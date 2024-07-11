import { useLocation, useNavigate } from 'react-router-dom';
import { sideBatItems } from '../../../../datasource/entities/sidebaritems_data';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { logOut } from '../../../store/slices/auth/auth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentItem, setcurrentItem] = useState<string>(location.pathname);
  const onItemSelectedChange = (href: string) => {
    navigate(href);
    setcurrentItem(href);
  };
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logOut());
    navigate('/auth/login', { replace: true });
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div className="min-h-screen flex flex-row bg-gray-100 w-[15%]">
        <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            {/* <h1 className="text-3xl uppercase text-indigo-500">Logo</h1> */}
            <img className='p-5' src="https://www.losprocereshn.com/wp-content/uploads/go-x/u/c0a2fc92-e652-4c21-b82a-6b786788844a/image-640x283.png" alt="Logo" />
          </div>
          <ul className="flex flex-col py-4">
            {sideBatItems.map(({ title, href, icon }, i) => {
              return (
                <li key={i}>
                  <a
                    onClick={() => onItemSelectedChange(href)}
                    className={`${currentItem === href ? 'bg-primary rounded m-2 text-white' : undefined} cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-secondary text-gray-500`}>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className={icon && `bx bx-${icon}`}></i>
                    </span>
                    <span className="text-sm font-medium">{title}</span>
                  </a>
                </li>
              );
            })}
            <li>
              <a
                onClick={onLogout}
                className={` cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}>
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i className={`bx bx-log-out`}></i>
                </span>
                <span className="text-sm font-medium">Cerrar Sesion</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
