import { useRef } from "react";

const FUM = () => {
  let name = useRef(null);
  let email = useRef(null);
  let pass = useRef(null);

  const handleClick = () => {};

  return (
    <div>
      <input ref={name} placeholder="Enter Your name" type={"text"} />
      <input ref={email} placeholder="Enter your email" type={"text"} />
      <input ref={pass} placeholder="Enter your password" type={"password"} />
      <button onClick={() => handleClick()}>Create User</button>
    </div>
  );
};
export default FUM;
