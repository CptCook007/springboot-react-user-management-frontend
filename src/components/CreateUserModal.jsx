import React from "react";
import Signup from "./signup/Signup";
import { FiX } from "react-icons/fi";

export default function CreateUserModal({ setModal }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-30 w-screen h-screen bg-black/80">
        <div className="bg-white rounded h-[40rem] w-[40%]">
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
          <Signup adminCreating={true} setModal={setModal} />
        </div>
      </div>
    </>
  );
}
