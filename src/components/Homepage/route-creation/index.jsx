import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import SmallLoading from "../../extras/loading-animation/small-loading";
import SendMail from "../../extras/loading-animation/sendMailAnimation";
import companyGif from "../../assets/FsnoBg.gif";
import { L_LINK, postAuth } from "../../utlis";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import InformationPopUp from "../../extras/pop-ups/information";
import UserCreationSideForm from "../../extras/sideFormRouteCreation";

let errorObj = {
  desc: "",
  navigation: true,
  navigationRoute: "",
};

const RouteCreationDesign = (props) => {
  const [generateLoading, setgenerateLoading] = useState(false);
  const [sideloader, setsideloader] = useState(true);
  const [sideForm, setsideForm] = useState(false);
  const [pageError, setpageError] = useState(false);
  // const [Data, setData] = useState("");

  const name_inp = useRef(null);
  const mail_inp = useRef(null);
  const route_inp = useRef(null);
  const desc_inp = useRef(null);
  const website_inp = useRef(null);
  const instaCheck = useRef(null);
  const linkedinCheck = useRef(null);
  const utChecked = useRef(null);
  const twChecked = useRef(null);
  const othersChecked = useRef(null);

  let newData = {
    creatorName: "",
    creatorEmail: "",
    link: "",
    routeName: "",
    mail: "",
    desc: "",
    ref: "",
    slug: "",
    platform: "",
  };

  let allowedDomain = [
    "gmail",
    "outlook",
    "icloud",
    "yahoo",
    "hotmail",
    "proton",
    "zoho",
    "freeskout",
  ];
  let allowedEnds = ["com", "in", "io", "net"];
  let sts = false;
  let urlSts = false;
  const emailChecker = (email) => {
    let atChecker = email.split("@");
    let dotChecker = email.split("..");
    let spaceChecker = email.split(" ");
    let firstSecondSplit;
    if (
      atChecker.length === 2 &&
      spaceChecker.length == 1 &&
      dotChecker.length == 1
    ) {
      firstSecondSplit = atChecker[1].split(".");
      if (firstSecondSplit.length === 2) {
        for (let i = 0; i <= allowedDomain.length; i++) {
          let result = firstSecondSplit[0]
            .toLowerCase()
            .includes(allowedDomain[i]);
          if (result == true) {
            for (let i = 0; i <= allowedEnds.length; i++) {
              let result = firstSecondSplit[1]
                .toLowerCase()
                .includes(allowedEnds[i]);
              if (result == true) {
                sts = true;
              }
            }
          }
        }
      }
    }
    return sts;
  };
  const urlChecker = (site) => {
    let spaceChecker = site.split(" ");
    if (spaceChecker.length === 1) {
      urlSts = true;
    }
  };
  const handleCreateBtn = () => {
    let finalName = name_inp.current.value;
    let finalMail = mail_inp.current.value;
    let finalDesc = desc_inp.current.value;
    let finalRoute = route_inp.current.value;
    let finalWebsite = website_inp.current.value;
    let genLink = "localHost" + "/redirect/" + finalRoute;
    let instaSts = instaCheck.current.checked;
    let linkedinSts = linkedinCheck.current.checked;
    let utSts = utChecked.current.checked;
    let twSts = twChecked.current.checked;
    let otherSts = othersChecked.current.checked;
    let platforms;
    emailChecker(finalMail);
    urlChecker(finalWebsite);
    if (
      finalName == "" ||
      finalMail == "" ||
      finalRoute == "" ||
      finalDesc == "" ||
      finalWebsite == ""
    ) {
      alert("Fill all fileds");
    } else if (sts === false) {
      alert("Invaild Mail");
    } else if (urlSts === false) {
      alert("Inavlid landing url, Space not allowed");
    } else if (
      instaSts == false &&
      linkedinSts == false &&
      utSts == false &&
      twSts == false &&
      otherSts == false
    ) {
      alert("select atleast one platform");
    } else {
      if (instaSts) {
        platforms += <IoLogoInstagram></IoLogoInstagram>;
      }
      if (linkedinSts) {
        platforms += "LinkedIn,";
      }
      if (utSts) {
        platforms += "YouTube,";
      }
      if (twSts) {
        platforms += "Twitter,";
      }
      if (otherSts) {
        platforms += "Others";
      }
      newData.creatorName = props.name;
      newData.creatorEmail = props.email;
      newData.link = genLink;
      newData.routeName = finalName;
      newData.desc = finalDesc;
      newData.mail = finalMail;
      newData.slug = finalRoute;
      newData.ref = finalWebsite;
      newData.platform = platforms;
      console.log("newData", newData);
      setsideForm(newData);
      setsideloader(false);
    }
  };

  let i = false;
  useEffect(() => {
    console.log("create link props: ", props);
    // if (!i) setData(props);
    return () => (i = true);
  }, [props]);

  return (
    <>
      {pageError && <InformationPopUp {...errorObj} />}
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
            <input
              className={`${Styles.inputFields}`}
              id="slug"
              ref={route_inp}
              type="text"
              placeholder="Enter Slug"
              required={true}
            />
            <div className={Styles.socialSelectorCont}>
              <label className={Styles.container}>
                <IoLogoInstagram className={Styles.instalogo} />
                <input type="checkbox" ref={instaCheck} />
                <span className={Styles.checkmark}></span>
              </label>

              <label className={Styles.container}>
                <IoLogoLinkedin className={Styles.linlogo} />
                <input type="checkbox" ref={linkedinCheck} />
                <span className={Styles.checkmark}></span>
              </label>

              <label className={Styles.container}>
                <IoLogoYoutube className={Styles.utlogo} />
                <input type="checkbox" ref={utChecked} />
                <span className={Styles.checkmark}></span>
              </label>

              <label className={Styles.container}>
                <IoLogoTwitter className={Styles.twlogo} />
                <input type="checkbox" ref={twChecked} />
                <span className={Styles.checkmark}></span>
              </label>

              <label className={Styles.container}>
                <p className={Styles.otlogo}> others</p>
                <input type="checkbox" ref={othersChecked} />
                <span className={Styles.checkmark}></span>
              </label>
            </div>
            <div
              className={`${Styles.btn} ${Styles.createBtn}`}
              id="generateBtn"
              onClick={() => {
                handleCreateBtn();
              }}
            >
              Create
            </div>
          </div>
          <div className={Styles.dividerDiv}></div>
          <div className={Styles.formPartTwo}>
            {sideForm && <UserCreationSideForm a={sideForm} />}
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
