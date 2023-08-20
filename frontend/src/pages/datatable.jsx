import React, {useEffect, useState} from "react";
import axios from "axios";
const Datatable = (params) => {

    const { data } = params;


    return (
        <div>
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

export default Datatable;
