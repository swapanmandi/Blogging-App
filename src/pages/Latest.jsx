import React, { useContext} from 'react'
import { PostContext } from '../store/PostContext-store'
import { Link } from 'react-router-dom';

export default function Latest() {
    const {posts} = useContext(PostContext);
    const {loading} = useContext(PostContext)
    
  return (
    <>
    
    <div>Latest</div>
    <div className=' m-2 items-center flex-col flex lg:grid lg:grid-cols-3'>
        {
            posts.map(item=>(
                <Link to={`/latest/${item.id}`}>
                <div className=' bg-gray-400 w-96 h-96 flex justify-center flex-col items-center m-1 flex-wrap '  key={item.id}>
                <img className=' w-48 h-56' src={item.image} alt='this is img'></img>
                <h3 className=" font-semibold">{item.title}</h3>
                <p>{item.tags}</p>
                
            </div>
            </Link>
            ))
        }

    </div>
    </>
  )
}
