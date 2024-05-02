import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";

export default function Blog() {
  const { post } = useContext(PostContext);
  const { loading } = useContext(PostContext);
  

  //for pegination

  const [itemPerPage, setItemPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
const [pegiList, setPegiList] = useState([])

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = post.slice(indexOfFirstItem, indexOfLastItem);
 
 

  const handlePegination = (number) =>{

    setCurrentPage(number);
  }


  const totalPages = post.length / itemPerPage;
  const peginatePages = Array.from({length: Math.ceil(totalPages)}, (_, index) => index+1)

useEffect(()=>{
  if(currentPage> 2 && currentPage < totalPages-1){
    setPegiList(peginatePages.slice(currentPage-3, currentPage+2))
  }
  else if(currentPage === 1){
    setPegiList(peginatePages.slice(0, 5))
  }
  else{
    
  }
},[currentPage])
 
  //const displayPegiPage = 
  console.log('pegi', pegiList)

  

  return (
    <>
    <article className=" text-slate-100 h-screen flex flex-col items-center">
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

      <div className=" w-full h-8 bg-red-200 text-red-900 flex justify-center">
       
     {/* {
     Array.from({length: Math.ceil(post.length / itemPerPage)}, (_, index) =>(
            <button key={index+1} onClick={() => handlePegination(index+1)} className=" p-1 font-semibold">{index+1}</button>
          ))
          } */}

          <button onClick={ ()=> handlePegination(currentPage-1)}>Previous</button>

{
  pegiList.map(item => (
    <div>
    <button key={item} className=" p-3" onClick={() => handlePegination(item)}>{item}
    </button>
    
    </div>
  ))
}

<button onClick={ ()=> handlePegination(currentPage+1)}>Next</button>
      </div>
      </article>
    </>
  );
}
