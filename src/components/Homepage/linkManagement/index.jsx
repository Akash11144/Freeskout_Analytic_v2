import { useState, useEffect } from "react";

const LinkManement = () => {
  const [Data, setData] = useState([]);
  let i = false;
  useEffect(() => {
    if (!i) {
      const DataFetch = async () => {
        let r = await fetch("http://localhost:1111/route/allRoutes");
        let r1 = await r.json();
        console.log("link management route data", r1);
      };
      DataFetch();
    }

    return () => {
      i = true;
    };
  }, [Data]);

  return (
    <>
      <div>hello welcome to Link Management</div>
    </>
  );
};

export default LinkManement;
