import { Setting } from "../models/setting.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const setting = asyncHandler(async (req, res) => {
  const {
    siteTitle,
    tagLine,
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
  } = req.body;

  console.log("setting data", req.body);

  // if (
  //   [
  //     siteTitle,
  //     tagLine,
  //     dateFormat,
  //     timeFormat,
  //     maxShowPost,
  //     featuredImageWidth,
  //     featuredImageHeight,
  //     permalinkType,
  //     showAdminOnList,
  //     showAdminOnPost,
  //     showDateOnList,
  //     showDateOnPost,
  //     showTimeOnList,
  //     showTimeOnPost,
  //     showTagOnPost,
  //   showCategoryOnPost
  //   ].some((item) => item === "")
  // ) {
  //   throw new ApiError(400, "all fields are required");
  // }

  let siteIconPath;
  if (
    req.files &&
    Array.isArray(req.files.siteIcon) &&
    req.files.siteIcon.length > 0
  ) {
    siteIconPath = req.files?.siteIcon[0].path;
  }

  const uoloadSiteIcon = await uploadOnCloudinary(siteIconPath);

  const existingSetting = await Setting.findOne();

  if (existingSetting) {
    Object.assign(existingSetting, {
      siteTitle,
      tagLine,
      siteIcon: uoloadSiteIcon?.url || "",
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
    });
    await existingSetting.save();
  } else {
    Setting.create({
      siteTitle,
      tagLine,
      // siteIcon,
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
    });
  }

  res
.status(200)
    .json(new ApiResponse(200, {}, "Settings saved successfully!"));
});


const getSettings = asyncHandler(async(req, res) =>{
  const settings = await Setting.find()
  if(!settings){
    throw new ApiError(400, "Error to fetch settings")
  }

  return res.status(200).json(new ApiResponse(200, settings, "Settimgs fetched successfully."))
})

export { setting, getSettings };
