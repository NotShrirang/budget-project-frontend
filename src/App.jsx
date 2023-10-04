import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router";

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
