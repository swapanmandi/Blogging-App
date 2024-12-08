import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        localStorage.clear();
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

const signupUser = (data) => {
  return apiClient.post("/user/signup", data);
};

const signinUser = (data) => {
  return apiClient.post("/user/signin", data);
};

const signupAdmin = (data) => {
  return apiClient.post("/user/admin/signup", data);
};

const signinAdmin = (data) => {
  return apiClient.post("/user/admin/signin", data);
};

const signoutUser = () => {
  return apiClient.post("/user/signout");
};

const getUserProfile = () => {
  return apiClient.get("/user/profile");
};

const getAdminProfile = () => {
  return apiClient.get("/user/admin/profile");
};

const blogs = () => {
  return apiClient.get("/blog/list");
};
const createComment = (postId, comment) => {
  return apiClient.post(`/blog/post/comment/${postId}`, { content: comment });
};

const getComment = (postId) => {
  return apiClient.get(`/blog/post/comments/${postId}`);
};

const getTrendPosts = () => {
  return apiClient.get("/blog/trending-posts");
};

const getPopularPosts = () => {
  return apiClient.get("/blog/popular-posts");
};

const getSavedPosts = () => {
  return apiClient.get("/blog/posts/saved-posts");
};

const changePassword = (data) => {
  return apiClient.post("/user/password-change", data);
};

const userProfileUpdate = (data) => {
  return apiClient.post("/user/account-update", data);
};

const avatarUpdate = (data) => {
  return apiClient.post("/user/avatar", data);
};

const getSetting = () => {
  return apiClient.get("/settings/get-settings");
};

const addCategory = (data) => {
  return apiClient.post("/blog/create/category", data);
};

const getCategory = () => {
  return apiClient.get("/blog/get/category");
};

const publishedPosts = () => {
  return apiClient.get("/blog/allPostList");
};

const deletePost = (id) => {
  return apiClient.delete(`/blog/delete/${id}`);
};

const createPost = (data) => {
  return apiClient.post("/blog/createBlog", data);
};

const getEditingPost = (id) => {
  return apiClient.get(`/blog/editView/${id}`);
};

const editPost = (id, formData) => {
  return apiClient.put(`/blog/post/edit/${id}`, formData);
};

const getDraftPost = () => {
  return apiClient.get("/blog/draftpost");
};

const getUserDashboardCount = () => {
  return apiClient.get("/user/users-count");
};

const getBlogDashboardCount = () => {
  return apiClient.get("/blog/blogs-count");
};

const getCommentDashboardCount = () => {
  return apiClient.get("/blog/comments-count");
};

export {
  blogs,
  signupUser,
  signinUser,
  signupAdmin,
  signinAdmin,
  signoutUser,
  createComment,
  getComment,
  getTrendPosts,
  getSavedPosts,
  changePassword,
  getUserProfile,
  userProfileUpdate,
  avatarUpdate,
  getPopularPosts,
  getSetting,
  getAdminProfile,
  addCategory,
  getCategory,
  createPost,
  getEditingPost,
  editPost,
  getDraftPost,
  publishedPosts,
  deletePost,
  getUserDashboardCount,
  getBlogDashboardCount,
  getCommentDashboardCount,
};
