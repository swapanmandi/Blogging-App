import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PostEditor from "./PostEditor.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function CreatePost() {
  const [post, setPost] = useState(null);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const editPost = async () => {
        const response = await axios.get(
          `http://localhost:3000/blog/api/editView/${id}`,
          {
            withCredentials: true,
          }
        );
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
    formData.append("category", data.category);
    formData.append("status", data.status);
    tagList.forEach((item, index) => {
      formData.append(`tags[${index}]`, item);
    });

    if (data.featuredImage[0]) {
      formData.append("featuredImage", data.featuredImage[0]);
    }

    //console.log("data", formData.get("featuredImage"));

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      if (post) {
        const result = await axios.put(
          `http://localhost:3000/blog/post/edit/${id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast(result.data.message);
      } else {
        await axios.post(
          "http://localhost:3000/blog/api/createBlog",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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

  return (
    <>
      <div className="flex flex-col p-3 text-white">
        <div>
          <form
            className="flex w-9/12 flex-col"
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

            <div>
              <label>Content:</label>
              <PostEditor
                control={control}
                defaultValue={getValues("content")}
              />
            </div>

            <Input
              label="Description:"
              className="bg-slate-800"
              placeholder="description"
              {...register("description", { required: true })}
            />

            <Select
              label="Category:"
              {...register("category", { required: true })}
              options={["Category1", "Category2", "Category3"]}
            />

            <div className="flex">
              <label>
                Tags:
                <input
                  className=" text-black"
                  type="text"
                  placeholder="add tags...."
                  onChange={handleTagChange}
                  value={tag}
                ></input>
              </label>

              <button
                type="button"
                onClick={addTag}
                className=" p-2 m-2 rounded-md bg-lime-500"
              >
                Add
              </button>
            </div>

            <div className=" text-black">
              {tagList?.map((tag, index) => (
                <span key={index} className="">
                  {tag}
                  <Button type="button" onClick={() => removeTag(tag)}>
                    x
                  </Button>
                </span>
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
                <img className=" h-80 w-64" src={post.featuredImage} alt="" />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Status:"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Link to="/admin/dashboard/list">
              <button type="button" className=" bg-green-500 w-full">
                Cancel
              </button>
            </Link>
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
