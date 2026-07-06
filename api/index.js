const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/download", async (req, res) => {
try {
const { url } = req.body;

if (!url) {
  return res.status(400).json({
    success: false,
    message: "Instagram URL required"
  });
}

const api = `https://api.agatz.xyz/api/igdl?url=${encodeURIComponent(url)}`;

const response = await axios.get(api);

res.json({
  success: true,
  data: response.data
});

} catch (err) {
res.status(500).json({
success: false,
message: err.message
});
}
});

module.exports = app;
