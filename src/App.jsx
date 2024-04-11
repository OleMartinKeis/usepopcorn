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

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const KEY = "dfc8db77";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    //Fetches API results by search filtering and takes the response in setMovies to display
    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    //Added a loading state in case of slow network
                    setIsLoading(true);
                    /*Resets Error everytime we type in new search */
                    setError("");
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
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
                } catch (err) {
                    console.error(err.message);
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }

            /* Adds a default movie */
            if (!query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }
            fetchMovies();
        },
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
                    {!isLoading && !error && <MovieList movies={movies} />}

                    {/* If there is a error, display error message */}
                    {error && <ErrorMesage message={error} />}
                </Box>
                <Box>
                    <Summary watched={watched} />

                    <WatchedMovieList watched={watched} />
                </Box>
            </Main>
        </>
    );
}
