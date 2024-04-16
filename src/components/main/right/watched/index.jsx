import React, { useState } from "react";
import RightMovieList from "../movieList";

function WatchedMovieList({ watched, onDeleteWatched }) {
    return (
        <div>
            <ul className="list">
                {watched.map((movie) => (
                    <RightMovieList
                        key={movie.imdbID}
                        movie={movie}
                        onDeleteWatched={onDeleteWatched}
                    />
                ))}
            </ul>
        </div>
    );
}

export default WatchedMovieList;
