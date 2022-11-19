import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import axios from "axiosInstance";
import { useDispatch } from "react-redux";
import { setRecOk } from "app/reclamations/recSlice";
const RecManagementDropDown = (props) => {
  const { id, sender } = props;
  const dispatch = useDispatch();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleOk = () => {
    dispatch(setRecOk(id));
    closeDropdownPopover();
    axios
      .put(`reclamations/ok/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSendEmail = () => {
    dispatch(setRecOk(id));
    closeDropdownPopover();
    axios
      .put(`reclamations/send-mail/${sender._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button
        className="text-blueGray-500 py-3 text-base	 px-8"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          className={
            "text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            handleOk();
          }}
        >
          Ok
        </button>
        <button
          className={
            "text-sm py-2 px-2 font-normal block w-full hover:bg-violet-600 whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            handleSendEmail();
          }}
        >
          Send Email
        </button>
      </div>
    </>
  );
};

export default RecManagementDropDown;
