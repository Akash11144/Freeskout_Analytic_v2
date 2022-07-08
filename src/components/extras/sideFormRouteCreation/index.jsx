import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import { L_LINK, postAuth } from "../../utlis";
import SendMail from "../loading-animation/sendMailAnimation";
const UserCreationSideForm = (props) => {
  const finalCopiedLink = useRef();
  const gen_link = useRef();
  const gen_name = useRef();
  const gen_mail = useRef();
  const gen_desc = useRef();
  const gen_ref = useRef();
  const gen_slug = useRef();
  const gen_platforms = useRef();
  let b;
  let dt = new Date();
  let time = dt.toDateString() + " " + dt.toTimeString();
  let routeObject = {
    name: "",
    email: "",
    for_name: "",
    for_email: "",
    description: "",
    slug: "",
    website: "",
    time: dt.toDateString() + " " + dt.toTimeString(),
  };
  const copyLink = () => {
    navigator.clipboard.writeText(b);
  };
  const [generateLoading, setgenerateLoading] = useState(false);
  useEffect(() => {
    console.log("side form", props);
    gen_link.current.innerText = props.a.link;
    finalCopiedLink.current.innerText = props.a.link;
    finalCopiedLink.current.href = props.a.link;
    b = props.a.link;
    gen_name.current.innerText = props.a.routeName;
    gen_mail.current.innerText = props.a.mail;
    gen_desc.current.innerText = props.a.desc;
    gen_ref.current.innerText = props.a.ref;
    gen_ref.current.href = props.a.ref;
    gen_slug.current.innerText = props.a.slug;
    gen_platforms.current.innerText = props.a.platform;
    routeObject.name = props.a.creatorName;
    routeObject.email = props.a.creatorEmail;
    routeObject.for_name = gen_name.current.innerText;
    routeObject.for_email = gen_mail.current.innerText;
    routeObject.description = gen_desc.current.innerText;
    routeObject.slug = gen_slug.current.innerText;
    routeObject.website = gen_ref.current.innerText;
  }, [props]);

  const handleSendBtn = () => {
    setgenerateLoading(true);
    console.log("routeData", routeObject);
    // setgenerateLoading(false);
  };
  const handelHomeBtn = () => {
    navigator.clipboard.writeText(b);
    window.location.reload();
  };
  return (
    <div className={Styles.genDetailsCont}>
      <div className={Styles.afterSend}>
        <div className={Styles.notiCont}>
          <a href="" ref={finalCopiedLink} target="_blank"></a>
          <p>
            <q>Link successfully created and copied to clipboard</q>
          </p>
          <div
            className={Styles.btn}
            onClick={() => {
              handelHomeBtn();
            }}
          >
            Home
          </div>
        </div>
      </div>
      <div className={Styles.genLinkCont}>
        <p className={Styles.generatedLink}>
          <span>Generated Link: </span>
          <span ref={gen_link}></span>
        </p>
      </div>

      <div className={Styles.otherDetails}>
        <p>
          <span>Name: </span> <span ref={gen_name}></span>
        </p>
        <p>
          <span>Email: </span>
          <span ref={gen_mail}></span>
        </p>
        <p>
          <span>Slug: </span>
          <span ref={gen_slug}></span>
        </p>

        <p>
          <span>Desc: </span>
          <span ref={gen_desc}></span>
        </p>
        <p>
          <span>Landing Page: </span>
          <a ref={gen_ref} href="" target="_blank"></a>
        </p>
        <p>
          <span>Platforms: </span>
          <span ref={gen_platforms}></span>
        </p>
      </div>
      <div
        className={Styles.btn}
        onClick={() => {
          {
            copyLink();
            handleSendBtn();
          }
        }}
        id="sendmailBtn"
      >
        {generateLoading && <SendMail />}
        {!generateLoading && "Save"}
      </div>
    </div>
  );
};

export default UserCreationSideForm;
