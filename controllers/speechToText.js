const axios = require("axios");
const fs = require("fs");   
require('dotenv').config();

const baseUrl = "https://api.assemblyai.com";

const headers = {
  authorization: process.env.ASSEMBLY_APIKEY,
  "content-type": "application/json",
};

async function uplaodAudio(filePath) {
  const path = fs.readFileSync(filePath);
  const response = await axios.post(`${baseUrl}/v2/upload`, path, {
    headers: {
      authorization: process.env.ASSEMBLY_APIKEY,
      "Transfer-Encoding": "chunked",
    },
  });
  return response.data.upload_url;
}
async function transcribeAudio(audioUrl) {
  const response = await axios.post(
    `${baseUrl}/v2/transcript`,
    {
      audio_url: audioUrl,
      speech_model: "universal",
      auto_chapters: true,
      speaker_labels: true,
    },
    {
      headers: headers,
    }
  );
  return response.data.id;
}

async function getTranscriptionResult(transcriptId) {
  const response = await axios.get(`${baseUrl}/v2/transcript/${transcriptId}`, {
    headers: headers,
  });
  return response.data;
}

module.exports = {
  uplaodAudio,
  transcribeAudio,
  getTranscriptionResult,
};