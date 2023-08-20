import React, {useState} from "react";
import ShortTable from "./shorttable";

const Short = () => {
    const [base_url, setBaseUrl] = useState("");

    function shortUrl() {
        console.log(base_url);
    }

    return (
        <div>
            <h1>Links shortener!</h1>

            <input type="text" placeholder="link to some long website"
                   value={base_url}
                   onChange={(e) => setBaseUrl(e.target.value)}/>
            <button type="submit" onClick={shortUrl}>Short!</button>

            <h2>Your short links: </h2>

            <ShortTable />


        </div>
    );
}

export default Short;