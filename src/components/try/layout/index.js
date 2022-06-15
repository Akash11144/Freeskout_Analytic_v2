import { useContext, useRef } from "react";
// import { ValueContext } from "..";

const RouteCreation = () => {
  const inp = useRef(null);

  // const {
  //   state: { value, value1 },
  //   dispatch,
  // } = useContext(ValueContext);

  const handleValue = async (a) => {
    console.log("inside function", a);
    let r = await fetch("http://localhost:8000/route/addRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    });
    let r1 = await r.json();
    console.log("result of post", r1);
    // dispatch({ type: "ADD_ROUTE", payload: a });
  };

  return (
    <div>
      {/* {console.log(value, value1)} */}
      <h1>welcome link creation</h1>
      <input ref={inp} type="text" placeholder="enter route"></input>
      <button onClick={() => handleValue({ path: inp.current.value })}>
        create
      </button>
    </div>
  );
};

export default RouteCreation;
