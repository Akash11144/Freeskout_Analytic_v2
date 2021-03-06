import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import {
  urlChecker,
  emailChecker,
  L_LINK,
  postAuth,
  slugchecker,
} from "../../utlis";
import companyGif from "../../assets/FsnoBg.gif";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import SmallLoading from "../../extras/loading-animation/small-loading";
import SendMail from "../../extras/loading-animation/send-mail-animation";
import InformationPopUp from "../../extras/pop-ups/information";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};
let social = {
  insta: false,
  linkedin: false,
  youtube: false,
  twitter: false,
  others: false,
};

const RouteCreationDesign = (props) => {
  const [generateLoading, setgenerateLoading] = useState(false);
  const [sideloader, setsideloader] = useState(true);
  const [sideForm, setsideForm] = useState(false);
  const [sendBtn, setsendBtn] = useState(true);
  const [pageError, setpageError] = useState(false);

  const name_inp = useRef(null);
  const mail_inp = useRef(null);
  const route_inp = useRef(null);
  const desc_inp = useRef(null);
  const website_inp = useRef(null);
  const instaCheck = useRef(null);
  const linkedinCheck = useRef(null);
  const utCheck = useRef(null);
  const twCheck = useRef(null);
  const othersCheck = useRef(null);

  let refresh = () => {
    name_inp.current.value = "";
    mail_inp.current.value = "";
    route_inp.current.value = "";
    desc_inp.current.value = "";
    website_inp.current.value = "";
    instaCheck.current.checked = false;
    linkedinCheck.current.value = false;
    utCheck.current.value = false;
    othersCheck.current.value = false;
    twCheck.current.value = false;
    social.insta = false;
    social.linkedin = false;
    social.youtube = false;
    social.twitter = false;
    social.others = false;
    setsendBtn(true);
    setsideForm(false);
    setsideloader(true);
    instaCheck.current.style.color = "grey";
    linkedinCheck.current.style.color = "grey";
    utCheck.current.style.color = "grey";
    twCheck.current.style.color = "grey";
    othersCheck.current.style.color = "grey";
  };

  let i = false;
  useEffect(() => {
    if (!i) console.log("create link props: ", props);
    return () => (i = true);
  }, [props]);

  const handleCreateBtn = () => {
    setgenerateLoading(true);
    let finalName = name_inp.current.value;
    let finalMail = mail_inp.current.value;
    let finalDesc = desc_inp.current.value;
    let finalRoute = "/" + route_inp.current.value;
    let finalWebsite = website_inp.current.value;
    let genLink = "http://localhost:3000" + "/redirect" + finalRoute;
    let { insta, linkedin, youtube, twitter, others } = social;
    let platform = "";
    let sts = emailChecker(finalMail);
    let urlSts = urlChecker(finalWebsite);
    let slugSts = slugchecker(route_inp.current.value);

    if (
      finalName == "" ||
      finalMail == "" ||
      route_inp.current.value == "" ||
      finalDesc == "" ||
      finalWebsite == ""
    ) {
      alert("Fill all fileds");
    } else if (sts === false) {
      alert("Invaild Mail");
    } else if (urlSts === false) {
      alert("Inavlid landing url, Space not allowed");
    } else if (slugSts === false) {
      alert("Invalid slug format");
    } else if (!insta && !linkedin && !youtube && !twitter && !others) {
      alert("select atleast one platform");
    } else {
      if (insta) platform += "Instagram,";
      if (linkedin) platform += "LinkedIn,";
      if (youtube) platform += "YouTube,";
      if (twitter) platform += "Twitter,";
      if (others) platform += "Others";

      setsideForm({
        name: props.name,
        email: props.email,
        for_name: finalName,
        for_email: finalMail,
        description: finalDesc,
        path: finalRoute,
        website: finalWebsite,
        platform,
        genLink,
      });
      setsideloader(false);
    }
    setgenerateLoading(false);
  };

  const handelSendBtnShow = () => setsendBtn(false);

  return (
    <>
      {generateLoading && <SmallLoading />}
      {pageError && (
        <InformationPopUp
          keyp={"sfcb"}
          createUserPopUp={() => setpageError(false)}
          {...errorObj}
        />
      )}
      <div className={Styles.mainCont}>
        <div className={Styles.secondaryDiv}>
          <div className={Styles.formPartOne}>
            <input
              autoComplete="on"
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
              autoComplete="on"
              className={Styles.inputFields}
              id="linkTotrack"
              ref={website_inp}
              type="text"
              placeholder="Link to visit"
              required={true}
            />
            <input
              autoComplete="on"
              className={`${Styles.inputFields}`}
              id="slug"
              ref={route_inp}
              type="text"
              placeholder="Enter Slug"
              required={true}
            />
            <div className={Styles.socialSelectorCont}>
              <span
                className={Styles.instaHolder}
                ref={instaCheck}
                onClick={() => {
                  social.insta = !social.insta;
                  {
                    console.log(social);
                  }
                  social.insta
                    ? (instaCheck.current.style.color = "#bc2a8d")
                    : (instaCheck.current.style.color = "grey");
                }}
              >
                <IoLogoInstagram className={Styles.instalogo} />
              </span>
              <span
                className={Styles.instaHolder}
                ref={linkedinCheck}
                onClick={() => {
                  social.linkedin = !social.linkedin;
                  {
                    console.log(social);
                  }
                  social.linkedin
                    ? (linkedinCheck.current.style.color = "#0072b1")
                    : (linkedinCheck.current.style.color = "grey");
                }}
              >
                <IoLogoLinkedin className={Styles.linlogo} />
              </span>
              <span
                className={Styles.instaHolder}
                ref={utCheck}
                onClick={() => {
                  social.youtube = !social.youtube;
                  {
                    console.log(social);
                  }
                  social.youtube
                    ? (utCheck.current.style.color = "#ff0000")
                    : (utCheck.current.style.color = "grey");
                }}
              >
                <IoLogoYoutube className={Styles.utlogo} />
              </span>
              <span
                className={Styles.instaHolder}
                ref={twCheck}
                onClick={() => {
                  social.twitter = !social.twitter;
                  {
                    console.log(social);
                  }
                  social.twitter
                    ? (twCheck.current.style.color = "#1da1f2")
                    : (twCheck.current.style.color = "grey");
                }}
              >
                <IoLogoTwitter className={Styles.twlogo} />
              </span>
              <span
                className={Styles.instaHolder}
                ref={othersCheck}
                onClick={() => {
                  social.others = !social.others;
                  {
                    console.log(social);
                  }
                  social.others
                    ? (othersCheck.current.style.color = "#0c1117")
                    : (othersCheck.current.style.color = "grey");
                }}
              >
                <p className={Styles.otlogo}>others</p>
              </span>
            </div>
            {sendBtn && (
              <div
                className={`${Styles.btn} ${Styles.createBtn}`}
                id="generateBtn"
                onClick={() => {
                  handleCreateBtn();
                }}
              >
                Create
              </div>
            )}
          </div>
          <div className={Styles.dividerDiv}></div>
          <div className={Styles.formPartTwo}>
            {sideForm && (
              <UserCreationSideForm
                a={sideForm}
                searchV={() => handelSendBtnShow()}
                handelrefresh={() => refresh()}
                sideFormCallback={() => {
                  setpageError(true);
                  setsendBtn(true);
                }}
              />
            )}
            {sideloader && (
              <div className={Styles.companyGifHolder}>
                <img
                  src={companyGif}
                  alt="Company Logo"
                  className={Styles.companyGif}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteCreationDesign;

// ---------------------------------------------------------------------------------------------

const UserCreationSideForm = ({
  a,
  searchV,
  sideFormCallback,
  handelrefresh,
}) => {
  const [homeDiv, sethomeDiv] = useState(false);
  const [saveBtnLoading, setsaveBtnLoading] = useState(false);
  const [pageLoading, setpageLoading] = useState(false);

  const {
    name,
    email,
    for_name,
    for_email,
    description,
    path,
    website,
    platform,
    genLink,
  } = a;

  const finalCopiedLink = useRef(null);
  const gen_link = useRef(null);
  const gen_name = useRef(null);
  const gen_mail = useRef(null);
  const gen_desc = useRef(null);
  const gen_ref = useRef(null);
  const gen_slug = useRef(null);
  const gen_platforms = useRef(null);
  let b = "";
  let dt = new Date();

  useEffect(() => {
    setpageLoading(true);
    gen_link.current.innerText = genLink;
    b = genLink;
    finalCopiedLink.current.innerText = genLink;
    finalCopiedLink.current.href = genLink;
    gen_name.current.innerText = for_name;
    gen_mail.current.innerText = for_email;
    gen_desc.current.innerText = description;
    gen_ref.current.innerText = website;
    gen_ref.current.href = website;
    gen_slug.current.innerText = path;
    gen_platforms.current.innerText = platform;
    setpageLoading(false);
  }, [a, searchV, handelrefresh]);

  const handleSaveBtn = async () => {
    setsaveBtnLoading(true);
    let url = new URL(L_LINK);
    url.pathname = "/route/addRoute";
    let r = await postAuth(url, "", {
      name,
      email,
      for_name,
      for_email,
      description,
      path,
      website,
      platform,
      time: dt.toDateString() + " " + dt.toTimeString(),
      deleted: false,
      deleted_time: "",
      deleted_by: "",
    });
    console.log("result: ", r);
    if (r.issue) {
      if (r.storageClear) {
        localStorage.removeItem("Freeskout-session");
        errorObj.desc = r.issueDetail;
        errorObj.navigationRoute = "/";
      } else {
        errorObj.desc = r.issueDetail;
        errorObj.navigation = false;
      }
      sideFormCallback();
    } else sethomeDiv(true);
    setsaveBtnLoading(false);
  };

  return (
    <>
      {pageLoading && <SmallLoading />}
      <div className={Styles.genDetailsCont}>
        <div
          className={`${Styles.afterSend} ${homeDiv ? Styles.afterSendShow : Styles.afterSend
            }`}
        >
          <div className={Styles.notiCont}>
            <a href="" ref={finalCopiedLink} target="_blank"></a>
            <p>
              <q>Link successfully created and copied to clipboard</q>
            </p>
            <div
              className={Styles.btn}
              onClick={() => {
                handelrefresh("hello");
                sethomeDiv(false);
              }}
            >
              Create New
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
            searchV("hello");
            navigator.clipboard.writeText(gen_link.current.innerText);
            handleSaveBtn();
          }}
          id="sendmailBtn"
        >
          {saveBtnLoading ? <SendMail /> : "Save"}
        </div>
      </div>
    </>
  );
};
