import React, { useState } from "react";
import Movies from "../movies";

function MovieList({ movies }) {
    return (
        <div>
            <ul className="list">
                {movies?.map((movie) => (
                    <Movies movie={movie} key={movie.imdbID} />
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
