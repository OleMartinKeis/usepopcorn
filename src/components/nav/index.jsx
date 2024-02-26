import React, { useState } from "react";
import Search from "./search";
import Logo from "./logo";
import Results from "./results";

function Navbar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
}

export default Navbar;
