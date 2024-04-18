import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    /*When we launch the app, you already start in the search bar */
    useEffect(
        function () {
            /*Lets you remove all text in the search field with enter. Also lets you press enter anywhere in the app and take you back to the search field and clears it*/
            function callback(e) {
                /*This makes sure you dont delete the text you have already startet on with enter, if your searchbar is in focus*/
                if (document.activeElement === inputEl.current) return;

                if (e.code === "Enter") {
                    inputEl.current.focus();
                    setQuery("");
                }
            }

            document.addEventListener("keydown", callback);
            return () => document.addEventListener("keydown", callback);
        },
        [setQuery]
    );

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
