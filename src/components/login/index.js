import { Link } from 'react-router-dom';


function LogIn() {
  return (
    <div
      style={{
        height: "10vh",
        width: "100%",
        backgroundColor: "lightblue",
        color: "#555",
        fontSize: "30px",
        textAlign: "center",
      }}
    >
      log in
      <div>
        <Link to="/da">Log in</Link>
      </div>
    </div>
  );
}
export default LogIn;
