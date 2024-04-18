import React, { useContext} from 'react'
import {PostContext} from '../store/PostContext';


export default function Footer() {
  const {name} = useContext(PostContext);
  return (
    <>
    <div>Footer</div>
<p>:{name}</p>
    </>
  )
}
