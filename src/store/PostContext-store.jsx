import axios from "axios";
import { createContext, useState, useEffect } from "react";


  export const PostContext = createContext();


const  PostContextProvider = ({children}) => {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true)


//   useEffect(() =>{
//   const dataFectch = () => {
//     fetch('https://dummyjson.com/posts').then(response =>{
//       if(!response.ok){
//         console.log(error);
//       }
//       return response.json();
//     }).then( data =>{
//       setPost(data.posts);
//       console.log('post data are:',post)
//     })
//   };
//   dataFectch();

// }, []);

useEffect(() =>{
 const fetchData = async () =>{
  try{
  const response = await axios.get('../src/../backend/posts.json');
  setPost(response.data.posts);
 
  setLoading(false);
}
catch{(error) =>{
console.error('There are something wrong to get data.', error);
setLoading(false)
}}};


fetchData();

}, [])


    return(
    <PostContext.Provider value={{post, loading}}>
    {children}
    </PostContext.Provider>
    );
};

export default PostContextProvider;