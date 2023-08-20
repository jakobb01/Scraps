import React, {useEffect, useState} from "react";
import axios from "axios";
import Datatable from "./datatable";
const Topurls = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const fetchData = async () => {

            try {
                const response = await axios.get(`/topurls`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1>Top 10 most broken URL's submitted to date:</h1>

            <Datatable data={data} />

        </div>
    );
}

export default Topurls;