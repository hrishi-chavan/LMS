const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './')));

// Serve an index.html as a fallback (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
