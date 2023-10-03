import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/HomePage";
import Login from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Activity from "./pages/Activity/Activity";
import TransactionView from "./pages/Transactions/Transactions";
import TransactionAddForm from "./pages/Transactions/TransactionAddForm";
import TransactionUpdateView from "./pages/Transactions/TransactionUpdatePage";
import ActivityView from "./pages/Activity/ActivityView";

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
        path: "transactions/add/",
        element: <TransactionAddForm />,
      },
      {
        path: "transactions/:id/",
        element: <TransactionView />,
      },
      {
        path: "transactionS/:id/update/",
        element: <TransactionUpdateView />,
      },
      {
        path: "activities",
        element: <Activity />,
      },
      {
        path: "activities/:id/",
        element: <ActivityView />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
