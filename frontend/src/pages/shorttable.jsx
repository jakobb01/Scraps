import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShortTable = (params) => {
    const [data, setData] = useState([]);
    const { token } = params;

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const fetchData = async () => {

            try {
                const response = await axios.get(`/short/history/${token}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>URL</th>
                <th>Short</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.url}
                        </a>
                    </td>
                    <td>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.short}
                        </a>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ShortTable;
