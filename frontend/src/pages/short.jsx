import React, {useState} from "react";
import ShortTable from "./shorttable";
import axios from "axios";

const Short = (params) => {
    const [base_url, setBaseUrl] = useState("");
    const { token } = params;

    async function shortUrl() {
        await axios.post("/short", {
            uid: token,
            url: base_url
        }
        ).then((res) => {
            try {
                if (res) {
                    console.log(res.shortUrl);
                    alert("Shortening successful!");
                }
            } catch (err) {
                console.log(err);
                alert("Shortening failed!");
            }
        });
    }

    if (token !== null) {
        return (
            <div>
                <h1>Links shortener!</h1>

                <input type="text" placeholder="link to some long website"
                       value={base_url}
                       onChange={(e) => setBaseUrl(e.target.value)}/>
                <button type="submit" onClick={shortUrl}>Short!</button>

                <h2>Your short links: </h2>

                <ShortTable token={token}/>


            </div>
        );
    } else {
        return (
            <div>
                <h1>Links shortener!</h1>

                <p>Please login to use that feature!</p>
            </div>
        );
    }
}

export default Short;