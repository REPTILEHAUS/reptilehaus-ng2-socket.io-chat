'use strict';

let db;
let dbconnection = 'mongodb://localhost';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({
    extended: true
}));

MongoClient.connect(dbconnection, (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3000, () => {
        console.log('MONGODB listening on 3000')
    });
});

function databaseStore(message, timeStamp) {
    let storeData = {
        chatMessage: message,
        timeStamp: timeStamp
    }
    db.collection('chatroom-chats').save(storeData, (err, result) => {
        if (err) {
            return console.log(err);
        }
        console.log('saved to database');
    })
}

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.send('Chat Server');
})


io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        const timeStamp = new Date().getTime();
        io.emit('message', {
            type: 'new-message',
            text: message,
            date: timeStamp
        });
        // Function above that stores the message in the database
        databaseStore(message, timeStamp);
    });

});


http.listen(5000, () => {
    console.log('Server started on port 5000');
});