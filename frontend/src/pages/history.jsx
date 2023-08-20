import React, {useEffect, useState} from "react";
import Header from "../header";
import axios from "axios";
import Datatable from "./datatable";

const History = (params) => {
    const [data, setData] = useState([]);
    const { token } = params;


    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const fetchData = async () => {

            try {
                const response = await axios.get(`/history/${token}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    if (token !== null) {
    	return (
            <div>
                <h1>Your search history</h1>

                <Datatable data={data} />

            </div>
    	);
    } else {
	return (
	    <div>
                <p>Please login to use that feature!</p>
            </div>
	)
    }
}

export default History;
