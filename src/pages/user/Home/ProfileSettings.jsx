import React, { useEffect, useState } from "react";
import instance from "../../../config/axiosConfig";
import { useSelector } from "react-redux";

export default function ProfileSettings() {
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);
  useEffect(() => {
    instance
      .get(`/user/get-user-info/${user.username}`)
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [user]);
  return (
    <div className="h-[740px] w-full bg-gray-300 flex justify-center items-center">
      <div className="w-[60%] h-[80%] rounded-2xl flex flex-col justify-center items-center shadow-xl bg-white">
        <div>
          <img
            src={
              userInfo.profileImageUrl
                ? userInfo.profileImageUrl
                : "/avatar.jpg"
            }
            className="w-48 h-48 object-cover mx-auto mb-4 rounded-full"
          />
        </div>
        <div className="h-48 w-full flex flex-col items-center justify-center">
          Username
          <div className="h-8 w-[33%] border border-gray-600 rounded-xl items-center text-xl font-bold flex justify-center mt-3">
            <p>{userInfo.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
