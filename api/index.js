const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/api/download", async (req, res) => {

  try {

    const { url } = req.body;

    const response = await axios.get(
      `https://api.agatz.xyz/api/igdl?url=${encodeURIComponent(url)}`
    );

    res.json(response.data);

  } catch (e) {

    res.status(500).json({
      error: "Failed"
    });

  }

});

module.exports = app;
