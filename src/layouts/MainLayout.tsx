import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
        <Header />
        <div>
          <Outlet />
        </div>
        {/* <Footer /> */}
    </>
  );
}

export default MainLayout;