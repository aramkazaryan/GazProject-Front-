import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Tables from "components/Tables";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/address" element={<Tables />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
