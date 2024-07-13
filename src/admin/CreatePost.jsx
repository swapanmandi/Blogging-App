import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PostEditor from "./PostEditor.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CreatePost() {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const editPost = async (req, res) => {
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
  }, [id]);

  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        description: "",
        category: "",
        //featuredImage: "",
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
    //formData.append("tags", JSON.stringify(data.tags));
    if (data.featuredImage[0]) {
      formData.append("featuredImage", data.featuredImage[0]);
    }

    console.log("data", formData.get("featuredImage"));

    const blogData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      content: formData.get("content"),
      category: formData.get("category"),
      featuredImage: formData.get("featuredImage"),
      status: formData.get("status"),
    };

    try {
      if (post) {
        await axios.put(`http://localhost:3000/blog/api/edit/${id}`, blogData, {
          withCredentials: true,
        });
      } else {
        await axios.post(
          "http://localhost:3000/blog/api/createBlog",
          blogData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data"
            }
           }
        );
      }
    } catch (error) {
      console.log("Error submitting post", error);
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

  //   const addTag = (tag) => {
  //     tag.preventDefault()
  //     if (tag && !tags.includes(tag.trim())) {
  //       setTags([...tags, tag.trim()]);
  //     }
  //   };

  // const removeTag = (tag) => {
  //   const currentTags = getValues("tags");
  //   setValue(
  //     "tags",
  //     currentTags.filter((item) => item !== tag)
  //   );
  // };

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

            {/* <div>
              <label>Tags:</label>
              <div className="flex">
                <Input type="text" name="tags" className="flex-1"{...register ("tags")} />
                <Button type="button" onClick={addTag}>Add</Button>
              </div>
            </div>

            <div>
              {getValues("tags").map((tag) => (
                <span key={tag} className="">
                  {tag}
                  <Button type="button" onClick={() => removeTag(tag)}>
                    x
                  </Button>
                </span>
              ))}
            </div> */}

            <Input
              label="Featured Image:"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("featuredImage")}
            />

            {/* {post && post.image && (
              <div>
                <img src={post.image} alt="" />
              </div>
            )} */}

            <Select
              options={["active", "inactive"]}
              label="Status:"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
