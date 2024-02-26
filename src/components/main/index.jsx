import React, { useState } from "react";
import LeftPanel from "./left";
import RightPanel from "./right";

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

function Main({ movies, tempMovieData }) {
    return (
        <div>
            <main className="main">
                <LeftPanel tempMovieData={tempMovieData} movies={movies} />
                <RightPanel
                    tempWatchedData={tempWatchedData}
                    movies={movies}
                    tempMovieData={tempMovieData}
                />
            </main>
        </div>
    );
}

export default Main;
