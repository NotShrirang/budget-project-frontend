import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/HomePage";
import Login from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Activity from "./pages/Activity/Activity";
import TransactionView from "./pages/Transactions/Transactions";

const router = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "transaction/:id/",
        element: <TransactionView />,
      },
      {
        path: "activities",
        element: <Activity />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
