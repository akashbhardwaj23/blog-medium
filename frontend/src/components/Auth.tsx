import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpInput } from "@akashbhardwaj23/medium-common";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuthGoogle } from "../hooks";
import Spinner from "./Spinner";

function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  // component will work but should not do this should define two components for signup and signin
  const navigate = useNavigate()
  const {login, logout, loading, authToken}= useAuthGoogle();

  if(authToken){
    if(localStorage.getItem('token')){
      localStorage.clear();
      localStorage.setItem("token", authToken);
    }else {
      localStorage.setItem("token", authToken);
    }
    navigate('/blogs')
    return null
  }

  async function sendRequest(){
    try {
      const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      )

      const {jwt} = response.data
      localStorage.setItem('token', jwt)
      navigate('/blogs')

    } catch (error) {
      console.log('There is an Error', error)
    }
  }


  if(loading){
    return (
      <div className="h-screen flex flex-col justify-center">
         <div className="flex justify-center">
         <Spinner />
         </div>

      </div>
    )
  }



  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="md:w-[45%]">
          <div>
            <div className="text-4xl font-extrabold">{type === "signup" ? "Create an Account" : "Sign In"}</div>

            <div className="text-slate-400">
             {type === "signup" ? "Already have an account?" : "Don't have an account?"}
              <Link to={type === "signup" ? "/signin": "/signup"} className="pl-2 underline">
                {type === "signup" ? "Login" : "Sign Up"}
              </Link>
            </div>
          </div>

          <div className="pt-4">
          {type === "signup" ?   <LabledInput
              label="Name"
              placeholder="Name"
              onChange={(e) => {
                setPostInputs((c) => {
                  return {
                    ...c,
                    name: e.target.value,
                  };
                });
              }}
            /> : null}

            <LabledInput
              label="Email"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setPostInputs((c) => {
                  return {
                    ...c,
                    email: e.target.value,
                  };
                });
              }}
            />

            <LabledInput
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPostInputs((c) => {
                  return {
                    ...c,
                    password: e.target.value,
                  };
                });
              }}
            />

            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full" onClick={sendRequest}>
             {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="mt-2 w-full">
              {authToken ? <button onClick={logout}className="px-4 py-2 bg-transparent border border-green-600 w-full uppercase text-green-600 font-semibold">Logout</button> : <button onClick={() => login()}className="px-4 py-2 bg-transparent rounded-md border border-green-600 w-full uppercase text-green-600 font-semibold">Login With Google</button>}
        </div>
        </div>
        
      </div>
    </div>
  ); 
}

export default Auth;

interface LabledInputTypes {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabledInput({ label, placeholder, type, onChange }: LabledInputTypes) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        {label}
      </label>
      <input
        className="shadow appearance-none focus:border-blue-500 border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
      />
    </div>
  );
}
