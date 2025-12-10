import PageNav from "../components/PageNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import User from "../components/User";
import styles from "../styles/AppLayout.module.css";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  return (
    <main className={styles.app}>
      <ProtectedRoute>
        <SideBar />
        <Map />
        <User />
      </ProtectedRoute>
    </main>
  );
}

export default AppLayout;
