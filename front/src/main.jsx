import ReactDOM from 'react-dom/client'
import Layout from "./components/layouts/Layout"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';
import CreateCardPage from './pages/CreateCardPage';
import MyCardsPage from './pages/MyCardsPage';

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "cards",
        element: <MyCardsPage />,
      },
      {
        path: "create/card",
        element: <CreateCardPage />,
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
