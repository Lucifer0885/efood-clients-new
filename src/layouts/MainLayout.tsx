import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";

function MainLayout() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState<boolean>(true);

  useEffect(() => {
    const hideHeader = ["/stores/", "/account", '/orders', '/addresses'].some((path) =>
      location.pathname.includes(path)
    );
    setShowHeader(!hideHeader);
  }, [location]);
  return (
    <>
      {showHeader && <Header />}
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default MainLayout;
