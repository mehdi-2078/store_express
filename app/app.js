const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('pretty-error').start();



const AllRoutes = require('./routes');
const app = express();
const dotEnv = require("dotenv");
const connectDB = require("./configs/db");

//*Swagger API
swaggerJsdoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Store Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Mehdi Zarei",
                email: "mehdizarei78@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: [`${__dirname}/routes/*.js`]
}

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
);

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Logger
app.use(logger('dev'));


//* BodyParser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//* Database
connectDB();

//* Load Config
dotEnv.config();
const PORT = process.env.PORT || 3000;

//* Routes
app.use(AllRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404, 'page not found!'));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    //
    // // render the error page
    // res.status(err.status || 500);
    // res.render('error');
});

app.listen(PORT, () =>
    console.log(
        `Server running in mode on port ${PORT}`
    )
);

module.exports = app;
