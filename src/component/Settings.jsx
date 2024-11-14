import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useAuth } from "../store/AuthContext.jsx";

export default function Settings() {
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

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isClickedGeneralSettings, setIsClickedGeneralSettings] =
    useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const { register, resetField, handleSubmit } = useForm();

  const { signout } = useAuth()

  const handlePerosonalInfo = async () => {
    setIsClickedAccInfo(true);
    setShowDropdown(false);
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/v1/profile`, {
      withCredentials: true,
    });
    setAccountInfo(result.data.data);
  };

  const handleCloseAccInfo = () => {
    setIsClickedAccInfo(false);
    setShowDropdown(true);
    setAvatarPreview(null);
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
        `${import.meta.env.VITE_BACKEND_API}/api/v1/account-update`,
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

  const handleViewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  const handleAvatarUpload = async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);

    // const avatarFile = {
    //   avatar: formData.get("avatar"),
    // };

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/v1/avatar`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleGeneralSettings = () => {
    setIsClickedGeneralSettings(true);
    setShowDropdown(false);
  };

  const handleCloseGeneralSettins = () => {
    setIsClickedGeneralSettings(false);
    setShowDropdown(true);
  };

  const handlePasswordEdit = () => {
    setIsEditingPassword(true);
  };

  const handleCancelEditingPassword = () => {
    setIsEditingPassword(false);
    resetField("oldPassword");
    resetField("newPassword");
  };

  const handleSaveEditingPassword = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/v1/user/password-change`, data, {
        withCredentials: true,
      });
      resetField("oldPassword");
      resetField("newPassword");
    } catch (error) {
      console.error("Error to save new Password.", error);
    }
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
              <li
                onClick={handleGeneralSettings}
                className=" bg-indigo-700 p-2 rounded-md m-2"
              >
                General Settings
              </li>
              <li className=" bg-indigo-700 p-2 rounded-md m-2">
                Delete Account
              </li>
              <li
                onClick={signout}
                className=" bg-indigo-700 p-2 rounded-md m-2"
              >
                Sign out
              </li>
            </ul>
          </div>
        )}

        {isClickedAccInfo && (
          <div className=" bg-amber-200 h-fit w-1/2 overflow-hidden">
            <h2>Account Info</h2>
            <div className=" h-32 w-32 bg-slate-200 rounded-full overflow-hidden">
              {avatarPreview || accountInfo.avatar ? (
                <img
                  className=" h-full w-full object-cover"
                  src={avatarPreview ? avatarPreview : accountInfo.avatar}
                ></img>
              ) : (
                <span className="flex justify-center items-center">
                  No Image
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit(handleAvatarUpload)}>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("avatar", { required: true })}
                onChange={handleViewAvatar}
              />
              <button className=" p-2 m-2 rounded-md bg-lime-500" type="submit">
                Save
              </button>
            </form>

            <div className=" bg-emerald-100 flex w-60 h-fit text-black">
              <div>
                <h2>Name: {accountInfo.fullName}</h2>
                <h2>Email: {accountInfo.email}</h2>
              </div>

              <button
                onClick={handleEditAccInfo}
                className=" bg-lime-500 p-2 rounded-md m-2"
              >
                Edit
              </button>

              {isEditingAccInfo && (
                <div className="  absolute bg-teal-200 flex justify-center items-center">
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
              )}
            </div>

            <div className=" text-black flex">
              <div>
                Password:
                <input
                  className=" bg-white"
                  placeholder="*******"
                  disabled
                ></input>
              </div>
              <button
                className="-top-2 bg-lime-500 p-2 rounded-md m-2"
                onClick={handlePasswordEdit}
              >
                Change
              </button>
            </div>

            {isEditingPassword && (
              <div className=" absolute bg-green-300">
                <div>
                  Edit Password
                  <form onSubmit={handleSubmit(handleSaveEditingPassword)}>
                    <label>
                      Old Password:
                      <input
                        autoComplete="off"
                        className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
                        type="password"
                        {...register("oldPassword", {
                          required: true,
                          minLength: 8,
                          maxLength: 20,
                        })}
                      />
                    </label>
                    <label>
                      New Password:
                      <input
                        autoComplete="on"
                        className=" bg-cyan-600 rounded-md w-72 outline-none px-2 m-2"
                        type="password"
                        {...register("newPassword", {
                          required: true,
                          minLength: 8,
                          maxLength: 20,
                        })}
                      />
                    </label>
                    <input
                      className="-top-2 bg-lime-500 p-2 rounded-md m-2"
                      type="submit"
                    />
                  </form>
                </div>
                <button
                  onClick={handleCancelEditingPassword}
                  className="-top-2 bg-lime-500 p-2 rounded-md m-2"
                >
                  Cancel
                </button>

                <div></div>
              </div>
            )}

            <button
              onClick={handleCloseAccInfo}
              className="-top-2 bg-lime-500 p-2 rounded-md m-2"
            >
              Close
            </button>
          </div>
        )}

        {isClickedGeneralSettings && (
          <>
            <div className=" bg-red-300 h-1/2 w-1/2">
              General Settings
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div>
                <button onClick={handleCloseGeneralSettins}>Close</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
