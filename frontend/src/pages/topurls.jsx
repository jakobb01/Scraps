import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "../components/datatable";
const Topurls = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`/topurls`);
                const sortedData = response.data.sort((a, b) => b.score - a.score);
                setData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1>Top 10 most broken URL's submitted to date:</h1>

            <Datatable data={data} fstName={"URL"} scnName={"% OF BROKEN LINKS"}/>

        </div>
    );
}

export default Topurls;