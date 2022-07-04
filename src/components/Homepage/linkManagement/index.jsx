import { useState, useEffect } from "react";
import Styles from "../linkManagement/index.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { useRef } from "react";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { TbMinusVertical } from "react-icons/tb";
const getYear = () => {
  var dt = new Date();
  return dt.getFullYear();
};
const users = [
  { user: "All Users" },
  { user: "Akash Gupta" },
  { user: "Shubham Upadhyay" },
  { user: "Shashank Sehrawat" },
  { user: "Ashish Bhambhani" },
  { user: "Akshay Chopra" },
  { user: "Rajesh Thakur" },
  { user: "Neha Sharma" },
  { user: "Lakshay Bhambhani" },
  { user: "Rishabh Gulla" },
  { user: "Ashish Bhambhani" },
  { user: "Akshay Chopra" },
  { user: "Rajesh Thakur" },
  { user: "Neha Sharma" },
  { user: "Lakshay Bhambhani" },
  { user: "Rishabh Gulla" },
  { user: "test user1" },
  { user: "test user 2" },
  { user: "lorem ipsum dollar lorem ipsdum" },
];
const LinkManement = (props) => {
  const [isActive, setisActive] = useState(false);
  const [isUserActive, setisUserActive] = useState(false);
  const [Data, setData] = useState([]);
  const handleStatusSelector = () => {
    setisActive(!isActive);
  };
  const handleUserSelector = () => {
    setisUserActive(!isUserActive);
  };
  const selected_status = useRef(null);
  const all_links = useRef(null);
  const active_links = useRef(null);
  const deleted_links = useRef(null);
  const allClick = () => {
    let allLiIt = all_links.current.innerText;
    selected_status.current.innerText = allLiIt;
  };
  const activeClick = () => {
    let alIt = active_links.current.innerText;
    selected_status.current.innerText = alIt;
  };
  const deletedClick = () => {
    let dlIt = deleted_links.current.innerText;
    selected_status.current.innerText = dlIt;
  };
  const selected_user = useRef();
  const handelSelctUser = (item) => {
    selected_user.current.innerText = item;
  };
  let i = false;
  useEffect(() => {
    if (!i) {
      const DataFetch = async () => {
        let r = await fetch("http://localhost:1111/route/allRoutes");
        let r1 = await r.json();
        console.log("link management route data", r1);
      };
      DataFetch();
    }

    return () => {
      i = true;
    };
  }, [Data]);

  return (
    <div className={Styles.mainCont}>
      {/* {generateLoading && <SmallLoading />} */}
      <div className={Styles.secondaryDiv}>
        <div className={Styles.selectors}>
          <div className={Styles.selectedOption}>
            <p ref={selected_status}>All Links</p>
            <div
              className={Styles.dropholder}
              onClick={() => {
                handleStatusSelector();
              }}
            >
              <AiFillCaretDown
                className={`${Styles.downIcon}
              ${isActive ? Styles.rotatedIcon : Styles.downIcon}`}
              />
            </div>
            <div
              className={`${Styles.otherOptionsContShow}
            ${
              isActive
                ? Styles.otherOptionsContShow
                : Styles.otherOptionsContHide
            }`}
            >
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                  allClick();
                }}
              >
                <p ref={all_links}>All Links</p>
              </div>
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                  activeClick();
                }}
              >
                <p ref={active_links}>Active Links</p>
              </div>
              <div
                className={Styles.otherOptions}
                onClick={() => {
                  handleStatusSelector();
                  deletedClick();
                }}
              >
                <p ref={deleted_links}>Deleted Links</p>
              </div>
            </div>
          </div>
          <div className={Styles.selectUser}>
            <div className={Styles.selectedUserOption}>
              <p ref={selected_user}>All Users</p>
              <div
                className={Styles.dropholder}
                onClick={() => {
                  handleUserSelector();
                }}
              >
                <AiFillCaretDown
                  className={`${Styles.downIcon}
              ${isUserActive ? Styles.rotatedIcon : Styles.downIcon}`}
                />
              </div>
              <div
                className={`${Styles.otherOptionsContShow}
            ${
              isUserActive
                ? Styles.otherOptionsContShow
                : Styles.otherOptionsContHide
            }`}
              >
                {users.length &&
                  users.map((item, index) => {
                    return (
                      <div
                        className={Styles.otherOptions}
                        onClick={() => {
                          handleUserSelector();
                          handelSelctUser(item.user);
                        }}
                      >
                        <p>{item.user}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={Styles.selectDate}>
            <p>From: </p>
            <input type="date" required="required">
              {/* Start Date */}
            </input>
          </div>
          <div className={Styles.selectDate}>
            <p>To:</p>
            <input type="date" required="required">
              {/* End Date */}
            </input>
          </div>
          <div className={Styles.showBtn}>
            <p>Show Results</p>
          </div>
        </div>
        <div className={Styles.linkList}>
          <div className={Styles.linksContainer}>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
            <div className={Styles.cont}>
              <p>
                www.freeskout.com/brands/influncers/linkedin/instagraam/youtube/meadata/mySlug
              </p>
              <div className={Styles.userActionBtnsCont}>
                <div className={Styles.viewIconCont}>
                  <FaRegEye className={Styles.viewIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.viewHover}`}
                  >
                    View
                  </p>
                </div>
                {/* <div className={Styles.TbMinusVertical}>
                  <TbMinusVertical className={Styles.TbMinusVertical} />
                </div> */}
                <div className={`${Styles.delIconCont}`}>
                  <AiOutlineDelete className={Styles.delIcon} />
                  <p
                    className={`${Styles.HoverNotification} ${Styles.delHover}`}
                  >
                    Delete
                  </p>
                </div>
              </div>
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

export default LinkManement;
