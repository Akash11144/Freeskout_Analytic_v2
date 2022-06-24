import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Styles from "./index.module.css";
import SmallLoading from "../../extras/loading-animation/small-loading";
import SendMail from "../../extras/loading-animation/sendMailAnimation";
import { postR } from "../../utlis";

const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};
const RouteCreationDesign = (props) => {
  const [generateLoading, setgenerateLoading] = useState(false);
  const [Data, setData] = useState("");

  const name_inp = useRef(null);
  const mail_inp = useRef(null);
  const route_inp = useRef(null);
  const desc_inp = useRef(null);
  const website_inp = useRef(null);

  useEffect(() => {
    setData(props);
  }, []);

  const handleValue = async () => {
    setgenerateLoading(true);
    let name = props.name;
    let email = props.email;
    let for_name = name_inp.current.value;
    let for_email = mail_inp.current.value;
    let description = desc_inp.current.value;
    let path = route_inp.current.value;
    let website = website_inp.current.value;
    let dt = new Date();
    let time = dt;
    let ls = localStorage.getItem("Freeskout-session");
    if (
      name === "" ||
      email === "" ||
      for_name === "" ||
      for_email === "" ||
      description === "" ||
      path === "" ||
      website === "" ||
      time === ""
    )
      console.log("please fill all fields in route creation form");
    else {
      console.log(
        name,
        email,
        for_name,
        for_email,
        description,
        path,
        website,
        time
      );
      let r = await postR(
        "http://localhost:1111",
        "/route/addRoute",
        {
          name,
          email,
          for_name,
          for_email,
          description,
          path: `/${path}`,
          website,
          time,
        },
        `Bearer ${JSON.parse(localStorage.getItem("Freeskout-session"))}`
      );
      console.log("route creation post result -->", r);
      route_inp.current.value = "";
    }
    setgenerateLoading(false);
  };

  const UniqueIDgenerator = async () => {
    setgenerateLoading(true);
    let a = nanoid(5);
    let r = await fetch("http://localhost:1111/route/uniqueID/a");
    let b = await r.json();
    let unique_ID = a;
    while (b.length) {
      unique_ID = nanoid(5);
      let r = await fetch("http://localhost:1111/route/uniqueID/unique_ID");
      let r1 = await r.json();
      b = r1.length;
    }
    setgenerateLoading(false);
    return unique_ID;
  };

  return (
    <div className={Styles.mainCont}>
      {generateLoading && <SmallLoading />}
      <div className={Styles.secondaryDiv}>
        <div className={Styles.formPartOne}>
          <input
            className={Styles.inputFields}
            id="Name"
            ref={name_inp}
            type="text"
            placeholder="Name"
            required={true}
          />

          <input
            className={Styles.inputFields}
            id="email"
            ref={mail_inp}
            type="email"
            placeholder="Email"
            required={true}
          />
          <textarea
            className={`${Styles.inputFields} ${Styles.desc}`}
            id="desc"
            ref={desc_inp}
            type="textarea"
            rows={5}
            cols={15}
            placeholder="Description"
            required={true}
          />

          <input
            className={Styles.inputFields}
            id="linkTotrack"
            ref={website_inp}
            type="text"
            placeholder="Link to visit"
            required={true}
          />
          <div className={`${Styles.slugHolder}`}>
            <input
              className={`${Styles.inputFields} ${Styles.slug}`}
              id="slug"
              ref={route_inp}
              type="text"
              placeholder="Enter/Generate Slug"
              required={true}
            />
            <div
              className={Styles.btn}
              id="slugBtn"
              onClick={async () =>
                (route_inp.current.value = await UniqueIDgenerator())
              }
            >
              Generate
            </div>
          </div>
          <div
            className={`${Styles.btn} ${Styles.createBtn}`}
            id="generateBtn"
            onClick={() => handleValue()}
          >
            Create
          </div>
        </div>
        <div className={Styles.dividerDiv}></div>
        <div className={Styles.formPartTwo}>
          {/* div.generatedLink */}
          <div className={Styles.genLinkCont}>
            <p className={Styles.generatedLink}>
              www.Freeskout.com/rc/ShubhamUpadhyay
            </p>
          </div>
          <div className={Styles.btn} id="sendmailBtn">
            <SendMail />
            Send
          </div>
        </div>
      </div>
      <div className={Styles.copyRightCont}>
        <p className={Styles.CopyRightP}>
          © Freeskout{" "}
          <span className={Styles.CRyearCont} id="CRyear">
            {getYear()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RouteCreationDesign;
