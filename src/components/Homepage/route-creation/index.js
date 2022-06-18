import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Redir from "../route-creation";
import RouteCreationDesign from "./layout";

export const RouteCreation = () => {
  const [Data, setData] = useState("");

  useEffect(() => {
    const getAllRoutes = async () => {
      let r = await fetch("http://localhost:8000/route/allRoutes");
      let r1 = await r.json();
      setData(r1);
    };
    getAllRoutes();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          Data.length ? (
            <div>
              <RouteCreationDesign {...Data} />
            </div>
          ) : (
            <h1>Loading....</h1>
          )
        }
      />
      {Data.length &&
        Data.map((item, index) => {
          return <Route key={index} path={item.path} element={<Redir />} />;
        })}
    </Routes>
  );
};

export default RouteCreation;
