import companyLogo from "../../../Assets/FsnoBg.gif";
const SmallLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.449)",
        position: "absolute",
        top: "0",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={companyLogo} style={{ width: "60px", height: "60px" }} />
      </div>
    </div>
  );
};

export default SmallLoading;
