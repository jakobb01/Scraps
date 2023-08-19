import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Search = (props) => {
    const [data1, setData1] = useState({});
    const { state } = useLocation();
    const { data } = state;

    function getData(da) {
        console.log(da);
        setData1(da);
    }

    return (
        <div>
            <h1>Your requested URL: "stmh"</h1>

            <div>{data}</div>

            <h2>Malicious URL Scanner: </h2>
            <p></p>
            <p>Processing . .. ...</p>

            <h2>Link checker: </h2>
            <p>Processing. .. ...</p>

            <h2>Statistics of the provided url: </h2>
            <p>Processing. .. ...</p>
        </div>
    );


}

export default Search;