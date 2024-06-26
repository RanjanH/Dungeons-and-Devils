import express from "express";
import cors from "cors";
import {login} from "../methods/login.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from 'express-session';
import http from 'http';

//const users = require('./methods/users.json');

var server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log('Client IP:', ip);
//     const user = Object.values(users).find(user => user.ip === clientIP);
  
//     if (user) {
//         req.user = user; // Attach user object to request
//     }
//     next();
// });

server.listen(9600, () => {
 console.log("Server running on port 9600");
});

server.get("/", (req, res, next) => {
    res.sendFile(__dirname + "../public/login.html");
});

server.get("/api/test/", (req, res) => {
    res.sendFile(__dirname + '../Classes/bruiser.json', {
        headers: {
            'Content-Type': 'text/javascript'
        }
    });
})

/*
-----------------------------
        Sending Files
-----------------------------
*/ 

/*
-----------------------------
            APIs
-----------------------------
*/ 



server.post("/login", async (req, res, next) => {
    res.json(await login(req.body.uname, req.body.password));
})

server.post("/create-campaign", async (req, res, next) => {
    res.json({'Hello':'World!'});
})

export default server;