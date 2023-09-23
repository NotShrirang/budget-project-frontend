import "./App.css";
import Login from "./pages/Login/loginPage";
import { Route, Routes } from "react-router";

function App() {
  const atLoginPage = location.pathname.includes("login");

  return (
    <div className="my-main-container">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
