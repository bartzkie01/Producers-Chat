const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/publicChat', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define MongoDB Schema
const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// API Routes
app.post('/api/messages', (req, res) => {
    const { username, message } = req.body;
    const newMessage = new Message({ username, message });
    newMessage.save()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

app.get('/api/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(messages);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
