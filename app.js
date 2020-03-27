const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const uuid = require('uuid');
require('dotenv/config');
const tasks = require('./tasks');
const PORT = process.env.PORT || 3030

mongoose.connect(
    process.env.TMDB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("DB Connection Successful.")
    }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    const Task = mongoose.model('Task', { id: Object, title: String, isComplete: Boolean });
    const newtask = new Task({ id: uuid.v4(), title: 'Rise and shine', isComplete: true });
    newtask.save().then(() => console.log("Initial Task Added."))
});

app.get('/api/tasks', (req, res) => {
    var cursor = db.collection('tasks').find({});
    cursor.toArray((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
})

