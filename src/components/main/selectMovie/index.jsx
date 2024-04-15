import React, { useEffect, useState } from "react";
import StarRating from "../rating";
import Loader from "../../loader";

function SelectMovie({
    selectedId,
    setSelectedId,
    onAddWatched,
    onCloseMovie,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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

    /*Adds a movie to watched list */
    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]),
        };
        onAddWatched(newWatchedMovie);
    }

    function handleClose() {
        onCloseMovie(onCloseMovie);
    }

    /*API call to get movies based on ID. Runs each time the component renders */
    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
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
                            <button className="btn-add" onClick={handleAdd}>
                                + Add to list
                            </button>
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
            <button className="btn-back" onClick={onCloseMovie}>
                &larr;
            </button>
        </div>
    );
}

export default SelectMovie;
