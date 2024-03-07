import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


interface Blog {
    content : string;
    title : string;
    id : string;
    createdAt : string;
    author : {
        name : string;
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

            console.log(response.data.blogs)
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