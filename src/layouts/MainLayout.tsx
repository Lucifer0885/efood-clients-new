import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
        {/* <Footer /> */}
    </>
  );
}

export default MainLayout;