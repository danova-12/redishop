import {NavLink} from "react-router-dom"
import { FaHome ,FaUser} from 'react-icons/fa';
import Login from "@/pages/auth";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import {auth} from "@/config/firebase"
 import { IoIosAddCircle } from "react-icons/io";

export default function NavBar()
{
async function signout(){
    await signOut(auth);

}

    return(  
        <nav className="flex border-b p-4 h-12 w-full mt-4 bg-white shadow-md justify-between mx-auto items-center sticky top-0 z-30">
           <NavLink to="/" >
             <FaHome size={30} color="black" className="transition duration-300 hover:scale-125"/>

            </NavLink>
            <div className="flex gap-10">
            <NavLink to="/addproduct" className="text-black font-semibold ">
               Addnewproduct 
            </NavLink>
            <NavLink to="/about" className="text-black font-semibold hover:text-green-500">
                about
            </NavLink>
            <NavLink to="/login" className="text-black font-semibold">
               Log In
            </NavLink>
             <Button onClick={signout}>sign out</Button>
           </div>
        </nav>  
        
    )
}