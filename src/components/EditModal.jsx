import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import instance from "../config/axiosConfig";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import storage from "../firebase-config";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { Form, Formik } from "formik";
import InputComponent from "./inputs/InputComponent";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/reducers/userSlice";

function EditModal({ setModal, message, selectedUser, userData, setUserData }) {
  const initialValues = {
    username: selectedUser.username,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required"),
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const dispatch = useDispatch();

  function sendPatchRequest(username, profileImageUrl) {
    console.log("sending update request ....");
    instance
      .patch(
        `/admin/edit-user/${selectedUser.userId}`,
        {
          username,
          profileImageUrl,
        },
        {}
      )
      .then((response) => {
        dispatch(setLoader(false));
        if (response.status === 200) {
          toast.success("User Edited Successfully");
          setModal(false);
          const newUserData = userData.map((item) => {
            if (item.id === selectedUser.userId) {
              if (profileImageUrl) {
                return { ...item, profileImageUrl, username };
              }
              return { ...item, username };
            }
          });
          setUserData(newUserData);
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        if (error.response.status === 409) {
          setModal(false);
          toast.error("user already exists");
        }
      });
  }
  const handleSubmit = ({ username }) => {
    dispatch(setLoader(true));
    console.log("uploading image ....");
    let profileImageUrl = "";
    if (profilePhoto) {
      const imageRef = storageRef(storage, `userProfileImages/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(imageRef, profilePhoto);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          alert(error);
        },
        async () => {
          try {
            const profileImageUrl = await getDownloadURL(
              uploadTask.snapshot.ref
            );
            sendPatchRequest(username, profileImageUrl);
          } catch (error) {
            dispatch(setLoader(false));
            console.log(error);
            alert(error);
          }
        }
      );
    } else {
      sendPatchRequest(username, profileImageUrl);
    }
  };
  console.log(selectedUser.profileImageUrl);
  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0]);
    setProfileImageUrl(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-30 w-screen h-screen bg-black/80">
      <div className="bg-white rounded h-[30rem] w-[50%]">
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
        <div className="flex flex-col">
          <div className="mb-2 flex justify-center">
            <label htmlFor="profile-photo">
              <img
                src={
                  profileImageUrl ||
                  selectedUser.profileImageUrl ||
                  "/avatar.jpg"
                }
                alt="Profile Preview"
                className={` w-40 h-40 object-cover cursor-pointer ${
                  selectedUser.profileImageUrl && "rounded-full"
                }`}
              />
            </label>

            <input
              className="hidden"
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Form className="w-full flex flex-col items-center gap-5 justify-center mt-12">
                <InputComponent name="username" placeholder="Username" />
                <div className="mt-12">
                  <button
                    className="bg-teal-500 text-white w-40 h-9 text-lg font-bold rounded-lg"
                    type="submit"
                  >
                    Confirm changes
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditModal;
