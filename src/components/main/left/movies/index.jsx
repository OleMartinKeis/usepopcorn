import React from "react";

function Movies({ movie, setSelectedId, selectedId }) {
    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    return (
        <div>
            {/* Gets a movies ID on click */}
            <li onClick={() => handleSelectMovie(movie.imdbID)}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                    <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                    </p>
                </div>
            </li>
        </div>
    );
}

export default Movies;
