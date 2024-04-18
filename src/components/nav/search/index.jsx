import React, { useEffect, useRef, useState } from "react";

function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    /*When we launch the app, you already start in the search bar */
    useEffect(function () {
        inputEl.current.focus();
    }, []);

    return (
        <div>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputEl}
            />
        </div>
    );
}

export default Search;
