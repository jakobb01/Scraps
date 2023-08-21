
const DatatableShort = (params) => {
    const { data,fstName, scnName } = params;
    const shortLink = `http://88.200.63.148:{process.env.CLIENT_PORT}/short/{item.short}`;

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
                        <a href={shortLink} target="_blank" rel="noopener noreferrer">
                            {shortLink}
                        </a>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );



}

export default DatatableShort;
