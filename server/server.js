'use strict';

let db
let dbconnection = 'mongodb://reptilehaus_u:reptilehaus_p@ds035026.mlab.com:35026/die-reptil'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(dbconnection, (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('MONGODB listening on 3000')
    })
})


function databaseStore(message) {
    let storeData = { chatMessage: message, timestamp: new Date().getTime() }
    db.collection('chatroom-chats').save(storeData, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
    })
}

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.send('REPTILEHAUS Chat Server')
})




io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
        // Function above that stores the message in the database
        databaseStore(message)
    });

});









http.listen(5000, () => {
    console.log('Server started on port 5000');
});