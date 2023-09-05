const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Use the desired port number (e.g., 3000)
// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));
// Define a route for all other requests to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});