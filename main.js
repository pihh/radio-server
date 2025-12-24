// server.js
const express = require('express');
const request = require('request');
const app = express();

const STREAM_URL = 'https://ice5.somafm.com/groovesalad-128-mp3';

app.get('/stream', (req, res) => {
  // Set headers so browser or mobile app can play
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Pipe the SomaFM stream directly to the client
  request.get(STREAM_URL).pipe(res);
});

app.get('/stream/:channelId', (req, res) => {
  const url = `https://ice5.somafm.com/${req.params.channelId}-128-mp3`;
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Access-Control-Allow-Origin', '*');
  request.get(url).pipe(res);
});

app.listen(3000, () => console.log('Streaming proxy running on http://localhost:3000/stream'));