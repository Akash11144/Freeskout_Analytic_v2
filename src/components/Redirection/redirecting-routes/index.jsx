import { useRoutes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Redir from "../redirection-page";
import PageNotFound from "../page-not-found";

function RedirectingRoutes() {
  const [Data, setData] = useState([]);
  let arr = [
    {
      path: "/",
      element: <h1 className="homediv">Redirecting..</h1>,
    },
    {
      path: "/rd",
      element: <Redir />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];
  let i = false;
  useEffect(() => {
    if (!i) {
      const getData = async () => {
        let r = await fetch("http://localhost:1111/route/allRoutesRedis");
        let r1 = await r.json();
        for (let i = 0; i < r1.length; i++)
          arr.push({ path: r1[i].path, element: <Redir {...r1} /> });
        setData(arr);
      };
      getData();
    }
    return () => (i = true);
  }, []);

  let element = useRoutes(Data);
  console.log("Redirectional page Route Data: ", Data);
  return element;
}

export default RedirectingRoutes;
