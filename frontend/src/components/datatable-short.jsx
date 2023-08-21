
const DatatableShort = (params) => {
    const { data,fstName, scnName } = params;

    return (
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
                    <td>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.url}
                        </a>
                    </td>
                    <td>
                        <a href={`http://88.200.63.148:5053/short/${item.short}`} target="_blank" rel="noopener noreferrer">
		      		{`http://88.200.63.148:5053/short/${item.short}`}
                        </a>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );



}

export default DatatableShort;
