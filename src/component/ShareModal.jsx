import { errorMonitor } from "events";
import React, { useState } from "react";

export default function ShareModal({ postUrl, postTitle, onClose }) {
  const [isCopiedURL, setIsCopiedURL] = useState(false);

  const shareURLs = {
    facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
      postTitle
    )}&u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}&text=${encodeURIComponent(postTitle)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      postUrl
    )}&title=${encodeURIComponent(postTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      postTitle + " " + postUrl
    )}`,
  };

  const handleShareClick = (platform) => {
    window.open(shareURLs[platform], "_blank");
  };

  const handleCopyBtn = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsCopiedURL(true);

        setTimeout(() => {
          setIsCopiedURL(false);
          onClose();
        }, 3000);
      })
      .catch(() => {
        console.log("Error to copy", error);
      });
  };

  return (
    <>
      <div className=" bg-orange-300 h-44 w-36 absolute rounded-md">
        <span
          onClick={onClose}
          className=" absolute -right-4 -top-6 bg-red-400 w-6 h-6 items-center flex justify-center rounded-full cursor-pointer"
        >
          X
        </span>
        <div className=" flex flex-col items-start p-3 space-y-2">
          <button className="" onClick={handleCopyBtn}>📋
            {isCopiedURL ? ' Copied' : " Copy"}
          </button>
          <button onClick={() => handleShareClick("facebook")}>ⓕ Facebook</button>
          <button onClick={() => handleShareClick("linkedin")}>LinkedIn</button>
          <button onClick={() => handleShareClick("whatsapp")}>Whatsapp</button>
          <button onClick={() => handleShareClick("twitter")}>𝕏 X</button>
        </div>
      </div>
    </>
  );
}
