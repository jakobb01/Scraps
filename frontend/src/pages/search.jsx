import React from "react";
import '../config';

const Search = () => {
    return (
        <div>
            <h1>Your requested URL: "stmh"</h1>

            <h2>TEST: {global.config.token.testid}</h2>

            <button
                onClick={() => {
                    global.config.token.testid = "testid";}}>{global.config.token.testid}</button>

            <h2>Malicious URL Scanner: </h2>
            <p></p>
            <p>Processing . .. ...</p>

            <h2>Link checker: </h2>
            <p>Processing. .. ...</p>

            <h2>Statistics of the provided url: </h2>
            <p>Processing. .. ...</p>
        </div>
    );
}

export default Search;