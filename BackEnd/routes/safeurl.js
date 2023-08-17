const axios = require('axios');

async function safeurl(url) {
    url = encodeURIComponent(url);
    let data1 = {}
    await axios.get(`https://www.ipqualityscore.com/api/json/url/ph9yrEKrmph64XSx5umJQBiCizXTSclk/${url}`)
        .then(res => data1 = res.data);
    return data1;
}

module.exports = safeurl;