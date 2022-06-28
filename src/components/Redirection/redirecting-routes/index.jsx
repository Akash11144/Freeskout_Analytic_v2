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
      path: "/try",
      element: (
        <h1>
          Parent... <Outlet />{" "}
        </h1>
      ),
      children: [
        {
          path: "c1",
          element: (
            <h5>
              Child 1 <Outlet />
            </h5>
          ),
          children: [
            {
              path: "gc1",
              element: <h4>Grandchild 1</h4>,
            },
            {
              path: "gc2",
              element: <h4>Grandchild 2</h4>,
            },
            {
              path: "gc3",
              element: <h4>Grandchild 3</h4>,
            },
          ],
        },
        {
          path: "c2",
          element: <h5>Child 2</h5>,
          children: [
            {
              path: "gc21",
              element: <h4>Grandchild of 2 </h4>,
            },
          ],
        },
      ],
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
        for (let i = 0; i < r1.length; i++) {
          arr.push({ path: r1[i].path, element: <Redir {...r1} /> });
        }
        console.log("route data: ", arr);
        setData(arr);
      };
      getData();
    }
    return () => (i = true);
  }, []);

  let element = useRoutes(Data);
  return element;
}

export default RedirectingRoutes;
