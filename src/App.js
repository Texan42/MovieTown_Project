//npm start to start application
import React, { useState, useEffect } from "react";

import MovieCard from "./components/MovieCard";

import './App.css'
import SearchIcon from './search.svg'

//get API key from https://www.omdbapi.com/apikey.aspx
const API_URL = 'http://www.omdbapi.com?apikey=a7bb3f58'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //calls api to search for movies
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search)
    }

    //default search when page loads
    useEffect(() => {
        searchMovies('Kingsman')
    }, [])

    return(
        <div className="app">
            <h1>MovieTown</h1>

            <div className="search">
                <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2> No Movies Found</h2>
                </div>
            )}
        </div>
    )
}

export default App;