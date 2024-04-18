import React, { useEffect, useState } from 'react'


export default function Blog() {

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
      console.log('data are:',post)
    })
  };
  dataFectch();

}, []);
    

  return (
   <>
   <ul>
   {
    post.map(item =>(
      <li key={item.id}>{item.quote}</li>
    ))
   }
   </ul>
   </>
  )
}
