import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShortTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get('/short/history/3022884c-4b62-47a7-b110-01e8f4a08b6e');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

 		/* 
            const response = [
                {
                    "uid": "3022884c-4b62-47a7-b110-01e8f4a08b6e",
                    "url": "https://bobbyhadz.com/",
                    "short": "2GV9aIcfz"
                },
                {
                    "uid": "3022884c-4b62-47a7-b110-01e8f4a08b6e",
                    "url": "https://ferrari.com/",
                    "short": "vGxQgkbdk"
                }
            ];
            setData(response);
	    */
        };

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
