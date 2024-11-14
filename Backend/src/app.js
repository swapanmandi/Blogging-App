import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import likeRouter from "./routes/like.route.js";
import commentRouter from "./routes/comment.route.js";
import readLaterRouter from "./routes/readLater.route.js";
import categoryRouter from "./routes/category.routes.js";
import messageRouter from "./routes/message.routes.js";
import settingRouter from "./routes/setting.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

app.use("/api/v1/user", userRoter);
app.use(
  "/api/v1/blog",
  blogRouter,
  likeRouter,
  categoryRouter,
  messageRouter,
  readLaterRouter,
  commentRouter
);
app.use("/api/v1/settings", settingRouter);

export { app };
