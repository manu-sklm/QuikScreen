// components/Loader.jsx
import React from 'react';
import { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const Loader = () => {
               
  // const nextUrl=useParams();
  // const naviage=useNavigate();

  // useEffect(()=>{
  //    if(nextUrl){
  //      console.log("yes");
  //     setTimeout(()=>{
  //       naviage('/'+nextUrl);
  //     },8000)
  //    }
  // },[])

   return (
    <div className="flex items-center justify-center  min-h-[80vh]">
      <div className="w-14 h-14 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
