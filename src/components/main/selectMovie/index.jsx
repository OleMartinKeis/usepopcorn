import React, { useEffect, useState } from "react";

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
    console.log(title, year);

    /* Removes the selected movie */
    function handleCloseMovie() {
        setSelectedId(null);
    }

    /*API call to get movies based on ID. Runs each time the component renders */
    useEffect(function () {
        async function getMovieDetails() {
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(data);
        }
        getMovieDetails();
    }, []);

    return (
        <div className="details">
            <header>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                </div>
            </header>
            <button className="btn-back" onClick={handleCloseMovie}>
                &larr;
            </button>
            {selectedId}
        </div>
    );
}

export default SelectMovie;
