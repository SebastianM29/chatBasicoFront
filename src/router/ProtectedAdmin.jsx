import { Outlet } from "react-router-dom"
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin"
import { userAuthStore } from "../store/userAuthStore"


export const ProtectedAdmin = () => {
        const{userAuth}=userAuthStore()
  return (
    <>
    {
       userAuth.role === 'admin' && (
        <>
        
        <NavbarAdmin/>
           <Outlet/>
        
        </>  
       )
    }
    
    </>
  )
}
