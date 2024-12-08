import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/AuthContext.jsx";
import {
  avatarUpdate,
  changePassword,
  getAdminProfile,
  userProfileUpdate,
} from "../api/index.js";

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [showAccInfo, setShowAccInfo] = useState(false);
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);

  const { register: registerAvatar, handleSubmit: handleSubmitAvatar } =
    useForm();
  const {
    register: registerPersonalInfo,
    handleSubmit: handleSubmitPersonalInfo,
    reset,
  } = useForm();

  const { register: registerPassword, handleSubmit: handleSubmitPassword } =
    useForm();

  const { signout, check } = useAuth();

  const clickAccInfo = () => {
    setShowAccInfo(true);
    setShowMenu(false);
  };

  const closeAccInfo = () => {
    setShowAccInfo(false);
    setShowMenu(true);
  };

  const handleAvatrPreview = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));

    // const file = e.target.files[0]
    // if(file){
    //   const reader = new FileReader()
    //   reader.onloadend = () =>{
    //     setAvatar(reader.result)
    //   }
    //   reader.readAsDataURL(file)
    // }
  };

  const updateAvatar = async (data) => {
    const formData = new FormData();
    setAvatar(data.avatar[0]);

    formData.append("avatar", data.avatar[0]);
    await avatarUpdate(formData);
    setAvatar(null)
  };

  const editPersonanInfo = () => {
    if (profileInfo?.fullName && profileInfo?.email) {
      reset({
        fullName: profileInfo?.fullName,
        email: profileInfo?.email,
      });
    }
    setEditingPersonalInfo(true);
    setShowAccInfo(false);
  };

  const cancelEditPersonalInfo = () => {
    setEditingPersonalInfo(false);
    setShowAccInfo(true);
  };

  const SaveEditPersonalInfo = async (data) => {
    try {
      await userProfileUpdate(data);
      setEditingPersonalInfo(false);
      setShowAccInfo(true);
    } catch (error) {
      console.error("ERROR to Save Personal Info.");
    }
  };

  const editPassowrd = () => {
    setEditingPassword(true);
    setShowAccInfo(false);
  };

  const saveEditPassword = async (data) => {
    try {
      await changePassword(data);
      setEditingPassword(false);
      setShowAccInfo(true);
    } catch (error) {
      console.error("Error to save password.", error);
    }
  };

  const cancelEditPassword = () => {
    setEditingPassword(false);
    setShowAccInfo(true);
  };

  useEffect(() => {
    const profile = async () => {
      const result = await getAdminProfile()
      setProfileInfo(result.data.data);
      toast(result.data?.message);
    };
    profile();
  }, []);

  const handleSignout = () => {
    signout();
  };

  //console.log(avatar)
  return (
    <>
      <div className=" w-full items-center flex justify-center overflow-hidden">
        {showMenu && (
          <ul className=" bg-neutral-400 min-h-60 w-1/2 rounded-md">
            <li
              onClick={clickAccInfo}
              className=" bg-slate-500 w-fit p-1 m-2 rounded-md cursor-pointer"
            >
              Account Info
            </li>
            <li className=" bg-slate-500 w-fit p-1 m-2 rounded-md cursor-pointer">
              General Settings
            </li>
            <li
              onClick={handleSignout}
              className=" bg-slate-500 w-fit p-1 m-2 rounded-md cursor-pointer"
            >
              Sign Out
            </li>
          </ul>
        )}

        {/* first modal */}

        {showAccInfo && (
          <div className=" p-3 rounded-md bg-slate-200">
            <div className=" flex flex-col justify-center items-center">
              <div className=" overflow-hidden flex justify-center items-center  bg-slate-100 h-24 w-24 rounded-full m-2 text-center">
                {avatar || profileInfo?.avatar ? (
                  <img
                    src={avatar ? avatar : profileInfo?.avatar}
                    className=" h-full w-full object-cover"
                  ></img>
                ) : (
                  "No Avatar"
                )}
              </div>
              <form onSubmit={handleSubmitAvatar(updateAvatar)}>
                <input
                  type="file"
                  {...registerAvatar("avatar", { required: true })}
                  onChange={handleAvatrPreview}
                />

                <button
                  type="submit"
                  className="bg-slate-500 h-fit w-fit p-1 rounded-md"
                >
                  Update
                </button>
              </form>

              <div className=" w-full m-2 flex justify-between items-center">
                <div className="">
                  <h2>Name: {profileInfo?.fullName} </h2>
                  <h2>Email: {profileInfo?.email} </h2>
                </div>
                <button
                  className=" bg-slate-500 h-fit w-fit p-1 rounded-md "
                  onClick={editPersonanInfo}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className=" flex justify-between">
              <h2>
                Password:{" "}
                <input className="" placeholder="******" disabled></input>
              </h2>
              <button
                onClick={editPassowrd}
                className=" bg-slate-500 w-fit p-1 rounded-md "
              >
                Change
              </button>
            </div>

            <button
              className=" bg-slate-500 w-fit p-1 rounded-md "
              onClick={closeAccInfo}
            >
              Close
            </button>
          </div>
        )}

        {/* second modal */}

        {editingPersonalInfo && (
          <div className=" h-fit w-fit bg-orange-400 p-1 flex flex-col rounded-md shadow-lg ">
            <form onSubmit={handleSubmitPersonalInfo(SaveEditPersonalInfo)}>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded-md "
                type="text"
                {...registerPersonalInfo("fullName", { required: true })}
              />
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                type="email"
                {...registerPersonalInfo("email", { required: true })}
              />

              <button
                onClick={cancelEditPersonalInfo}
                type="button"
                className=" bg-gray-300  h-fit w-fit p-2 m-2 rounded-md "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500  h-fit w-fit p-2 m-2 rounded-md "
              >
                Save
              </button>
            </form>
          </div>
        )}

        {/* third modal */}

        {editingPassword && (
          <div className=" bg-lime-300 p-2  rounded-md">
            <form
              onSubmit={handleSubmitPassword(saveEditPassword)}
              className=" flex flex-col"
            >
              <label>
                Old Password:
                <input
                  type="text"
                  {...registerPassword("oldPassword", { required: true })}
                  className=" m-2 rounded-md p-1 outline-none"
                />
              </label>
              <label>
                New Passowrd:
                <input
                  type="text"
                  {...registerPassword("newPassword", { required: true })}
                  className=" m-2 rounded-md p-1 outline-none"
                />
                <div className=" flex justify-end">
                  <button
                    type="button"
                    onClick={cancelEditPassword}
                    className=" bg-slate-400 w-fit p-1 rounded-md m-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" bg-blue-400 w-fit p-1 rounded-md m-2"
                  >
                    Save
                  </button>
                </div>
              </label>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
