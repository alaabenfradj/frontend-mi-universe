import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import axios from "axiosInstance";
import { useDispatch } from "react-redux";
import { removeUser, blockUser, unblockUser } from "app/usersSlice/adminSlice";
const UserManagementDropDown = (props) => {
  const [onDeleted, setOnDeleted] = useState(false);
  const { id, user } = props;
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
  const handleUnblock = () => {
    dispatch(unblockUser(id));
    closeDropdownPopover();
    axios
      .put(`users/unblock/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleBlock = () => {
    dispatch(blockUser(id));
    closeDropdownPopover();
    axios
      .put(`users/block/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = () => {
    dispatch(removeUser(id));
    closeDropdownPopover();

    axios
      .delete(`users/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button
        className="text-blueGray-500 py-3 text-base	 px-5"
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
        {!user.isBlocked ? (
          <button
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={(e) => {
              e.preventDefault();
              handleBlock();
            }}
          >
            Block
          </button>
        ) : (
          <button
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={(e) => {
              e.preventDefault();
              handleUnblock();
            }}
          >
            Unblock
          </button>
        )}
        <button
          className={
            onDeleted
              ? "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-red text-blueGray-700"
              : "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default UserManagementDropDown;
