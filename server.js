require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http'); // new

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/halilibrahimbilici/contact.html', (req, res) => {
    const filePath = __dirname + '/contact.html';
    res.sendFile(filePath);
});



const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);

// schema

const contactSchema = new mongoose.Schema({
    personal_info:
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        age_decade: Number,
        lang: String,
        location: String
    }
    ,
    region: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// post

app.post('/halilibrahimbilici/contact.html', async (req, res) => {
    const { firstName, lastName, email, decade, language, residence, continent, message } = req.body;



    const personalInfo = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age_decade: decade,
        lang: language,
        location: residence
    };


    try {
        const user = new Contact({
            personal_info: personalInfo,
            region: continent,
            message: message
        });
        await user.save();
        // Send a response to the client
        res.status(200).json({ success: true });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' })
    }


});



//server 

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
