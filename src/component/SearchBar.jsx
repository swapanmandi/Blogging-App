import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext-store";

export default function SearchBar() {
 
const [searchInput, setSearchInput] = useState("")

  const {searchQuery, setSearchQuery} = useContext(PostContext)

  useEffect(() => {
    const timer = setTimeout(() => {
     setSearchQuery(searchInput)
    }, 1000);

    return () => clearTimeout(timer);

  }, [searchInput]);


 

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </>
  );
}
