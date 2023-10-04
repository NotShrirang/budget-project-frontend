import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/HomePage";
import Login from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import TransactionView from "./pages/Transactions/TransactionsView";
import TransactionAddForm from "./pages/Transactions/TransactionAddForm";
import TransactionUpdateView from "./pages/Transactions/TransactionUpdatePage";
import Activity from "./pages/Activity/Activity";
import ActivityView from "./pages/Activity/ActivityView";
import ActivityAddForm from "./pages/Activity/ActivityAddForm";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
        path: "dashboard/",
        element: <Dashboard />,
      },
      {
        path: "transactions/",
        element: <Transactions />,
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
        path: "activities/add/",
        element: <ActivityAddForm />,
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
