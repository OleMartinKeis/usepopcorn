import { useState } from "react";
import Navbar from "./components/nav";
import Main from "./components/main";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <Navbar />

            <Main />
        </>
    );
}
