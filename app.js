const express = require("express");
const app = express();
const itemRoutes = require("./routes/items")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", itemRoutes);

/* 404 handler */

app.use(function(req, res, next){
    return new ExpressError("Not Found", 404);
})

/* general error handler */

app.use((err, req, res, next) =>{
    res.status(err.status || 500);

    return res.json({
        rerror: err.message,
    });
});

module.exports = app;