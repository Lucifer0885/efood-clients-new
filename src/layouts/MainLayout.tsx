import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
        <Header />
        <div className="px-10 py-6">
          <Outlet />
        </div>
        <Footer />
    </>
  );
}

export default MainLayout;