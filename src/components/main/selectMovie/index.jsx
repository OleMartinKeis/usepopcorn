import React from "react";

function SelectMovie({ selectedId, setSelectedId }) {
    /* Removes the selected movie */
    function handleCloseMovie() {
        setSelectedId(null);
    }

    return (
        <div className="details">
            <button className="btn-back" onClick={handleCloseMovie}></button>
            {selectedId}
        </div>
    );
}

export default SelectMovie;
