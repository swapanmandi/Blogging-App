import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function ViewPost() {
    const [viewData, setViewData] = useState([])
useEffect(() => {
      const fetchData = async () => {
        try {
        const response = await axios.get('../backend/')
        setViewData(response.data)
       
    }

  catch(error){
    console.error('data fetching error', error)
  }
}
    fetchData();
  }, [])

  return (
    <>
    <div>ViewPost</div>

    </>
    
  )
}
