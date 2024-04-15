import React, { useEffect, useState } from "react";
import StarRating from "../rating";

function SelectMovie({ selectedId, setSelectedId }) {
    const [movie, setMovie] = useState({});
    const KEY = "dfc8db77";
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    /* Removes the selected movie */
    function handleCloseMovie() {
        setSelectedId(null);
    }

    /*API call to get movies based on ID. Runs each time the component renders */
    useEffect(
        function () {
            async function getMovieDetails() {
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    return (
        <div className="details">
            <header>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span>
                        {imdbRating} IMDb rating
                    </p>
                </div>
            </header>

            <section>
                <div className="rating">
                    <StarRating maxRating={10} size={24} />
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring: {actors}</p>
                <p>Directed by {director}</p>
            </section>

            <button className="btn-back" onClick={handleCloseMovie}>
                &larr;
            </button>
        </div>
    );
}

export default SelectMovie;
