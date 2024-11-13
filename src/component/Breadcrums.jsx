import React from "react";
import { useLocation } from "react-router-dom";

export default function Breadcrums() {
  const location = useLocation();

  const breadcrums = location.pathname.split("/")[1];
  //console.log("bs:", breadcrums);

  return (
    <>
      <div className=" p-1 ml-3 font-serif dark:text-white">
        <span className=" text-xs">{breadcrums === "" ? "Home" : `Home/${breadcrums}`}</span>
      </div>
    </>
  );
}
