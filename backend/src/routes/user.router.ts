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

userRouter.post("/googleIn", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);

  // check if the user exist
  // const user = await prisma.user.findFirst({

  // })

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: "sggd",
    },
  });

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  c.status(200);
  return c.json({ user, jwt });
});

// Don't Initialize prisma at the top because of worker

// c is context
// you will get the environment variables from the context
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log(c.env.DATABASE_URL);

  console.log(prisma);
  const body = await c.req.json();

  console.log(body);
  const success = signUpInput.safeParse(body);

  if (!success.success) {
    c.status(411);
    return c.json({ error: "Invalid Input" });
  }

  // check the user if it is there

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    c.status(401);
    return c.json({ error: "User already exists" });
  }

  const res = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  console.log(res);

  const jwt = await sign({ id: res.id }, c.env.JWT_SECRET);

  console.log(res);
  return c.json({ jwt });
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

userRouter.use("/*", async (c, next) => {
  // extract the user id and pass it down to
  // route handler
  // get the header
  // verify the header
  // if the header is correct we can proceed
  // if not, we return the user a 403 code

  const header = c.req.header("authorization") || "";

  const token = header?.split(" ")[1];

  console.log(token);
  try {
    const response = await verify(token, c.env.JWT_SECRET);

    if (response.id) {
      // this has user id
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "You are not authorized to access this route" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ error: "You are not authorized to access this route" });
  }
});

userRouter.put("/change-username", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("here");

  const { username } = await c.req.json();

  console.log(username);

  if (!username) {
    c.status(403);
    return c.json({ error: "Invalid Input" });
  }
  try {
    const id = c.get("userId");

    if (!id) return c.json({ error: "User not found" });

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: username,
      },

      select: {
        name: true,
        id: true,
        posts: true,
        createdAt: true,
        email: true,
      },
    });

    c.status(200);
    return c.json({ user });
  } catch (error) {
    c.status(501);
    return c.json({ message: "Error at Change UserName" });
  }
});

userRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.get("userId");
    console.log(id);

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select : {
        name : true,
        id : true,
        email : true
      }
    });
    c.status(200);
    return c.json({ user });
  } catch (error) {
    c.status(404);
    return c.json({ error: "Id not found" });
  }
});

userRouter.get(`/me/:id`, async (c) => {
  const { id } = c.req.param();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        id: true,
        posts: true,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "User not found" });
    }

    return c.json({ user });
  } catch (error) {
    c.status(404);
    return c.json({ error: "User not found" });
  }
});

export default userRouter;
