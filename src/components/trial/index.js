import { useEffect, useState } from "react";

const Trial = () => {
  const [data, setdata] = useState([]);
  const [ldata, setldata] = useState([]);
  useEffect(async () => {
    try {
      let y = await fetch(
        "http://localhost:8000/user/getC"
      );
      let y1 = await y.json();
      console.log(y.status);
      setdata(y1);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setData = async () => {
    // localStorage.setItem("trial", JSON.stringify(data));
    let y=JSON.parse(localStorage.getItem("data trial"));
    console.log(y);
    for(let i=0;i<y.length;i++){
        if(y[i].lat==="" || y[i].lat || y[i].lat==="not awailable")
        {
            try {
                let r = await fetch("http://localhost:8000/user/getUser", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(y[i]),
                });
                console.log(await r.json());
              } catch (error) {
                console.log("error in post fetch request");
              }
        }
        else{
            y[i].lat="not available";
            y[i].long="not available";
            console.log(y[i]);
            try {
                let r = await fetch("http://localhost:8000/user/getUser", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(y[i]),
                });
                console.log(await r.json());
              } catch (error) {
                console.log("error in post fetch request");
              }
        }
    }  
    console.log("done") 
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "skyblue",
        padding: "10px",
      }}
    >
      <h1>Trial</h1>      
      <button
        style={{
          border: "0",
          borderRadius: "50px",
          padding: "10px",
          fontSize: "20px",
          boxShadow:"0px 5px 20px black"
        }}
        onClick={() => setData()}
        >
        set data L
        </button>

    </div>
  );
};

export default Trial;
