import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar.jsx";
import DashboardNavbar from "./DashboardNavbar.jsx";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardNavbar />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;