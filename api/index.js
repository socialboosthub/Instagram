const express = require("express");
const { instagramGetUrl } = require("instagram-url-direct");

const app = express();

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

    const data = await instagramGetUrl(url);

    res.json({
      success: true,
      media: data.url_list
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

module.exports = app;
