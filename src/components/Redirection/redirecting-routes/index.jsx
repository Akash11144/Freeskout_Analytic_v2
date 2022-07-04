import { useRoutes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Redir from "../redirection-page";
import PageNotFound from "../page-not-found";

function RedirectingRoutes() {
  const [Data, setData] = useState([]);
  const loc = useLocation();
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
    console.log("location", loc);
    if (!i) {
      const getData = async () => {
        let r = await fetch("http://localhost:1111/route/allRoutesRedis");
        let r1 = await r.json();
        const newloc = loc.pathname.split("/");
        console.log(newloc);
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
