import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export interface Blog {
    content : string;
    title : string;
    id : string;
    createdAt : string;
    author : {
        name : string;
    }
}

export const useBlog = ({id} : {id :string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signup")
        }
        const fetchData = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
      
            setBlog(response.data.blog)
            setLoading(false)
        }

        fetchData();
    }, [id])

    return {
        loading,
        blog
    } 
}



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signup")
        }
        const fetchData = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })

            // console.log(response.data.blogs)
            setBlogs(response.data.blogs)
            setLoading(false)
        }

        fetchData();
    }, [])

    return {
        loading,
        blogs
    }

}

interface User {
    name : string;
    email : string;
    id : string;
    posts : Blog[],
    createdAt? : string
}



export const useId = () => {
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState<string>("");
    
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signup")
        }
        const fetchData = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })

            // console.log(response.data.blogs)
            setId(response.data.id)
            setLoading(false)
        }

        fetchData();
    }, [])


    return {
        id,
        loading
    }

}



export const useProfile = (id:string) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>();
    
    const navigate = useNavigate()
    useEffect(() => {
        // can skip this part 
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signup")
        }
        const fetchData = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/me/${id}`, {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })

            // console.log(response.data.blogs)
            setUser(response.data.user)
            setLoading(false)
        }

        fetchData();
    }, [])

    return {
        user,
        loading
    }

}



// export const userUpdate = () => {

//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState<User>();

//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if(!token){
//             navigate("/signup")
//         }

//         const fetchData = async () => {
//             const response = await axios.put(`${BACKEND_URL}/api/v1/user/change-username`, {
//                 headers : {
//                     "Content-Type" : "application/json",
//                     "Authorization" : `Bearer ${token}`
//                 }
//             })

//             console.log(response.data.user)

//             setUser(response.data.user)
//             setLoading(false)
//         }

//         fetchData();
//     }, []);


//     return {
//         loading,
//         user
//     }

// }