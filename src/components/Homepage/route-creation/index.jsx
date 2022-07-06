import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import SmallLoading from "../../extras/loading-animation/small-loading";
import SendMail from "../../extras/loading-animation/sendMailAnimation";
import { L_LINK, postAuth } from "../../utlis";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";

const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};

const RouteCreationDesign = (props) => {
  const [generateLoading, setgenerateLoading] = useState(false);
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

  const gen_link = useRef();
  const gen_name = useRef();
  const gen_mail = useRef();
  const gen_desc = useRef();
  const gen_ref = useRef();
  const gen_slug = useRef();
  const gen_platforms = useRef();

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
    let platforms = "";

    if (
      finalName == "" ||
      finalMail == "" ||
      finalRoute == "" ||
      finalDesc == "" ||
      finalWebsite == ""
    ) {
      alert("Fill all fileds");
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
        platforms += "instagram,";
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
      gen_link.current.innerText = genLink;
      gen_name.current.innerText = finalName;
      gen_desc.current.innerText = finalDesc;
      gen_mail.current.innerText = finalMail;
      gen_slug.current.innerText = finalRoute;
      gen_ref.current.innerText = finalWebsite;
      gen_ref.current.href = finalWebsite;
      gen_platforms.current.innerText = platforms;
    }
  };

  let i = false;
  useEffect(() => {
    console.log("create link props: ", props);
    // if (!i) setData(props);
    return () => (i = true);
  }, [props]);

  const handleValue = async () => {
    setgenerateLoading(true);

    let name = props.name;
    let email = props.email;
    let for_name = gen_name.current.value;
    let for_email = gen_mail.current.value;
    let description = gen_desc.current.value;
    let slug = gen_slug.current.value;
    let website = website_inp.current.value;
    let dt = new Date();
    let time = dt.toDateString() + " " + dt.toTimeString();

    let email_regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    var url_exp = /^(https\:\/\/freeskout.com)/gi;
    let url_regex = new RegExp(url_exp);
    let slug_exp = /([A-Za-z0-9\-\_])+/gi;
    let slug_regex = new RegExp(slug_exp);

    if (
      for_name === "" ||
      for_email === "" ||
      description === "" ||
      slug === "" ||
      website === ""
    ) {
      alert("fill all the fileds");
    } else if (email_regex.test(for_email.toLowerCase()) == false) {
      alert("invalid email");
    } else if (url_regex.test(website.toLowerCase()) == false) {
      alert("invalid website");
    } else if (slug_regex.test(slug) == false) {
      alert("invalid Slug");
    } else {
      console.log(
        name,
        email,
        for_name,
        for_email,
        description,
        slug,
        website,
        time
      );
      // let r = await postAuth(L_LINK, "/route/addRoute", {
      //   name,
      //   email,
      //   for_name,
      //   for_email,
      //   description,
      //   path: `/${slug}`,
      //   website,
      //   time,
      // });
      // console.log("route creation post result -->", r);
      route_inp.current.value = "";
    }
    setgenerateLoading(false);
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
            onClick={() => handleCreateBtn()}
          >
            Create
          </div>
        </div>
        <div className={Styles.dividerDiv}></div>
        <div className={Styles.formPartTwo}>
          <div className={Styles.genDetailsCont}>
            <div className={Styles.genLinkCont}>
              <p className={Styles.generatedLink}>
                <span>Generated Link: </span>
                <span ref={gen_link}>www.freeskout.com/rc/ShubhamUpadhyay</span>
              </p>
            </div>
            <div className={Styles.otherDetails}>
              <p>
                <span>Name: </span>{" "}
                <span ref={gen_name}> Shubham Upadhyay</span>
              </p>
              <p>
                <span>Email: </span>
                <span ref={gen_mail}> akashsinghGupta@outlook.com</span>
              </p>
              <p>
                <span>Slug: </span>
                <span ref={gen_slug}> akashsinghGupta@outlook.com</span>
              </p>

              <p>
                <span>Desc: </span>
                <span ref={gen_desc}>
                  Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem
                  Ipsum Dolor
                </span>
              </p>
              <p>
                <span>Landing Page: </span>
                <a ref={gen_ref} href="freeskout.com/blogs">
                  https://freeskout.com/blogs/
                </a>
              </p>
              <p>
                <span>Platforms: </span>
                <span ref={gen_platforms}></span>
              </p>
            </div>
            <div className={Styles.btn} id="sendmailBtn">
              {/* <SendMail /> */}
              Send
            </div>
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
