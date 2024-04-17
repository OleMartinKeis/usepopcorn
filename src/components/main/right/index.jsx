import React, { useState } from "react";
import Summary from "./summary";
import WatchedMovieList from "./watched";

function RightPanel() {
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen2((open) => !open)}
                >
                    {isOpen2 ? "–" : "+"}
                </button>
                {isOpen2 && <></>}
            </div>
        </div>
    );
}

export default RightPanel;
