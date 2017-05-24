const express = require('express');
const { Router } = express;
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const {
  fetchCompanies,
  fetchScores,
  getCandidateStats
} = require('./main');

// Set up app
const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up API
const api = Router();

api.get('/companies', (req, res) =>
  fetchCompanies()
    .then(companies =>
      res.json({ companies })));

api.get('/scores', (req, res) =>
  fetchScores()
    .then(scores =>
      res.json({ scores })));

api.get('/stats/:candidate_id', (req, res) => {
  const candidateId = Number(req.params.candidate_id);

  return getCandidateStats(candidateId)
    .then(stats =>
      res.json({ stats }));
});

app.use('/api', api);

// Start server
app.listen(port, () =>
  console.log(`Listening on port ${port}`));
