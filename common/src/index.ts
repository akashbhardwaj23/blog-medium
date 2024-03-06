import z from "zod"

export const signUpInput = z.object({
    name : z.string().optional(),
    email : z.string().email(),
    password : z.string()
})


export const signInInput = z.object({
    email : z.string().email(),
    password : z.string().optional()
})


export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
})


export const updateBlogInput = z.object({
    id : z.string(),
    title : z.string(),
    content : z.string()
})

//type inference in zod

export type SignUpInput = z.infer<typeof signUpInput>

export type SignInInput = z.infer<typeof signInInput>

export type CreateBlogInput = z.infer<typeof createBlogInput>

export type UpdateBlogInput = z.infer<typeof updateBlogInput>