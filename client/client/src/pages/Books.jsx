import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import "../style.css"

function Books() {
    const [books,setBooks] = useState([])

    useEffect(()=>{
   const fetch = async ()=>{
    try{
     const response = await axios.get("http://localhost:3800/books")
     setBooks(response.data)
    }catch(err){
  console.log(err)
    }
   }
   fetch()
    },[])

    const handleDelete = async (id)=>{
        try{
      await axios.delete("http://localhost:3800/books/" +id)
      window.location.reload()
        }catch(err){
 console.log(err)
        }
    }

  return (
    <div>
        {books.map((book) =>(
            <div className="book" key={book.id}>
           { book.cover && <img src={book.cover} /> }
            <h2>{book.title}</h2>
            <p>{book.des}</p>
            <span>{book.price}$</span>
            <button className='delete' onClick={()=> handleDelete(book.id)}>delete</button>
            <button className='update'> <Link to={`/update/${book.id}`}>update</Link> </button>
            
            </div>
        ))}
        
        <button> <Link to="/add">add a new book</Link> </button>
    </div>
  )
}

export default Books