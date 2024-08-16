import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Settings() {
  const [profilePic, setProfilePic] = useState(null);
  const [accountInfo, setAccountInfo] = useState([]);
  const [isClickedAccInfo, setIsClickedAccInfo] = useState(false);
  const [isEditingAccInfo, setIsEditingAccInfo] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const [editingAccInfo, setEditingAccInfo] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (accountInfo) {
      setEditingAccInfo({
        fullName: accountInfo.fullName || "",
        email: accountInfo.email || "",
      });
    }
  }, [accountInfo]);

  const [avatarView, setAvatarView] = useState(null);

  const handlePerosonalInfo = async () => {
    setIsClickedAccInfo(true);
    setShowDropdown(false);
    const result = await axios.get("http://localhost:3000/profile", {
      withCredentials: true,
    });
    setAccountInfo(result.data.data);
    console.log(accountInfo.avatar);
  };

  const handleSignOut = () => {};

  const handleCloseAccInfo = () => {
    setIsClickedAccInfo(false);
    setShowDropdown(true);
    setAvatarView(null)
  };

  const handleEditAccInfo = () => {
    setIsEditingAccInfo(true);
  };

  const handleOnChangeAccInfo = (e) => {
    setEditingAccInfo({ ...editingAccInfo, [e.target.name]: e.target.value });
  };

  const handleCancelEditingAccInfo = () => {
    setIsEditingAccInfo(false);
    setEditingAccInfo(accountInfo);
  };

  const handleSaveAccInfo = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3000/account-update",
        editingAccInfo,
        {
          withCredentials: true,
        }
      );

      setIsEditingAccInfo(false);
      setAccountInfo(result.data.data);
    } catch (error) {
      console.error("Error to save edit account info", error);
    }
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarView(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("dp", profilePic);

  const handleAvatarUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", profilePic);

    const data = {
      avatar: formData.get("avatar"),
    };

    console.log("data", data.avatar);

    await axios.post("http://localhost:3000/avatar", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <>
      <div className=" h-screen w-full flex justify-center text-white">
        {showDropdown && (
          <div className=" absolute bg-indigo-400 h-1/2 w-2/4 rounded-sm">
            <h2 className=" m-2 font-semibold">Profile & Settings</h2>
            <ul>
              <li
                onClick={handlePerosonalInfo}
                className=" bg-indigo-700 p-2 rounded-md m-2"
              >
                Personal Information
              </li>
              <li className=" bg-indigo-700 p-2 rounded-md m-2">
                Delete Account
              </li>
              <li
                onClick={handleSignOut}
                className=" bg-indigo-700 p-2 rounded-md m-2"
              >
                Sign out
              </li>
            </ul>
          </div>
        )}

        {isClickedAccInfo && (
          <div className=" bg-amber-200 h-1/2 w-1/2">
            <h2>Account Info</h2>
            <div className=" h-32 w-32 bg-slate-200 rounded-full overflow-hidden">
              {avatarView || accountInfo.avatar ? (
                <img
                  className=" h-full w-full object-cover"
                  src={avatarView ? avatarView : accountInfo.avatar}
                ></img>
              ) : (
                <span className="flex justify-center items-center">
                  No Image
                </span>
              )}
            </div>

            <form onSubmit={handleAvatarUpload}>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={handleProfilePic}
              ></input>
              <button className=" p-2 m-2 rounded-md bg-lime-500" type="submit">
                Save
              </button>
            </form>

            {isEditingAccInfo ? (
              <div className=" bg-teal-200 flex justify-center items-center">
                <div className=" flex flex-col">
                  <label>
                    Full Name:
                    <input
                      className=" text-black m-2 p-1"
                      name="fullName"
                      onChange={handleOnChangeAccInfo}
                      value={editingAccInfo.fullName}
                    ></input>
                  </label>

                  <label>
                    Email:
                    <input
                      className=" text-black m-2 p-1"
                      name="email"
                      onChange={handleOnChangeAccInfo}
                      value={editingAccInfo.email}
                    ></input>
                  </label>

                  <div>
                    <button
                      className=" bg-lime-500 p-2 rounded-md m-3"
                      onClick={handleCancelEditingAccInfo}
                    >
                      Cancel
                    </button>
                    <button
                      className=" bg-lime-500 p-2 rounded-md m-3"
                      onClick={handleSaveAccInfo}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" absolute w-60 h-60 text-black">
                <h2>Name: {accountInfo.fullName}</h2>
                <h2>Email: {accountInfo.email}</h2>

                <div>
                  <button
                    onClick={handleCloseAccInfo}
                    className=" bg-lime-500 p-2 rounded-md m-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleEditAccInfo}
                    className=" bg-lime-500 p-2 rounded-md m-2"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
