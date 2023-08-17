const express = require('express')
const users = express.Router()
//const db = require('./db/database')
const session = require('express-session')

users.use(session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 120
    }
}))

users.get("/login", (req, res) => {
    if(req.session.user) {
        res.send({
            logged: true,
            user: req.session.user
        })
    } else {
        res.send({
            logged: false,
        })
    }
})



// checking authentication
users.post("/login", async (req, res, next) => {

    let username = req.body.username
    let password = req.body.password

    let isUserComplete = username && password

    if(isUserComplete) {
        try {

            let queryResult = await db.authUser(username)

            if(queryResult.length > 0) {
                if(password === queryResult[0].user_password) {
                    req.session.user = queryResult[0]
                    res.json(queryResult[0].user_name)
                    console.log("SESSION VALID")

                } else {
                    console.log("INCORRECT PASSWORD")
                }

            } else {
                console.log("User not registered: " + username)
            }

        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    } else {
        console.log("Please enter your username and password")
    }
    res.end()
})


// registering new users
users.post("/register", async (req, res, next) => {

    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    let isUserComplete = username && email && password

    if(isUserComplete) {

        try {

            let queryResult = await db.addUser(username, email, password)

            if(queryResult.affectedRows) {
                console.log("New user added!")
            }

        } catch {
            errorHandler()
        }

    } else {
        console.log("A field is missing ...")
    }
    // tells the browser that its over to stop the loading
    res.end()
})

function errorHandler() {
    console.log(err)
    res.sendStatus(500)
}

module.exports = users

