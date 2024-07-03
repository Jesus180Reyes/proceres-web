import { Outlet } from 'react-router-dom';
import { Sidebar } from './presentation/components/layouts/sidebar/Sidebar';
export const App = () => {
  return (
    <>
      <div className="flex animate-fade animate-once ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
