import React, { useState } from "react";
import RightMovieList from "../movieList";

function WatchedMovieList({ watched }) {
    return (
        <div>
            <ul className="list">
                {watched.map((movie) => (
                    <RightMovieList key={movie.imdbID} movie={movie} />
                ))}
            </ul>
        </div>
    );
}

export default WatchedMovieList;
