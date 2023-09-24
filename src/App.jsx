import "./App.css";
import Home from "./pages/Home/HomePage";
import Login from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Route, Routes } from "react-router";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
  const atLoginPage = location.pathname.includes("login");

  return (
    <div className="my-main-container">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
