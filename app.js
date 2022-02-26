const express = require("express");
const cors = require("cors");
const setupContactRoutes = require("./app/routes/conntact.routes");
const { BadrequestError, errorHandler } = require ("./app/errors")


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });

});

setupContactRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    // code o day se chay khi khong ci route dc dinh nghia nao khop voi yeu cau. goi next() de chuyen sang middleware xu ly loi
    next(new BadrequestError(404, "ReSource not found"));
}) 

// defind error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //middleware xu ly loi tap trung torng cac doan code xu ly cac router, goi next(error) se chuyen ve middlerware xu y loi nay
    errorHandler(error, res)
});
module.exports = app;