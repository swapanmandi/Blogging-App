import React, { useContext, useEffect, useState } from "react";
import { usePostContext } from "../store/PostContext-store";

export default function Blog() {
  
  const { posts, loading } = usePostContext();

  //for pegination

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pegiList, setPegiList] = useState([]);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePegination = (number) => {
    setCurrentPage(number);
  };

  const totalPages = Math.round(posts.length / itemPerPage);
  const peginatePages = Array.from(
    { length: Math.ceil(totalPages) },
    (_, index) => index + 1
  );

  useEffect(() => {
    if (currentPage > 2 && currentPage < totalPages) {
      setPegiList(peginatePages.slice(currentPage - 3, currentPage + 2));
    } else if (currentPage === 1) {
      setPegiList(peginatePages.slice(0, 5));
    }
  }, [totalPages, currentPage]);


  return (
    <>
      <article className=" dark:text-slate-100 h-screen flex flex-col items-center">
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

        <div className=" w-full h-8 bg-red-200 text-red-900 flex justify-center font-semibold">
          <button
            className=" disabled:text-gray-400"
            onClick={() => handlePegination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>

          {pegiList.map((item) => (
            <div className=" text-center flex  items-center"  key={item}>
              <button
               
                className={`p-3 text ${
                  item === currentPage && "text-amber-600"
                }`}
                onClick={() => handlePegination(item)}
              >
                {item}
              </button>
            </div>
          ))}

          <button
            className=" disabled:text-gray-400"
            onClick={() => handlePegination(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </article>
    </>
  );
}
