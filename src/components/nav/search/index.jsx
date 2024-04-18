import { useRef } from "react";
import { useCloseMovie } from "../../../useCloseMovie";

function Search({ query, setQuery }) {
    const inputEl = useRef(null);
    useCloseMovie("Enter", function () {
        /*This makes sure you dont delete the text you have already startet on with enter, if your searchbar is in focus*/
        if (document.activeElement === inputEl.current) return;

        /*When we launch the app, you already start in the search bar */
        inputEl.current.focus();
        setQuery("");
    });

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
