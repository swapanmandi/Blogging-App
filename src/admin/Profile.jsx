import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const profile = async () => {
      const result = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });
      setProfileInfo(result.data.data);
      console.log("profile data", result.data.data);
      toast(result.data?.message);
    };
    profile();
  }, []);
  return (
    <>
      <div className=" w-full items-center flex justify-center">
        <div className="bg-gray-600 w-2/5 h-screen">
          <h2 className="p-3">Name: {profileInfo?.fullName}</h2>
          <h2 className="p-3">Email: {profileInfo?.email}</h2>
        </div>
      </div>
    </>
  );
}
