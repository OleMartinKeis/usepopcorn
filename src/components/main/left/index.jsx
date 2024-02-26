import React, { useState } from "react";
import MovieList from "./movieList";

function LeftPanel({ tempMovieData, movies }) {
    const [isOpen1, setIsOpen1] = useState(true);
    return (
        <div>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen1((open) => !open)}
                >
                    {isOpen1 ? "–" : "+"}
                </button>
                {isOpen1 && (
                    <MovieList tempMovieData={tempMovieData} movies={movies} />
                )}
            </div>
        </div>
    );
}

export default LeftPanel;
