import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {collection,deleteDoc,doc, getDoc} from "firebase/firestore"
import { db } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function ProductDetail(){

    const {id} = useParams();
   
    const [document, setDocument] = useState({});
   const navigate = useNavigate()

   useEffect(()=>{
      const fetchDocument = async()=>{
        const docRef = doc(db,"products",id)
        const docSnap = await getDoc(docRef)
        setDocument({id:docSnap.id,...docSnap.data()})



      }
    fetchDocument();
   }
   
   ,[id])

   async function deleteDOcument(){
    const docRef = doc(db,"products",id)
    await deleteDoc(docRef)
    navigate("/")
   }

    return(
        <div className=" flex-col w-[500px]  mx-[100px] border items-center overflow-hidden inline-block ">
            <h2 className="font-bold text-lg uppercase text-center">{document.title}</h2>
            <img src={document.image}  className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:translate-y-[-10px]"/>
            <p>{document.description}</p>
            <Button onClick={deleteDOcument}>delete</Button>

        </div>

    )
}