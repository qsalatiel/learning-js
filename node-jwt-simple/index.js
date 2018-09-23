const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post Created...",
                data: authData
            });
        }
    })
});

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        username: "Salatiel",
        email: "salatielsqueiroz@gmail.com",
        bday: "11/05/1997"
    }
    
    jwt.sign({user}, "secretkey", { expiresIn: "15s" }, (err, token) => {
        res.json({
            token
        });
    });
});

//Format fo Token
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}
app.listen(5000, () => console.log("Server stated on port 5000"));