const mysql = require('mysql2');
require('dotenv').config()

const conn  = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

let dataPool = {}

// USER SEARCH HISTORY

dataPool.getUserHistory = (uid) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM zgodovina WHERE uid = ?`, uid, (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.addUserHistory = (uid, url, score) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO zgodovina (uid, url, score) VALUES (?, ?, ?)`, [uid, url, score], (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

// TOP 10 URLS

dataPool.getTop = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM topurl`, (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.removeTop = (url) => {
    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM topurl WHERE url = ?`, url, (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.addTop = (url, score) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO  topurl (url, score) VALUES (?, ?)`, [url, score], (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

// USER SHORT URLS

dataPool.getUserShort = (uid) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM krajsalnik WHERE uid = ?`, uid, (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.addUserShort = (uid, url, short) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO krajsalnik (uid, url, short) VALUES (?, ?, ?)`, [uid, url, short], (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

// FIND URL FOR SHORT URL

dataPool.findShort = (short) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT url FROM krajsalnik WHERE short = ?`, short, (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

// LOGIN & REGISTER USER

dataPool.authUser = (email) => {
    return new Promise ((resolve, reject) => {
        conn.query(`SELECT * FROM Uporabnik WHERE email = ?`, email, (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}

dataPool.addUser = (num, username, email, password) => {
    return new Promise ((resolve, reject) => {
        conn.query(`INSERT INTO Uporabnik (uid, uporabnisko_ime, email, geslo) VALUES (?, ?, ?, ?)`, [num, username, email, password], (err, res) => {
            if(err) {return reject(err)}
            return resolve(res)
        })
    })
}



// CONNECT TO DATABASE
conn.connect(err => {
    if(err) {
        console.log("ERROR: " + err.message)
        return
    }
    console.log("Connection established")
})


module.exports = dataPool;
