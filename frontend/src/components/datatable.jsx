import React, {useEffect, useState} from "react";
import axios from "axios";
const Datatable = (params) => {

    const { data, fstName, scnName } = params;


    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>{fstName}</th>
                    <th>{scnName}</th>
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
