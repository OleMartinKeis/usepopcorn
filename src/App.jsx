import { useEffect, useState } from "react";
import Navbar from "./components/nav";
import Logo from "./components/nav/logo";
import Search from "./components/nav/search";
import Results from "./components/nav/results";
import Main from "./components/main";
import WatchedMovieList from "./components/main/right/watched/index";
import Summary from "./components/main/right/summary/index";
import MovieList from "./components/main/left/movieList";
import Box from "./components/main/left";
import Loader from "./components/loader";
import ErrorMesage from "./components/error";
import SelectMovie from "./components/main/selectMovie";

const KEY = "dfc8db77";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    /*Creates a new array if a watched movie is added */
    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    /* Removes the selected movie */
    function handleCloseMovie() {
        setSelectedId(null);
    }

    /*Deletes the already watched movie */
    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    /* Updates everytime the watched array gets updated*/
    useEffect(
        function () {
            /*Stores a new array of watched movies list in local storage to persist through reloads */
            localStorage.setItem("watched", JSON.stringify(watched));
        },
        [watched]
    );

    //Fetches API results by search filtering and takes the response in setMovies to display
    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    //Added a loading state in case of slow network
                    setIsLoading(true);
                    /*Resets Error everytime we type in new search */
                    setError("");
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );
                    //if response is not OK throw error
                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );

                    const data = await res.json();
                    //if Response come back with a False string, throw error
                    if (data.Response === "False")
                        throw new Error("Movie not found");
                    setMovies(data.Search);
                    setError("");
                } catch (err) {
                    console.error(err.message);
                    if (err.name !== "AbortError") {
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            /* if less than three characters in the search field, dont search */
            if (query.length <= 3) {
                setMovies([]);

                setError("");
                return;
            }

            handleCloseMovie();
            fetchMovies();
            /*Everytime there is a new fetch request our keypress will cancel it until the last keypress  */
            return function () {
                controller.abort();
            };
        },
        /* Query as a dependency for the useEffect */
        [query]
    );

    return (
        <>
            <Navbar>
                <Logo />
                {/*Added props to search to get results based on search */}
                <Search query={query} setQuery={setQuery} />
                <Results movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    {/* If loading display Loader */}
                    {isLoading && <Loader />}

                    {/*no isLoading and no error then display movies list*/}
                    {!isLoading && !error && (
                        <MovieList
                            selectedId={selectedId}
                            movies={movies}
                            setSelectedId={setSelectedId}
                        />
                    )}

                    {/* If there is a error, display error message */}
                    {error && <ErrorMesage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <SelectMovie
                            onCloseMovie={handleCloseMovie}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                            setWatched={setWatched}
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
