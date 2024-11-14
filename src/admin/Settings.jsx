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

  console.log("s title", siteTitle)

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
    console.log("setting",data);
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
      `${import.meta.env.VITE_BACKEND_API}/app/admin/setting`,
      formData,
      {
        withCredentials: true,
        "Content-Type": "multipart/form-data",
      }
    );
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(saveSettings)}>
          <div className=" flex">
            <h2 className=" m-2">Site Title</h2>
            <input
              type="text"
              {...register("siteTitle")}
              className=" outline-none border m-2 border-slate-700"
            ></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Site Tag Line</h2>
            <input
              type="text"
              {...register("tagLine")}
              className=" outline-none border m-2 border-slate-700"
            ></input>
          </div>

          <div>
            <h2 className=" m-2">
              Site Icon <input type="file" {...register("siteIcon")}></input>
            </h2>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Date Format:</h2>
            <div className="flex flex-col m-2">
              <label>
                <input
                  type="radio"
                  {...register("dateFormat")}
                  name="dateFormat"
                  value="mmdd,yyyy"
                ></input>
                {dateFormat1}
              </label>
              <label>
                <input
                  type="radio"
                  {...register("dateFormat")}
                  name="dateFormat"
                  value="mm/dd/yyyy"
                ></input>
                {dateFormat2}
              </label>
              <label>
                <input
                  type="radio"
                  {...register("dateFormat")}
                  name="dateFormat"
                  value="mm.dd.yyyy"
                ></input>
                {dateFormat3}
              </label>
              <label>
                <input
                  type="radio"
                  {...register("dateFormat")}
                  name="dateFormat"
                  value="yyyy-mm-dd"
                ></input>
                {dateFormat4}
              </label>
            </div>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Time Format:</h2>
            <div className="flex flex-col m-2">
              <label>
                <input
                  {...register("timeFormat")}
                  type="radio"
                  name="timeFormat"
                  value="00:00UU"
                ></input>
                {timeFormat1}
              </label>
              <label>
                <input
                  {...register("timeFormat")}
                  type="radio"
                  name="timeFormat"
                  value="00:00uu"
                ></input>
                {timeFormat2}
              </label>
              <label>
                <input
                  {...register("timeFormat")}
                  type="radio"
                  name="timeFormat"
                  value="00:00"
                ></input>
                {timeFormat3}
              </label>
            </div>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Blog pages show at most</h2>
            <input
              {...register("maxShowPost")}
              className=" h-10 p-1 w-16 outline-none border border-black"
              type="number"
            ></input>
          </div>

          {/* <div className=" flex">
          <h2 className=" m-2">Publish Comments before approved</h2>
          <input type="checkbox"></input>
        </div> */}

          <div className=" flex">
            <h2 className=" m-2"> Featured Image</h2>
            <div className=" flex flex-col">
              <label>
                Width:
                <input
                  {...register("featuredImageWidth")}
                  type="number"
                  className=" m-2 h-10 p-1 w-16 outline-none border border-black"
                ></input>
              </label>
              <label>
                Height:
                <input
                  {...register("featuredImageHeight")}
                  type="number"
                  className=" m-2 h-10 p-1 w-16 outline-none border border-black"
                ></input>
              </label>
            </div>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Permalinks Structure</h2>
            <div className=" flex flex-col">
              <label className=" flex">
                <input
                  {...register("permalinkType")}
                  type="radio"
                  name="permalinkType"
                  value="title"
                ></input>
                <h2 className=" m-2">'https://example.com/post-title/'</h2>
              </label>
              <label className=" flex">
                <input
                  value="id"
                  {...register("permalinkType")}
                  type="radio"
                  name="permalinkType"
                ></input>
                <h2 className=" m-2">'https://example.com/post-id/'</h2>
              </label>
            </div>
          </div>

          <div className="flex">
            <h2 className=" m-2">Dispaly Admin Name on Post List</h2>
            <input {...register("showAdminOnList")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Display Admin Name on Post</h2>
            <input {...register("showAdminOnPost")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Dispaly Date on Post List</h2>
            <input {...register("showDateOnList")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Dispaly Date on Post</h2>
            <input {...register("showDateOnPost")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Display Published Time on Post List</h2>
            <input {...register("showTimeOnList")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Display Published Time on Post</h2>
            <input {...register("showTimeOnPost")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Dispaly Tag on Post</h2>
            <input {...register("showTagOnPost")} type="checkbox"></input>
          </div>

          <div className=" flex">
            <h2 className=" m-2">Dispaly Category on Post</h2>
            <input {...register("showCategoryOnPost")} type="checkbox"></input>
          </div>

          {/*           
          <div>
            <h2></h2>
            <input {...register("")}></input>
          </div>

          
          <div>
            <h2></h2>
            <input {...register("")}></input>
          </div> */}
          <button type="submit" className=" bg-slate-500 p-1 rounded-md m-2">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
