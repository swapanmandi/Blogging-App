import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PostEditor from "./PostEditor.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import axios from "axios";

export default function CreatePost({ post }) {
  


  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      description: post?.description || "",
      category: post?.category || "",
      image: post?.image || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("category", data.category);
    //formData.append("tags", JSON.stringify(data.tags));
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (post) {
        await axios.put(`http://localhost:8000/updatePost/${post.id}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post("http://localhost:8000/createPost", formData, {
          withCredentials: true,
        });
      }
    } catch (error) {
      console.log("Error submitting post", error);
    }

    console.log(data)
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
          <form className="flex w-9/12 flex-col" onSubmit={handleSubmit(submit)}>
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
              {...register("image", { required: !post })}
            />

            {post && post.image && (
              <div>
                <img src={post.image} alt="" />
              </div>
            )}

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
