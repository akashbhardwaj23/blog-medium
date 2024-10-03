import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import {useGoogleLogin, googleLogout, TokenResponse} from "@react-oauth/google"
import { useStore } from "../state/store";


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

export const useAuthGoogle = () => {
    const [loading, setLoading] = useState(false);
    const [credencial, setCredential] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri">>();
    const [authToken, setAuthToken] = useState<string>();

    const login = useGoogleLogin({
        onSuccess : async (response) => setCredential(response),
        onError : async (error) => console.log(error)
    })


    useEffect(() => {
        if(credencial){
            setLoading(true)
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credencial.access_token}`, {
                headers: {
                    Authorization: `Bearer ${credencial.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then(async(res) => {
                const {email, name, id} = res.data
                let requestFailed = false;
                    try {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {email, name , password: id});
                        setAuthToken(response.data.jwt);
                        console.log(response.status)
                    } catch (error) {
                        requestFailed = true;
                        console.log("This is Error", error)
                    }

                    if(requestFailed){
                        const anotherResponse = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {email, password: id});
                        setAuthToken(anotherResponse.data.jwt);
                    }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false)
            });
        }
    }, [credencial])


    const logout = () => {
        googleLogout();
        //@ts-ignore
        setUserProfile(null)
    }

    return {
        loading,
        login,
        logout,
        authToken
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


export function useTheme(){
    
    const theme = useStore((state) => state.theme)
    const setTheme = useStore(state => state.setTheme)

    useEffect(() => {
        console.log("Theme in useEffect is ", theme)
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme)
        
    }, [theme])

    return {
        theme,
        setTheme
    }
}

