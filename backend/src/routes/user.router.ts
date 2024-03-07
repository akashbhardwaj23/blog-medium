import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signUpInput, signInInput } from "@akashbhardwaj23/medium-common";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Don't Initialize prisma at the top because of worker

// c is context
// you will get the environment variables from the context
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const success = signUpInput.safeParse(body);

  if (!success.success) {
    c.status(411);
    return c.json({ error: "Invalid Input" });
  }

  try {
    console.log(body)
    const res = await prisma.user.create({
      data: {
        name: body?.name,
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign({ id: res.id }, c.env.JWT_SECRET);

    console.log(res);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "User already exists" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const success = signInInput.safeParse(body);

  if (!success.success) {
    c.status(411);
    return c.json({ error: "Invalid Input" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(jwt);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "User not found" });
  }
});

export default userRouter;
