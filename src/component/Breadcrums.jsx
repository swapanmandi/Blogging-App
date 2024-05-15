import React from "react";
import { useLocation } from "react-router-dom";

export default function Breadcrums() {
  const location = useLocation();

  const breadcrums = location.pathname.split("/")[1];
  console.log("bs:", breadcrums);

  return (
    <>
      <div className=" p-2 ml-3 font-serif">
        {breadcrums === "" ? "Home" : `Home/${breadcrums}`}
      </div>
    </>
  );
}
