import React, { useState } from "react";
import Summary from "./summary";
import WatchedMovieList from "./watched";

function RightPanel({ tempWatchedData, tempMovieData }) {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);
    return (
        <div>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen2((open) => !open)}
                >
                    {isOpen2 ? "–" : "+"}
                </button>
                {isOpen2 && (
                    <>
                        <Summary watched={watched} />

                        <WatchedMovieList watched={watched} />
                    </>
                )}
            </div>
        </div>
    );
}

export default RightPanel;
