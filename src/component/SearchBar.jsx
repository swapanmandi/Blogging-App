import React, { useContext, useEffect, useState } from "react";
import { usePostContext } from "../store/PostContext-store";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const { searchQuery, setSearchQuery } = usePostContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className=" w-full">
      <input
        className=" h-10 w-full bg-slate-300 text-black  rounded-sm outline-none p-2"
        type="text"
        placeholder="search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
