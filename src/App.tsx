import { Outlet } from 'react-router-dom';
import { Sidebar } from './presentation/components/layouts/sidebar/Sidebar';
export const App = () => {
  return (
    <>
      <div className="flex">
        <Sidebar  />
        <Outlet />
      </div>
    </>
  );
};

export default App;
