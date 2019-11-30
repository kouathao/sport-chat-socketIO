const express = require("express");
const bodyParser = require("body-parser");
// template engine
const ejs = require("ejs");
const http = require("http");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");

const container = require("./container");

// resolve every module that are added into container.js
container.resolve(function(users) {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    "mongodb+srv://kouathao09:LovingU09@cluster0-kevhp.mongodb.net/test?retryWrites=true&w=majority"
  );

  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000, function() {
      console.log("Listening on port 3000");
    });
    ConfigureExpress(app);

    // setup router with express promise
    const router = require("express-promise-router")();
    users.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app) {
    // add configuration for ejs, socketIO
    app.use(express.static("public"));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    // bodyparser configuration
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(validator());
    app.use(
      session({
        secret: "secretkey",
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      })
    );

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
  }
});
