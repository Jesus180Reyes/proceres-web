import { Outlet } from 'react-router-dom';
import { Sidebar } from './presentation/components/layouts/sidebar/Sidebar';
import Menu from './presentation/components/shared/menu/Menu';
export const App = () => {
  return (
    <>
      <div className="flex animate__animated animate__fadeIn">
        <Menu />
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
