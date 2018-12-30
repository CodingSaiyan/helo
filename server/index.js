require('dotenv').config();

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      AuthCtrl = require('./controller');

app.use(bodyParser.json());

const { APP_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Hell DB connected!!')
})

//endpoints
app.post('/api/register', AuthCtrl.register);
app.post('/api/login', AuthCtrl.login);




app.listen(APP_PORT, () => {console.log(`Running at ${APP_PORT} MPH!`)});