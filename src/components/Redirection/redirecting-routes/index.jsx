import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import PageNotFound from "../page-not-found";
import Redir from "../redirection-page";

const RedirectingRoutes = () => {
  const [Data, setData] = useState("");
  useEffect(() => {
    const getAllRoutes = async () => {
      let r = await fetch("http://localhost:1111/route/allRoutes");
      setData(await r.json());
    };
    getAllRoutes();
  }, []);
  return (
    <Routes>
      {console.log(Data)}
      <Route path="/" element={<h1>Redirecting...</h1>} />
      {Data.length &&
        Data.map((item, index) => {
          return <Route key={index} path={item.path} element={<Redir />} />;
        })}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RedirectingRoutes;
