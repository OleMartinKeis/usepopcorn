import { useEffect, useRef, useState } from "react";
import StarRating from "../rating";
import Loader from "../../loader";
import { useCloseMovie } from "../../../useCloseMovie";

function SelectMovie({ selectedId, onAddWatched, onCloseMovie, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);
    /* Adds an effect to keep count of the times a user has rated movies. */
    useEffect(
        function () {
            if (userRating) countRef.current++;
        },
        [userRating]
    );

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

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    /*Adds a movie to watched list */
    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]),
            userRating,
            countRatingDecisions: countRef.current,
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    /* Closes the movie on the right box */
    function handleClose() {
        onCloseMovie(onCloseMovie);
    }
    /*Listens for a esc btn down, then closes selected movie. Also removes the Event listener after execution for memory performance */
    useCloseMovie("Escape", onCloseMovie);

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

    /*Changes the title of the webpage to the movie title */
    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            return function () {
                document.title = "usePopcorn";
            };
        },
        [title]
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
                            {!isWatched ? (
                                <>
                                    {" "}
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated this movie {watchedUserRating}
                                    <span> ⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
            <button className="btn-back" onClick={handleClose}>
                &larr;
            </button>
        </div>
    );
}

export default SelectMovie;
