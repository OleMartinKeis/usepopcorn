import React, { useState } from "react";
import MovieList from "./movieList";

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {isOpen ? "–" : "+"}
                </button>
                {isOpen && children}
            </div>
        </div>
    );
}

export default Box;
