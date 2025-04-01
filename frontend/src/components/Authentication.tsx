
import { Navigate } from "react-router-dom"

function Authentication() {
    const token = localStorage.getItem("token");
  
    if(!token){
        return <Navigate to={'/signup'} replace />
    }
  return <Navigate to={'/blogs'} replace />
}

export default Authentication