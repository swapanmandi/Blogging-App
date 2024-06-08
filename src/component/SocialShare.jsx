import React, { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
} from "react-share";

export default function SocialShare({ url, title }) {
  const [isShared, setIsShared] = useState(false);

  const handleShareBtn = () => {
    if (!isShared) {
      setIsShared(true);
    } else {
      setIsShared(false);
    }
  };

  return (
    <>
      <div>
        {!isShared ? (
          <button className=" p-1 rounded-md bg-yellow-500 m-3" onClick={handleShareBtn}>SHARE</button>
        ) : (
          <div>
            <FacebookShareButton className=" m-1" url={url} title={title}>
              <FacebookIcon />
            </FacebookShareButton>
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon />
            </LinkedinShareButton>
            <PinterestShareButton url={url} title={title}>
              <PinterestIcon />
            </PinterestShareButton>
            <EmailShareButton url={url} title={title}>
              <EmailIcon />
            </EmailShareButton>
            <TelegramShareButton url={url} title={title}>
              <TelegramIcon />
            </TelegramShareButton>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon />
            </WhatsappShareButton>
            <InstapaperShareButton url={url} title={title}>
              <InstapaperIcon />
            </InstapaperShareButton>
            <RedditShareButton url={url} title={title}>
              <RedditIcon />
            </RedditShareButton>
            <TumblrShareButton url={url} title={title}>
              <TumblrIcon />
            </TumblrShareButton>
            <button className=" float-right bg-slate-500 w-6" onClick={handleShareBtn}>X</button>
          </div>
        )}
      </div>
    </>
  );
}
