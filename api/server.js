const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const express = require('express');
const path = require('path');
const logger = require('morgan');
const nocache = require("nocache");
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const connectDB = require('../server/database/connection');
const MongoStore = require('connect-mongo');
const {PORT, MONGO_URI, DB_NAME} = require('../server/env');

const app = express();

const adminRouter = require('../routes/adminRoute');
const userRouter = require('../routes/userRoute');
const homeRouter = require('../routes/homeRoute');
const {handleError, handle404} = require("../server/middleware/handle-error");

// log requests
app.use(logger('dev'));

// mongo db connection
connectDB()
    .then(() => {
        console.log('Database connected')
    });

// nocache
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// parse request to body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(session({
    secret: uuidv4(),
    cookie: {maxAge: 1800000},
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        dbName: DB_NAME,
    })
}));

app.set("view engine", "ejs");
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/home/'),
    path.join(__dirname, 'views/admin/'),
    path.join(__dirname, 'views/user/')
]);

app.use(express.static(path.join(__dirname, "../public")));
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/img", express.static(path.join(__dirname, "../public/img")));
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));
app.use("/assets2", express.static(path.join(__dirname, "../public/assets2")));

// routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/', homeRouter);

// error handler
app.use(handle404);
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = app;