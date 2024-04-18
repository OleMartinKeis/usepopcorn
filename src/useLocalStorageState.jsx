import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
    /* This gets the watched array from localstorage or creats an empty one if localstorage is empty */
    const [value, setValue] = useState(function () {
        const storedValue =
            JSON.parse(localStorage.getItem(key)) || initialState;
        return storedValue;
    });

    /* Updates everytime the watched array gets updated*/
    useEffect(
        function () {
            /*Stores a new array of watched movies list in local storage to persist through reloads */
            localStorage.setItem("watched", JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
