import React, { useEffect, useState } from "react";
import instance from "../../../config/axiosConfig";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import DeleteModal from "../../../components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "../../../components/EditModal";
import { useDispatch, useSelector } from "react-redux";
import CreateUserModal from "../../../components/CreateUserModal";
import { setMessage } from "../../../redux/reducers/userSlice";
import Skeleton from "react-loading-skeleton";
const Dashboard = () => {
  const initialSelectedUser = {
    username: "",
    userId: "",
  };
  const [userData, setUserData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const { message } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
  const [searchValue, setSearchValue] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    instance.get("/admin/get-users").then((response) => {
      setUserData(response.data);
    });
  }, []);
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (!deleteModal) {
      setSelectedUser(initialSelectedUser);
    }
  }, [deleteModal]);
  useEffect(() => {
    instance.get("/admin/get-users").then((response) => {
      const newUserData = response.data.filter((item) =>
        item.username.includes(searchValue)
      );
      setUserData(newUserData);
    });
  }, [searchValue]);
  useEffect(() => {
    if (message) {
      toast.success(message, { pauseOnHover: false });
      dispatch(setMessage(null));
    }
  }, [message]);

  const handleDeleteClick = (username, userId) => {
    setDeleteModal(true);
    setSelectedUser({ username, userId });
  };
  const handleEditUserClick = (username, userId, profileImageUrl) => {
    setSelectedUser({ username, userId, profileImageUrl });
    setEditModal(true);
  };
  return (
    <div className="bg-gray-300 h-screen">
      {loading ? (
        <div className="fixed inset-0 z-50 bg-black/30 h-screen w-screen flex justify-center items-center">
          <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <div className="container mx-auto p-4 py-10">
        <div className="flex justify-between mb-10 pb-10">
          <h2 className="text-2xl font-bold">Users</h2>
          <div className="flex items-center relative">
            <span className="absolute left-3">
              <FaSearch />
            </span>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="rounded px-12 py-3"
              placeholder="search user"
            ></input>
          </div>
          <button
            onClick={() => {
              setCreateUserModal(true);
            }}
            className="flex bg-green-600 justify-center py-2 items-center text-white font-bold rounded-3xl w-28"
          >
            <FaPlus />
            <span className="ps-1">Add user</span>
          </button>
        </div>
        {userData.length === 0 && (
          <h1 className="text-5xl font-bold text-center mt-20 w-full">
            No users
          </h1>
        )}
        <div className="container mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {userData.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg drop-shadow-md cursor-pointer hover:shadow-2xl hover:p-6.5 transition duration-300 ease-in-out"
            >
              <div>
                <Skeleton
                  width={200}
                  height={200}
                  className="rounded-full z-50 w-28 h-28"
                  style={
                    !imageLoaded ? { display: "block" } : { display: "none" }
                  }
                />
                <img
                  src={
                    user.profileImageUrl ? user.profileImageUrl : "/avatar.jpg"
                  }
                  alt="User Avatar"
                  className="w-28 h-28 object-cover mx-auto mb-4 rounded-full"
                  onLoad={() => setImageLoaded(true)}
                  style={
                    imageLoaded ? { display: "block" } : { display: "none" }
                  }
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {user.username}
              </h3>
              <div className="flex justify-evenly">
                <button
                  onClick={() => {
                    handleEditUserClick(
                      user.username,
                      user.id,
                      user.profileImageUrl
                    );
                  }}
                  className="border-orange-700 border-2 flex justify-center items-center rounded-full w-10 h-10 text-orange-700 hover:bg-orange-700 hover:text-white transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick(user.username, user.id);
                  }}
                  className="border-red-700 border-2 flex justify-center items-center rounded-full w-10 h-10 text-red-700 hover:bg-red-700 hover:text-white transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          setModal={setDeleteModal}
          userData={userData}
          setUserData={setUserData}
          message={`Are you sure you want to delete user "${selectedUser.username}"`}
          selectedUser={selectedUser}
        />
      )}
      {editModal && (
        <EditModal
          setModal={setEditModal}
          userData={userData}
          setUserData={setUserData}
          selectedUser={selectedUser}
        />
      )}
      {createUserModal && <CreateUserModal setModal={setCreateUserModal} />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
};

export default Dashboard;
