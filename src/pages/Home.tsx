import { db } from "@/config/firebase";
import { getDocs, collection, doc ,deleteDoc} from "firebase/firestore";

import { useEffect, useState } from "react";
//import { AiOutlineLike } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
//import { FcLike } from "react-icons/fc";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
const LikeButton = ()=>{
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };
  return (
    <div className="flex items-center gap-3">
      <AiTwotoneLike
        size={35}
        className="hover:bg-slate-400"
        onClick={toggleLike}
      />
      {isLiked ? <span className="text-blue-700 font-bold">liked</span> : <span className="text-black font-bold">like</span>}
      <span>{likeCount}</span>
    </div>
  );
};

export default function Home() {
  const [cloths, setCloths] = useState([]);
  const productReference = collection(db, "products");
  ////
  const [loading , setloading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  //const navigate = useNavigate()
  async function deleteItem(docId){
  const deletedDoc =  doc(productReference,docId)
  await deleteDoc(deletedDoc)
   setCloths(cloths.filter(cloth=>cloth.id !== docId))
  }
  useEffect(
    () => {
      const allProducts = async () => {
        try {
          setloading(true)
          const data = await getDocs(productReference);
          const filterdData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //console.log(filterdData)
          setCloths(filterdData);
          setloading(false)
        } catch (error) {
          console.error(error);
        }
      };
      allProducts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <section>
     
      <h2 className="text-center font-bold text-black mt-5 uppercase text-lg">
        my products
      </h2>
      <div className="flex flex-col items-center justify-between sm:flex-row flex-wrap">
      {loading?<FaSpinner />:""}
        {cloths.map((item) =>(
        
        
          <div key={item.id} 
          
          className="flex flex-col  mt-20 border rounded-sm w-[250px] h-fit items-center justify-between  hover:bg-teal-300">
            <img
              src={item.image}
              alt="product image"
              className="w-[200px] h-[150px]  mt-2 rounded-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span>{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <CiMoneyBill />
                <span>{item.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{item.description.slice(0,12)}</span>
                <Link to={`/product/${item.id}`} className="text-green-500">see more...</Link>
              </div>

              <div className="flex justify-between gap-2">
                <LikeButton />
                <div className="flex items-center justify-between gap-2">
                  <FaRegComment size={35} className="hover:bg-slate-400" />
                  <span>5</span>
                </div>
              </div>
            </div>
             
          </div>
        
    
        ))}
       
      
      </div>
     
     
    </section>
  );
}

//import React, { useState } from 'react';
/*
const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div>
      <button onClick={toggleLike}>
        {isLiked ? 'Liked' : 'Like'}
      </button>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
*/
