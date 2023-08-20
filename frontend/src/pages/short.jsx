import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../components/datatable";

const Short = (params) => {
    const [seed, setSeed] = useState(1);
    const [base_url, setBaseUrl] = useState("");
    const [hdata, setHdata] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = params;

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`/short/history/${token}`);
                setHdata(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [seed]);

    async function shortUrl() {
        setIsLoading(true);
        await axios.post("/short", {
            uid: token,
            url: base_url
        }
        ).then((res) => {
            try {
                if (res) {
                    setData(res);
                }
            } catch (err) {
                console.log(err);
                alert("Shortening failed!");
            } finally {
                setIsLoading(false);
                setSeed(Math.random());
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

                {isLoading && <h2>Loading...</h2>}

                {data.data &&
                <div>
                    <a href={data.data.url}>LONG URL: {data.data.url}</a><br />
                    <a href={data.data.shortUrl}>SHORT URL: {data.data.shortUrl}</a><br />
                </div>
                }

                <h2>Your short links: </h2>

                <Datatable data={hdata} fstName={"LONG URL"} scnName={"SHORT URL"}/>


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