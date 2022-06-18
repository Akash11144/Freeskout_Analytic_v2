import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Styles from "./index.module.css";
import SmallLoading from "../../extras/loading-animation/small-loading";

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

  const handleValue = async () => {
    let a = name_inp.current.value;
    let b = desc_inp.current.value;
    let c = route_inp.current.value;
    let w = website_inp.current.value;
    let dt = new Date();
    let d = dt;
    console.log(a, b, c, d, w);
  };

  useEffect(() => setData(Object.values(props)), []);

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
      {/* {generateLoading && <SmallLoading />} */}
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
          <p className={Styles.generatedLink}>
            www.Freeskout.com/rc/ShubhamUpadhyay
          </p>
          <div className={Styles.btn} id="sendmailBtn">
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
