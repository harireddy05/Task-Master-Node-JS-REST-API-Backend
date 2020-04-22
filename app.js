const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uuid = require('uuid');

require('dotenv/config');
const PORT = process.env.PORT || 3030

const jsonParser = bodyParser.json()

app.use(function (req, res, next) {

    // Website to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Requesting methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Requesting headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // To include cookies in the requests sent to the API (if sessions used)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Passing to the next layer of middleware
    next();
});

mongoose.connect(
    process.env.TMDB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("DB Connection Successful.")
    }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    let Task = mongoose.model('Task', { id: Object, title: String, isComplete: Boolean });
    // const newtask = new Task({ id: uuid.v4(), title: 'Rise and shine', isComplete: true });
    // newtask.save().then(() => console.log("Initial Task Added."))
});

app.get('/api/tasks', (req, res) => {
    try {
        // console.log(req)
        let cursor = db.collection('tasks').find({});
        cursor.toArray((err, result) => {
            if (err) throw err;
            res.json(result)
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/addtask', jsonParser, (req, res) => {
    try {
        let Task = mongoose.model('Task');
        let addtask = new Task({ id: uuid.v4(), title: req.body.title, isComplete: req.body.isComplete });
        addtask.save().then(() => {
            let cursor = db.collection('tasks').find({});
            cursor.toArray((err, result) => {
                if (err) throw err;
                // console.log(result)
                res.json(result)
            })
            console.log("Task added.")
        })
    } catch (error) {
        console.log(error)
    }
});

app.post('/deletetask', jsonParser, (req, res) => {
    try {
        const Task = mongoose.model('Task');
        Task.find({ "id": req.body.id }).deleteOne().exec();
        res.send("Task deleted.")
    } catch (error) {
        console.log(error)
    }
});

app.get("/", (req, res) => {
    // console.log(req)
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
});

