import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="px-4">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
