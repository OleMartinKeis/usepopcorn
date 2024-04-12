import React, { useState } from "react";
import Movies from "../movies";

function MovieList({ movies, setSelectedId, selectedId }) {
    return (
        <div>
            <ul className="list list-movies">
                {movies?.map((movie) => (
                    <Movies
                        selectedId={selectedId}
                        movie={movie}
                        key={movie.imdbID}
                        setSelectedId={setSelectedId}
                    />
                ))}
            </ul>
        </div>
    );
}

export default MovieList;
