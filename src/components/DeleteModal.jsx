import React from "react";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import instance from "../config/axiosConfig";
import { toast } from "react-toastify";
const DeleteModal = ({
  setModal,
  message,
  selectedUser,
  userData,
  setUserData,
}) => {
  const userDeleteConfirmationHandler = () => {
    instance
      .delete(`/admin/delete-user/${selectedUser.userId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("User Deleted Successfully");
          setModal(false);
          const newUserData = userData.filter(
            (item) => item.id !== selectedUser.userId
          );
          setUserData(newUserData);
        }
      });
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-40 w-screen h-screen bg-black/80">
      <div className="bg-white rounded h-[18rem] w-[40%]">
        <div className="pe-3 flex justify-end w-full mt-4">
          <button
            onClick={() => {
              console.log("hello");
              setModal(false);
            }}
            className="text-4xl font-light"
          >
            <FiX></FiX>
          </button>
        </div>
        <div className="font-bold h-[9rem] text-2xl flex items-center justify-center">
          {message}
        </div>
        <div className="flex justify-around">
          <button
            className="text-yellow-800 text-2xl font-bold"
            onClick={() => {
              setModal(false);
            }}
          >
            NO
          </button>
          <button
            className="text-red-500 text-2xl font-bold"
            onClick={userDeleteConfirmationHandler}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
