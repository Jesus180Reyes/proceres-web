import { useNavigate } from 'react-router-dom';
import { sideBatItems } from '../../../../datasource/entities/sidebaritems_data';

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div className="min-h-screen flex flex-row bg-gray-100 w-[15%]">
        <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
          </div>
          <ul className="flex flex-col py-4">
            {sideBatItems.map(({ title, href, icon }, i) => {
              return (
                <li key={i}>
                  <a
                    onClick={()=> navigate(href)}
                    className={`cursor-pointer flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className={icon && `bx bx-${icon}`}></i>
                    </span>
                    <span className="text-sm font-medium">{title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
