import { useEffect } from "react";
/*Listens for a esc btn down, then closes selected movie. Also removes the Event listener after execution for memory performance */
export function useCloseMovie(key, action) {
    useEffect(
        function () {
            function callback(e) {
                if (e.code.toLowerCase() === key.toLowerCase()) {
                    action();
                }
            }
            document.addEventListener("keydown", callback);
            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [action, key]
    );
}
