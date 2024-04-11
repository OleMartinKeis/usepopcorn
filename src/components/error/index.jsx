import React from "react";

function ErrorMesage({ message }) {
    return (
        <p className="error">
            <span>😵‍💫</span>
            {message}
        </p>
    );
}

export default ErrorMesage;
