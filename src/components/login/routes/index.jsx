import { useRoutes } from "react-router";
import Dash from "../../dashboard";
import Redir from "../../redirection/redirection-page";
import Home from "../../homepage";
import RedirectingRoutes from "../../redirection/redirecting-routes";
import PageNotFound from '../../redirection/page-not-found';
import Login from "../login";
import Trial from "../../try";

export default function MainRoutes() {
  let element = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home/*",
      element: <Home />,
    },
    {
      path: "/redirect/*",
      element: <RedirectingRoutes />,
    },
    {
      path: "/rd",
      element: <Redir />,
    },
    {
      path: "/tr",
      element: <Trial />,
    },
    {
      path: "/da",
      element: <Dash />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return element;
}
