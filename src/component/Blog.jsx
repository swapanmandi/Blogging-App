import React, { useContext, useEffect, useState } from 'react'
import {PostContext} from '../store/PostContext';


export default function Blog() {

const {post} = useContext(PostContext);
   
console.log('context',post)
  return (
   <>
   <h3>Following data are coming from Context Api</h3>
  
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
