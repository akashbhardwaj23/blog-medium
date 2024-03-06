import { Hono } from "hono";
import userRouter from "./routes/user.router";
import blogRouter from "./routes/blog.router";

const app = new Hono()


app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)




export default app;