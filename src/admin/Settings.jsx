import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSettings } from "../store/SettingsContext.jsx";

export default function Settings() {
  const {
    siteTitle,
    tagLine,
    siteIcon,
    dateFormat,
    timeFormat,
    maxShowPost,
    featuredImageWidth,
    featuredImageHeight,
    permalinkType,
    showAdminOnList,
    showAdminOnPost,
    showDateOnList,
    showDateOnPost,
    showTimeOnList,
    showTimeOnPost,
    showTagOnPost,
    showCategoryOnPost,
  } = useSettings();

  console.log("s title", siteTitle);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      siteTitle: siteTitle || "The Blogging App",
      tagLine: tagLine || "Read Awesome Blogging Post",
      siteIcon: siteIcon || "",
      dateFormat: dateFormat || "mmdd,yyyy",
      timeFormat: timeFormat || "00:00uu",
      maxShowPost: maxShowPost || 6,
      featuredImageWidth: featuredImageWidth,
      featuredImageHeight: featuredImageHeight,
      permalinkType: permalinkType || "title",
      showAdminOnList: showAdminOnList,
      showAdminOnPost: showAdminOnPost,
      showDateOnList: showDateOnList,
      showDateOnPost: showDateOnPost,
      showTimeOnList: showTimeOnList,
      showTimeOnPost: showTimeOnPost,
      showTagOnPost: showTagOnPost,
      showCategoryOnPost: showCategoryOnPost || true,
    },
  });

  const date = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const dateFormat1 = date.toLocaleDateString("en-US", options);
  const dateFormat2 = `${date.getDate()}/ ${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const dateFormat3 = `${date.getDate()}. ${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
  const dateFormat4 = `${date.getFullYear()}- ${
    date.getMonth() + 1
  }-${date.getDate()}`;

  let hours = date.getHours();
  const minutes = date.getMinutes();

  let timeOfDay1 = "AM";
  let timeOfDay2 = "am";

  if (hours > 12) {
    timeOfDay1 = "PM";
  }

  if (hours > 12) {
    timeOfDay2 = "pm";
  }

  if (hours > 12) {
    hours -= 12;
  }

  const timeFormat1 = `${hours}: ${minutes} ${timeOfDay1}`;
  const timeFormat2 = `${hours}: ${minutes} ${timeOfDay2}`;
  const timeFormat3 = `${hours}: ${minutes}`;

  const saveSettings = async (data) => {
    //console.log("setting", data);
    const formData = new FormData();

    const siteIcon = data.siteIcon[0];
    if (siteIcon) {
      formData.append("siteIcon", siteIcon);
    }

    formData.append("siteTitle", data.siteTitle);
    formData.append("tagLine", data.tagLine);
    formData.append("dateFormat", data.dateFormat);
    formData.append("timeFormat", data.timeFormat);
    formData.append("maxShowPost", data.maxShowPost);
    formData.append("featuredImageWidth", data.featuredImageWidth);
    formData.append("featuredImageHeight", data.featuredImageHeight);
    formData.append("permalinkType", data.permalinkType);
    formData.append("showAdminOnList", data.showAdminOnList);
    formData.append("showAdminOnPost", data.showAdminOnPost);
    formData.append("showDateOnList", data.showDateOnList);
    formData.append("showDateOnPost", data.showDateOnPost);
    formData.append("showTimeOnList", data.showTimeOnList);
    formData.append("showTimeOnPost", data.showTimeOnPost);
    formData.append("showTagOnPost", data.showTagOnPost);
    formData.append("showCategoryOnPost", data.showTagOnPost);

    const result = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/v1/settings/set-setting`,
      formData,
      {
        withCredentials: true,
        "Content-Type": "multipart/form-data",
      }
    );
  };

  return (
    <div className=" w-full h-full flex justify-center overflow-hidden">
    <form onSubmit={handleSubmit(saveSettings)} className=" bg-slate-100 h-full absolute w-2/3 overflow-y-scroll">
      <section className="mb-4">
        <label htmlFor="siteTitle" className="block m-2 font-medium">Site Title</label>
        <input
          id="siteTitle"
          type="text"
          {...register("siteTitle")}
          className="outline-none border m-2 p-2 border-slate-700 rounded-md w-1/2"
        />
      </section>
  
      <section className="mb-4">
        <label htmlFor="tagLine" className="block m-2 font-medium">Site Tag Line</label>
        <input
          id="tagLine"
          type="text"
          {...register("tagLine")}
          className="outline-none border m-2 p-2 border-slate-700 rounded-md w-1/2 "
        />
      </section>
  
      <section className="mb-4">
        <label htmlFor="siteIcon" className="block m-2 font-medium">Site Icon</label>
        <input
          id="siteIcon"
          type="file"
          {...register("siteIcon")}
          className="block m-2"
        />
      </section>
  
      <fieldset className="mb-4">
        <legend className="m-2 font-medium">Date Format:</legend>
        <div className="flex flex-col m-2">
          {["mmdd,yyyy", "mm/dd/yyyy", "mm.dd.yyyy", "yyyy-mm-dd"].map((format, index) => (
            <label key={format} className="flex items-center mb-2">
              <input
                type="radio"
                {...register("dateFormat")}
                name="dateFormat"
                value={format}
                className="mr-2"
              />
              {format}
            </label>
          ))}
        </div>
      </fieldset>
  
      <fieldset className="mb-4">
        <legend className="m-2 font-medium">Time Format:</legend>
        <div className="flex flex-col m-2">
          {["00:00UU", "00:00uu", "00:00"].map((format, index) => (
            <label key={format} className="flex items-center mb-2">
              <input
                type="radio"
                {...register("timeFormat")}
                name="timeFormat"
                value={format}
                className="mr-2"
              />
              {format}
            </label>
          ))}
        </div>
      </fieldset>
  
      <section className="mb-4">
        <label htmlFor="maxShowPost" className="block m-2 font-medium">
          Blog pages show at most:
        </label>
        <input
          id="maxShowPost"
          type="number"
          {...register("maxShowPost")}
          className="h-10 p-2 m-2 border border-black rounded-md"
        />
      </section>
  
      <fieldset className="mb-4">
        <legend className="m-2 font-medium">Featured Image</legend>
        <div className="flex flex-col">
          <label className="m-2">
            Width:
            <input
              type="number"
              {...register("featuredImageWidth")}
              className="h-10 p-2 m-2 border border-black rounded-md"
            />
          </label>
          <label className="m-2">
            Height:
            <input
              type="number"
              {...register("featuredImageHeight")}
              className="h-10 p-2 m-2 border border-black rounded-md"
            />
          </label>
        </div>
      </fieldset>
  
      {/* Add similar structures for the remaining settings */}
  
      <button type="submit" className="bg-slate-500 text-white p-1 rounded-md m-2 px-4">
        Save
      </button>
    </form>
  </div>
  
  );
}
