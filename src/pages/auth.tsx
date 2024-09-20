import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {auth,GoogleProvider} from "@/config/firebase"
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth"
import { FaGoogle } from "react-icons/fa";

import { useState } from "react"
const FormSchema = z.object({
    
    
     email: z.string().email({message:"Email is required"}),
    password:z.string().min(6,{message:"at least 6 charcters"})
})
export default function Login(){
   const {register, handleSubmit,formState:{errors}} =useForm<z.infer<typeof FormSchema>>({
    resolver:zodResolver(FormSchema)

   })
 
  // alert(auth.currentUser?.email)
   async function onSubmit({email,password}:z.infer<typeof FormSchema>){
    try{
       await createUserWithEmailAndPassword(auth,email,password)
    }catch(error){
       console.log(error);
    }
}
 //sign in with google
async function signInWithGoogle(){
    try{
        await signInWithPopup(auth,GoogleProvider)
    }catch(error){
      console.log(error)
    }


}

    return(
        <>
        <h2 className="text-center font-bold font-lg text-black uppercase">log in</h2>
        <div className="shadow-lg h-fit  space-y-4 flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 ">
            <div >
            <Label>username</Label>
            <Input type="email" placeholder="email" {...register("email")} />
            {errors.email&& <p className="text-red-500">{errors.email.message}</p>}
            <Label>password</Label>
             <Input type="password" placeholder="password"  {...register("password")}/>
             {errors.password && <p className="text-red-500">{errors.password.message}</p>}
             <Button type="submit">log in</Button>
            </div>
        </form>
       
        <Button variant="outline" onClick={signInWithGoogle} className="m-2">
             <div className="flex gap-3 items-center"><FaGoogle />sign in with Google</div>
             </Button>
         </div>
        </>
    )


}
