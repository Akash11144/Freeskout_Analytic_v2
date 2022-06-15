import { useContext, useRef } from "react";
// import { ValueContext } from "..";

const RouteCreation = () => {
  const route_inp = useRef(null);
  const name_inp = useRef(null);
  const desc_inp = useRef(null);

  // const {
  //   state: { value, value1 },
  //   dispatch,
  // } = useContext(ValueContext);

  const handleValue = async () => {
    let a = name_inp.current.value;
    let b = desc_inp.current.value;
    let c = route_inp.current.value;
    let dt = new Date();
    let d = dt;
    console.log(a, b, c, d);
    // let r = await fetch("http://localhost:8000/route/addRoute", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: a, description: b, path: c, time: d }),
    // });
    // let r1 = await r.json();
    // console.log("result of post", r1);
    // dispatch({ type: "ADD_ROUTE", payload: a });
  };

  return (
    <div>
      <h1>welcome link creation</h1>
      <div>
        <label>Enter Name</label>
        <input
          ref={name_inp}
          type="text"
          placeholder="enter name"
          required={true}
        />
      </div>
      <div>
        <label>Enter Description</label>
        <input
          ref={desc_inp}
          type="text"
          placeholder="Enter Description for route"
          required={true}
        />
      </div>
      <div>
        <label>Enter Unique Route Name</label>
        <input
          ref={route_inp}
          type="text"
          placeholder="enter route"
          required={true}
        />
      </div>
      <button onClick={() => handleValue()}>create</button>
    </div>
  );
};

export default RouteCreation;
