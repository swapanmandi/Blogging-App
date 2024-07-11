import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

// signup

const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log(fullName);

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

// login

const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

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
    secure: false,
  };
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(new ApiResponse(200, signedinUser, "User Loggedin successfully."));
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
    .json(new ApiResponse(200, {}, "User logout successfully"));
});


//protected Route

const protectedRote = asyncHandler(async(req, res) =>{
  try {

    res
    .status(200)
    .json(
      new ApiResponse(200, {}, "You are Authenticated")
    )
  } catch (error) {
    throw new ApiError(500, "Error to validate Authentication")
  }
})

export { signupUser, signinUser, logoutUser, protectedRote };
