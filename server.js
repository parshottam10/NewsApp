const express = require('express');
const path = require('path'); // Import path to help with file paths
const app = express();
const PORT = 4000;

// Serve static files (CSS, JS, images) from the root directory
app.use(express.static(__dirname)); // Serve static files from the root directory

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html
});

// Sample data to mimic the API
const newsArticles = [
    {
        id: 1,
        title: "Breaking News",
        image: "https://example.com/image1.jpg",
        date: "2024-10-01",
        time: "10:00 AM",
        paragraph: "This is the content of the first news article."
    },
    {
        id: 2,
        title: "Technology Update",
        image: "https://example.com/image2.jpg",
        date: "2024-10-02",
        time: "2:00 PM",
        paragraph: "This is the content of the second news article."
    },
    // Add more articles as needed
];

// API to fetch news articles
app.get('/api/news', (req, res) => {
    res.json(newsArticles);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
