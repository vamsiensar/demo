import SideBar from "../components/SideBar";
import Map from "../components/Map";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import { useAuth } from "../context/FakeAuthContext";

const AppLayout = function () {
  const { user } = useAuth();
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      {user && <User />}
    </div>
  );
};

export default AppLayout;
