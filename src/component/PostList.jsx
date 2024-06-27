import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostList() {
  //for geting data
  const { posts, loading } = useContext(PostContext);

  const [currDate, setCurrDate] = useState(new Date());

  //for pegination
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [peginateList, setPeginateList] = useState([]);

  const handlePeginate = (number) => {
    setCurrentPage(number);
    console.log("clicked");
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(posts.length / itemPerPage);
  const peginatePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    if (totalPages < 5 || currentPage < 5) {
      setPeginateList(peginatePages.slice(0, 5));
    } else if (currentPage > totalPages - 4) {
      setPeginateList(peginatePages.slice(totalPages - 5, totalPages));
    } else {
      setPeginateList(peginatePages.slice(currentPage - 3, currentPage + 2));
    }
  }, [currentPage, totalPages]);

  return (
    <>
      {loading ? (
        [...Array(5)].map((_, index) => (
          <div
            className= " flex flex-col bg-white dark:bg-slate-950 dark:text-white p-4 text-md m-2 rounded-xl"
            key={index}
          >
            <Skeleton width={324} height={281} />
            <div className="p-3 flex flex-col w-full">
              <Skeleton height={30} width={100} />
              <div className="p-4">
                <Skeleton height={25} width="60%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="40%" />
              </div>
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="40%" />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col lg:items-center">
          {currentItems.map((item) => (
            <Link to={`blogs/${item.id}`} key={item.id}>
              <div className="flex flex-col lg:flex lg:flex-row p-4 text-md m-4 rounded-xl bg-white xs:text-red-500 dark:bg-slate-950 dark:text-white lg:text-green">
                <img
                  className=" w-[324px] h-[281px]"
                  src={`${item.image}`}
                ></img>
                <div className=" lg:flex lg:flex-col p-3">
                  <span className=" flex font-semibold">
                    {item.tags.map(item=>(
                      <h3 className="bg-amber-400 rounded-md p-2 w-fit m-1">{item}</h3>
                    ))}
                  </span>
                  <div className=" p-4">
                    <h1 className=" text-xl font-semibold p-3">{item.title}</h1>
                    <span className=" p-3">
                      📅 {currDate.toLocaleDateString()}
                    </span>
                    <span className="p-3">👨 Admin</span>
                    <span>👍{item.likes?.length}</span>
                <span>↪️{item.shares?.length}</span>
                <span className="p-3">💬 {item.comments?.length}</span>
                  </div>
                  <p>{item.body}</p>
                  <h3 className=" font-semibold">Read More</h3>
                 
                </div>
              </div>
            </Link>
          ))}

          <div className=" w-fit p-2 m-4 dark:text-white">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePeginate(currentPage - 1)}
              className="m-2 font-semibold disabled:text-gray-400"
            >
              {`<<`}Previous
            </button>
            {peginateList.map((item) => (
              <button
                key={item}
                className={`p-2  bg-slate-400 font-semibold m-1 px-3 ${
                  item === currentPage && "text-red-600"
                }`}
                onClick={() => handlePeginate(item)}
              >
                {item}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePeginate(currentPage + 1)}
              className="m-2 font-semibold disabled:text-gray-400"
            >
              Next{`>>`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
