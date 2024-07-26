import { Route, Routes } from "react-router-dom";
import './App.scss';
import Sidebar from "./Sidebar";

function App() {
  return (
   <Routes>
     <Route path="/*" element={<Sidebar/>}/>
   </Routes>
  );
}

export default App;
