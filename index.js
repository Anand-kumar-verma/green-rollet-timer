const express = require("express");

const app = express();
const port = 4000;
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
