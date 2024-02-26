import React, { useState } from "react";
import Search from "./search";
import Logo from "./logo";
import Results from "./results";

function Navbar({ movies }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <Results movies={movies} />
        </nav>
    );
}

export default Navbar;
