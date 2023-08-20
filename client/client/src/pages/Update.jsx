import axios from 'axios'
import React, { useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"



function Update() {
    const [book,setBook] = useState({
        title:"",
        des:"",
        price:null,
        cover:"",
    })

    const handleChange = (e)=>{
      setBook((prev)=>({ ...prev,[e.target.name]:e.target.value}))
    }


    const navigate = useNavigate()
const location = useLocation()

console.log(location.pathname.split("")[2])

const bookId = location.pathname.split("/")[2];

    const handleAdd = async e=>{
        e.preventDefault();
        try{
        await axios.put("http://localhost:3800/books/"+bookId,book);
        navigate("/")
        }catch(err){
         console.log(err)
        }
    }

  return (
    <div>
     <h1>add a new book</h1>
     <input type="text" placeholder='title' onChange={handleChange} name='title' />
     <input type="text" placeholder='desc' onChange={handleChange} name='des' />
     <input type="number" placeholder='price' onChange={handleChange} name='price' />
     <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
     <button onClick={handleAdd}>add</button>
    </div>
  )
}

export default Update