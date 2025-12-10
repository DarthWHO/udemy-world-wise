import PageNav from "../components/PageNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import User from "../components/User";
import styles from "../styles/AppLayout.module.css";

function AppLayout() {
  return (
    <main className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </main>
  );
}

export default AppLayout;
