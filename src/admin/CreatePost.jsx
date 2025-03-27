import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PostEditor from "./PostEditor.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  createPost,
  editPost,
  getCategory,
  getEditingPost,
} from "../api/index.js";

export default function CreatePost() {
  const [post, setPost] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  //console.log("sate category", categories);

  useEffect(() => {
    if (id) {
      const editPost = async () => {
        const response = await getEditingPost(id);
        //console.log("data", response.data.data);
        setPost(response.data.data);
      };
      editPost();
    }
  }, [id]);

  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        description: "",
        category: "",
        featuredImage: "",
        status: "active",
      },
    });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        content: post.content,
        description: post.description,
        category: post.category,
        featuredImage: post.featuredImage,
        status: post.status,
      });
      setTagList(post.tags);
    }
  }, [post, reset]);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("status", data.status);
    //console.log(data);
    //console.log("cat len", data.category.length);
    data.category.length > 0
      ? data?.category?.forEach((item, index) => {
          formData.append(`category[${index}]`, item);
        })
      : formData.append("category", data.category);

    tagList.forEach((item, index) => {
      formData.append(`tags[${index}]`, item);
    });

    if (data.featuredImage[0]) {
      formData.append("featuredImage", data.featuredImage[0]);
    }

    // console.log("category:", formData.get("category"));
    // console.log("tags:", formData.get("tags"));

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      if (post) {
        const result = await editPost(id, formData);
        toast(result.data.message);
      } else {
        await createPost(formData);
      }
    } catch (error) {
      console.log("Error submitting post", error);
      toast(error?.message);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => sub.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const addTag = () => {
    const newTag = tag;
    if (!tagList.includes(newTag.trim())) {
      setTagList([...tagList, newTag.trim()]);
    }
    setTag("");
  };

  const removeTag = (tag) => {
    setTagList(tagList.filter((item) => item !== tag));
  };

  useEffect(() => {
    const getCategories = async () => {
      const result = await getCategory();

      setCategories(result.data.data);
    };
    getCategories();
  }, []);

  return (
    <div className=" w-full h-screen flex justify-center">
      <form
        className=" bg-slate-400 flex p-3 flex-col w-8/12 max-h-[80vh] overflow-y-auto"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          label="Title:"
          className="bg-slate-800"
          placeholder="title"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug:"
          className="bg-slate-800"
          placeholder="slug"
          {...register("slug", { required: true })}
        />

        <div className=" mb-2">
          <label className=" pb-3">Content:</label>
          <PostEditor control={control} defaultValue={getValues("content")} />
        </div>

        <Input
          label="Description:"
          className="bg-slate-800"
          placeholder="description"
          {...register("description", { required: true })}
        />

        <label>Categories:</label>

        {categories?.map((item) => (
          <div className=" flex flex-wrap">
            {item.category?.map((item) => (
              <div className=" p-1 m-1 w-fit flex items-center" key={item}>
                <span className=" m-2">{item}</span>
                <Input
                  key={item}
                  type="checkbox"
                  value={item}
                  {...register("category", { required: true })}
                />
              </div>
            ))}
          </div>
        ))}

        <div className=" flex flex-col">
          <label> Tags:</label>
          <div className=" items-center flex">
            <input
              className=" text-black h-fit p-1 rounded-md"
              type="text"
              placeholder="add tags...."
              onChange={handleTagChange}
              value={tag}
            ></input>
            <button
              type="button"
              onClick={addTag}
              className=" p-1 px-2 m-2 rounded-md bg-green-500"
            >
              Add
            </button>
          </div>
        </div>

        <div className=" text-black flex flex-wrap">
          {tagList?.map((tag, index) => (
            <div
              key={index}
              className=" bg-orange-300 flex justify-center items-center w-fit h-fit rounded-sm m-2"
            >
              <span className=" m-1 w-fit px-1">{tag}</span>
              <button
                className=" h-fit flex items-center justify-center p-1 rounded-sm"
                type="button"
                onClick={() => removeTag(tag)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className=" text-red-600 icon icon-tabler icons-tabler-outline icon-tabler-square-letter-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                  <path d="M10 8l4 8" />
                  <path d="M10 16l4 -8" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <Input
          label="Featured Image:"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage")}
        />

        {post && post.featuredImage && (
          <div>
            <img className=" h-80 w-64 mb-2" src={post.featuredImage} alt="" />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status:"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Link to="/admin/dashboard/list">
          <button
            type="button"
            className=" bg-red-500 w-full p-1 rounded-md mb-2"
          >
            Cancel
          </button>
        </Link>
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full rounded-md"
        >
          {post ? "Update" : "Publish"}
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
}
