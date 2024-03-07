import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@akashbhardwaj23/medium-common"


const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>();



blogRouter.use('/*', async(c, next) => {
    // extract the user id and pass it down to 
    // route handler
    // get the header
    // verify the header
    // if the header is correct we can proceed
    // if not, we return the user a 403 code


    const header = c.req.header("authorization") || "";

    const token = header?.split(" ")[1]


    try {
        const response = await verify(token, c.env.JWT_SECRET)

    if(response.id){

        // this has user id
        c.set("userId", response.id)
        await next();
    }
    else {
        c.status(403)
        return c.json({error : "You are not authorized to access this route"})
    }
    } catch (error) {
          c.status(403)
            return c.json({error : "You are not authorized to access this route"})   
    }
})



blogRouter.post("/", async (c) => {

    const body = await c.req?.json();

    const success = createBlogInput.safeParse(body)

    
    if(!success.success){
        c.status(411)
        return c.json({error : "Invalid Input"})
    }

    const prisma = new PrismaClient(
        {
            datasourceUrl : c.env.DATABASE_URL,
        }
    ).$extends(withAccelerate());

    try {
        const authorId = c.get("userId");

        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : authorId,
            }
        })
        return c.json({id : blog.id})
    } catch (error) {
        c.status(403)
        return c.json({error : "Blog not created"})
    }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();

    const success = updateBlogInput.safeParse(body)

    if(!success.success){
        c.status(411)
        return c.json({error : "Invalid Input"})
    }

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content
            }
        })
    
        return c.json({id : blog.id})
    } catch (error) {
        c.status(403)
        return c.json({error : "Blog not found"})
    }
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select : {
            content : true,
            title : true,
            id : true,
            author : {
                select : {
                    name : true
                }
            }
        }
    });
    console.log(blogs)
    
    return c.json({blogs})
})



// here params is a functions
blogRouter.get("/:id", async (c) => {
    const params = c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

 try {
    const blog = await prisma.post.findUnique({
        where : {
            id : params.id
        }
    })

    return c.json({blog})

 } catch (error) {
    c.status(500)
        console.log(error)
        return c.json({error : "Internal server error"})    
 }
})



export default blogRouter