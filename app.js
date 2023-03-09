const axios = require("axios")
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const audioURL = "https://bit.ly/3yxKEIY"
const APIKey = "eb17252418ea43edb448e21843152693"


app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
  },
})
/*assembly
    .post("/transcript", {
        audio_url: audioURL
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));*/

app.post('/api/transcript', (req, res, next) => {
  const refreshInterval = 5000;
  const getTranscript = async () => {
    // Sends the audio file to AssemblyAI for transcription
    const response = await assembly.post("/transcript", {
      audio_url: req.body.audioURL,
    })
  
    // Interval for checking transcript completion
    const checkCompletionInterval = setInterval(async () => {
      const transcript = await assembly.get(`/transcript/${response.data.id}`)
      const transcriptStatus = transcript.data.status
  
      if (transcriptStatus !== "completed") {
        console.log(`Transcript Status: ${transcriptStatus}`)
      } else if (transcriptStatus === "completed") {
        console.log("\n-------------Transcription completed!-----------------\n")
        let transcriptText = transcript.data.text;
        res.status(200).json({text: transcriptText});
        //console.log(`Your transcribed text:\n\n${transcriptText}`)
        clearInterval(checkCompletionInterval)
      }
    }, refreshInterval)
  }
  
  getTranscript()
      
});






module.exports = app;