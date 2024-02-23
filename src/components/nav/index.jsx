import React, { useState } from "react";
import Search from "./search";
import Logo from "./logo";
import Results from "./results";

function Navbar() {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <Results />
        </nav>
    );
}

export default Navbar;
