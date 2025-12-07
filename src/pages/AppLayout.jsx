import PageNav from "../components/PageNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "../styles/AppLayout.module.css";

function AppLayout() {
  return (
    <main className={styles.app}>
      <SideBar />
      <Map />
    </main>
  );
}

export default AppLayout;
