import React, {useEffect, useState} from "react";
import Header from "../header";
import axios from "axios";
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

            <table>
                <thead>
                <tr>
                    <th>URL</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.url}</td>
                        <td>{item.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default Topurls;