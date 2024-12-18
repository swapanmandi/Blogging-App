import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// generate access and refresh Tokens

const generateAccessTokenAndrefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Went Wrong while generating token");
  }
};

//user signup

const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((item) => item.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User is already existed.");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Error while registering user.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully!"));
});

//admin signup

const signupAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((item) => item.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User is already existed.");
  }

  const user = await User.create({ fullName, email, role: "admin", password });

  const createdUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );
  if (!createdUser) {
    throw new ApiError(400, "Error to register.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Created Successfully."));
});

// login

const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email, role: "user" });

  if (!user) {
    throw new ApiError(401, "User does not exist.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(500, "User details are invalid");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndrefreshTokens(user._id);

  const signedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!signedinUser) {
    throw new ApiError(500, "User logging error");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    //secure: false,
    sameSite: "None",
  };
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: signedinUser, accessToken, refreshToken },
        "User Loggedin successfully."
      )
    );
});

//admin login

const adminSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields are Required");
  }

  const user = await User.findOne({ email, role: "admin" });

  if (!user) {
    throw new ApiError(400, "User does not find");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Credentials are incorrect.");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndrefreshTokens(user._id);

  const signedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!signedInUser) {
    throw new ApiError(400, "Error to signin");
  }

  const options = {
    httpOnly: true,
    //secure: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: signedInUser, accessToken, refreshToken },
        "user signed successfully"
      )
    );
});

// logout

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(
      new ApiResponse(200, { role: req.user?.role }, "User logout successfully")
    );
});

// add profile pic

const setAvatarImage = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar[0].path;

  console.log("avatar", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is Missing.");
  }
  const uploadAvatr = await uploadOnCloudinary(avatarLocalPath);
  if (!uploadAvatr) {
    throw new ApiError(400, "Error to upload avatar.");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: uploadAvatr.url || "",
      },
    },
    { new: true }
  ).select(" -password -refreshToken -role");

  // console.log("url", uploadAvatr.url)
  // console.log(user)

  res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar uploaded successfully."));
});

//fetch user profile

const getProfile = asyncHandler(async (req, res) => {
  //const user = await User.findById(req.user._id).select("-refreshToken -password");

  if (req.user.role === "user")
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User fetched Successfully."));
});

// fetch admin profile
const fetchAdminProfile = asyncHandler(async (req, res) => {
  if (req.user.role === "admin")
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Admin profile fetched successfully.")
      );
});

//protected Route

const protectedRoute = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(400, "You are not Authenticated.");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { status: true, role: req.user?.role },
          "You are Authenticated"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Error to validate Authentication");
  }
});

//refresh accessToken

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Access - No fresh Token getting");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "Non user-Invalid refreshToken");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh Token is Expired or Used.");
    }

    const options = {
      httpOnly: true,
      secure: false,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndrefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access Token is refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message,
      "inValid Refresh Token for refreshing"
    );
  }
});

//update Acc Info

const updateAccount = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required.");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    {
      new: true,
    }
  ).select(" -password -role -refreshToken");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Account updated Successfully."));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required.");
  }

  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Password is inValid.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password is successfully changed."));
});

const getUserDashboardData = asyncHandler(async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: "user" });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          usersCount,
          "user dashboard count fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Error to fetch user dashboard count or internal error",
      error
    );
  }
});

export {
  signupUser,
  signupAdmin,
  setAvatarImage,
  getProfile,
  signinUser,
  adminSignin,
  logoutUser,
  refreshAccessToken,
  updateAccount,
  protectedRoute,
  changePassword,
  fetchAdminProfile,
  getUserDashboardData
};
