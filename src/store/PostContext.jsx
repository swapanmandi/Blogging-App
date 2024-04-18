import { createContext, useState, useEffect } from "react";


  export const PostContext = createContext();


const  PostContextProvider = ({children}) => {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() =>{
  const dataFectch = () => {
    fetch('https://dummyjson.com/quotes').then(response =>{
      if(!response.ok){
        console.log(error);
      }
      return response.json();
    }).then( data =>{
      setPost(data.quotes);
      console.log('post data are:',post)
    })
  };
  dataFectch();

}, []);

    return(
    <PostContext.Provider value={{post}}>
    {children}
    </PostContext.Provider>
    );
};

export default PostContextProvider;