import { Outlet } from 'react-router-dom';
import { Sidebar } from './presentation/components/layouts/sidebar/Sidebar';
export const App = () => {
  return (
    <>
      <div className="flex animate__animated animate__fadeIn">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
