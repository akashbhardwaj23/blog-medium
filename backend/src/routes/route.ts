import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


// In Hono To define the environment variables you have to use the generic type
const app = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>();


app.use('/api/v1/blog/*', async(c, next) => {
    // get the header
    // verify the header
    // if the header is correct we can proceed
    // if not, we return the user a 403 code
    //@ts-ignore

    const header = c.req.header("authorization") || "";

    const token = header?.split(" ")[1]

    const response = await verify(token, c.env.JWT_SECRET)
    console.log('Middleware')


    if(response.id){
        c.set('userId', response.id)
        await next()
    }
    else {
        c.status(403)
        return c.json({error : "You are not authorized to access this route"})
    }
})






export default app