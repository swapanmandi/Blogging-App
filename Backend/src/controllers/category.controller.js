import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;
  console.log("category:", category);

  if (!category) {
    throw new ApiError(400, "The field is empty");
  }

  const existedCategory = await Category.findOne({
    user: req.user?._id,
  });

  if (existedCategory) {
    if (existedCategory.category.includes(category)) {
      throw new ApiError(400, "The category already exists");
    } else {
      existedCategory.category.push(category);
      await existedCategory.save()
    }
  } else {
    await Category.create({ user: req.user?._id, category: [category] });
  }

  res.status(200).json(new ApiResponse(200, {}, "Category saved successfully"));
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({ user: req.user?._id });

  res
    .status(200)
    .json(new ApiResponse(200, category, "category fetched successfully"));
});

export { createCategory, getCategory };
