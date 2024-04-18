import { useState, useEffect } from "react";

const KEY = "dfc8db77";

function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    //Fetches API results by search filtering and takes the response in setMovies to display
    useEffect(
        function () {
            // callback?.();

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

            fetchMovies();
            /*Everytime there is a new fetch request our keypress will cancel it until the last keypress  */
            return function () {
                controller.abort();
            };
        },
        /* Query as a dependency for the useEffect */
        [query]
    );

    return { movies, error, isLoading };
}

export default useMovies;
