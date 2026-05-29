const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const user = require("./controllers/user");
const Service = require("./controllers/Services");
const query =  require("./controllers/querry");

app.use("/api/v1/query",query);
app.use("/api/v1/admin",user);
app.use("/api/v1/services",Service);

module.exports = app;