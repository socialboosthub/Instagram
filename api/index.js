const express = require("express");

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

    // Add ?__a=1&__d=dis
    const apiUrl = url.split("?")[0] + "?__a=1&__d=dis";

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0"
      }
    });

    const data = await response.json();

    let media = [];

    // Reel / Video
    if (data.items) {

      data.items.forEach(item => {

        if (item.video_versions) {
          media.push(item.video_versions[0].url);
        }

        if (item.image_versions2) {
          media.push(
            item.image_versions2.candidates[0].url
          );
        }

      });

    }

    // GraphQL
    if (data.graphql) {

      const mediaData =
        data.graphql.shortcode_media;

      if (mediaData.video_url) {
        media.push(mediaData.video_url);
      }

      if (mediaData.display_url) {
        media.push(mediaData.display_url);
      }

    }

    if (media.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Media not found"
      });

    }

    res.json({
      success: true,
      media
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

module.exports = app;
