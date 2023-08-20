import React from "react";
import axios from "axios";

const Search = (params) => {
    let { token, uurl, uurldata } = params;

    async function tryAgain() {
        await axios.post("/search/safe", {
            uid: token,
            url: uurl
        }).then((res) => {
            uurldata = res.data;
        });
    }

    async function getLinkCheck() {
        // timeout may be needed
        await axios.post("/search/linkcheck", {
            uid: token,
            url: uurl
        }).then((res) => {
            console.log(res.data);
        });
    }

    if ( uurldata.message === "Success." && uurldata.success) {
        return (
            <div>
                <h1>Your requested URL: {uurl}</h1>

                <div>Domain: {uurldata.domain}</div>
                <div>IP ADDRESS: {uurldata.ip_address}</div>
                <div>Country: {uurldata.country_code}</div>
                <div>Category: {uurldata.category}</div>
                {uurldata.adult ? <div>Adult content on website: YES</div> : <div>Adult content on website: NO</div>}

                <h2>Malicious URL Scanner: </h2>

                <div>Overall saftey score: {uurldata.risk_score}</div>
                {uurldata.dns_valid ? <div>DNS valid: YES</div> : <div>DNS valid: NO</div>}
                {uurldata.malware ? <div>Malware: YES</div> : <div>Malware: NO</div>}
                {uurldata.phishing ? <div>Phishing: YES</div> : <div>Phishing: NO</div>}
                {uurldata.spamming ? <div>Spamming: YES</div> : <div>Spamming: NO</div>}

                {uurldata.redirected ? <div>Redirected: YES</div> : <div>Redirected: NO</div>}


                
                <button onClick={getLinkCheck}>Check for broken links on website</button>
                <h2>Link checker: </h2>

            </div>
        );
    } else {
        return (
            <div>
                <h1>Error: Couldn't get data on that URL!</h1>

                <button onClick={tryAgain}>Try again</button>

            </div>
        );
    }
}

export default Search;