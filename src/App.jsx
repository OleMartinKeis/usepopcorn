import { useState } from "react";
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
import useMovies from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const { movies, error, isLoading } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");

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
