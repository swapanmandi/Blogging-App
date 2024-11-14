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
  const [categories, setCategories] = useState([])
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const editPost = async () => {
        const response = await axios.get(
          `${meta.env.VITE_BACKEND_API}/blog/api/editView/${id}`,
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
    formData.append("status", data.status);

    data.category.forEach((item, index) =>{
      formData.append(`category[${index}]`, item);
    })
    tagList.forEach((item, index) => {
      formData.append(`tags[${index}]`, item);
    });

    if (data.featuredImage[0]) {
      formData.append("featuredImage", data.featuredImage[0]);
    }

    console.log("category:", formData.get("category"));
    console.log("tags:", formData.get("tags"));

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      if (post) {
        const result = await axios.put(
          `${meta.env.VITE_BACKEND_API}/blog/post/edit/${id}`,
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
         `${meta.env.VITE_BACKEND_API}/blog/api/createBlog`,
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

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get(`${meta.env.VITE_BACKEND_API}/app/get/category`, {
        withCredentials: true,
      });

      setCategories(result.data.data);
    };
    getCategories();
  }, []);

  return (
    <>
    <div className=" absolute h-12 w-full bg-orange-200">

      <div>
        <ul className=" flex justify-around">
          <li>Save Draft</li>
          <li>Publish</li>
          <li>Score</li>
        </ul>
      </div>

    </div>
      <div className=" bg-red-200  w-full flex mt-16 text-black">
        
          <form
            className="flex w-9/12 p-3 flex-col"
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

            <div>
            
            </div>

            {/* <Select
              label="Category:"
              {...register("category", { required: true })}
              options={["Category1", "Category2", "Category3"]}
            /> */}
{categories?.map( item => (
  <div className=" flex">
    {item.category?.map(item => (
      <div className=" bg-sky-300 p-1 m-1 w-fit flex" key={item}><span className=" m-2">{item}</span>
      <Input key={item} type="checkbox" value={item} {...register("category", {required: true})}/>
      </div>
      
    ))}
    
  </div>
))}
          

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
          <div className=" bg-slate-400 h-full w-1/4">

          </div>
       
        <ToastContainer />
      </div>
    </>
  );
}
