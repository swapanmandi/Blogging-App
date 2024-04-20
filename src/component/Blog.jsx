import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext";

export default function Blog() {
  const { post } = useContext(PostContext);
  const { loading } = useContext(PostContext);
  

  //for pegination

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);
 
  console.log(currentItems)

  const handlePegination = (number) =>{

    setCurrentPage(number);
  }
  console.log(post.length);

  const totalPages = post.length / itemPerPage;

  return (
    <>
    <div className=" text-slate-100 w-full min-h-screen flex flex-col items-center">
      <h3>Following data are coming from Context Api</h3>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul className="">
          {currentItems.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}

      <div className=" w-full h-8 bg-slate-200 text-red-900 flex justify-center">
       
     {
     
     Array.from({length: Math.ceil(post.length / itemPerPage)}, (_, index) =>(
            <button key={index+1} onClick={() => handlePegination(index+1)} className=" p-1 font-semibold">{index+1}</button>
          ))
          
          }
          
      </div>
      </div>
    </>
  );
}
