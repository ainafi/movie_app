import React, { useEffect, useState } from 'react'
import "./App.css"
import MovieCard from './movieCard';

import Image from './search.svg'
// api url
const API_URL='http://www.omdbapi.com?apikey=b7d52b89';
// const movie1={
//   "Poster": "https://m.media-amazon.com/images/M/MV5BYWM0MDI1ZmItZTYzNi00ZWVlLTg5MTctNzllNjY2ZTI3NDhhXkEyXkFqcGdeQXVyNDk5MjA2MQ@@._V1_SX300.jpg",
//   "Title": "Reign of Judges: Title of Liberty - Concept Short",
//   "Type": "movie",
//   "Year": "2018",

// }

const App = () => {
  const [searchTerm , setsearchTerm]=useState('')
  const [movies,setmovies] = useState([])
  const [inputValue,setinputValue]=useState('')
  
 
  useEffect(()=>{
    SearchMovie()
  },[]);

   // fetch data
   const SearchMovie= async (title)=>{
    const response = await fetch( `${API_URL}&s=${title}`)
    const data = await response.json()
    setmovies(data.Search);
  }
  // event key 
  const keydown = (e)=>{
    if (e.key==='Enter') {
     SearchMovie(searchTerm);
      
    }
  } 
  const inputChange= (e)=> setsearchTerm(e.target.value)
 
  return (
    <div className='app' >
      <h1>movie app</h1>
      <div className='search'>
        <input type="text"
        placeholder='search your movie 
        ' 
        value={searchTerm}
        onChange={(e)=>setsearchTerm(e.target.value)}
        onKeyDown={keydown} />

        <img src={Image} alt="search"
        onClick={()=>SearchMovie(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie)=>(
            <MovieCard  movie={movie}/>
          ))}
        </div>
      )  : (
        <div className='empty'>
          <h2>movie not found</h2>
        </div>
      )
      }
    </div>
 )
}

export default App