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

  const getData = async () => {
    console.time();
    try {
      let r = await fetch("http://localhost:1111/route/allRoutesRedis", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer freeskout_personal_data`,
        },
      });
      let r1 = await r.json();
      console.log("route data:", r1);
      const newloc = loc.pathname.split("/redirect");
      if (newloc[1]) {
        for (let i = 0; i < r1.length; i++) {
          if (newloc[1] === r1[i].path) {
            arr.push({
              path: r1[i].path,
              element: <Redir website={r1[i].website} path={newloc[1]} />,
            });
            break;
          }
        }
      }
    } catch (error) {
      console.log("error while fetching in frontend", error);
      return {
        FetchIssue: true,
        FetchIssueDetail: "error getting data",
      };
    }
    setData(arr);
    console.timeEnd();
  };

  let i = false;
  useEffect(() => {
    if (!i) getData();

    return () => (i = true);
  }, []);

  let element = useRoutes(Data);
  return element;
}

export default RedirectingRoutes;
