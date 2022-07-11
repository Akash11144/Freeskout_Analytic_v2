import companyLogo from "../../../assets/FsnoBg.gif";
const SmallLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.449)",
        position: "absolute",
        top: "0",
        left: '0',
        zIndex: "10",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
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
