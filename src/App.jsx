import "./App.css";
import { Outlet } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";

function App() {
  return (
    <div className="app-layout">
      <Outlet />
      <BottomNavbar />
    </div>
  );
}

export default App;
