const { fetchCsvData } = require('./helpers/csv');
const { calculateCandidatePercentiles } = require('./helpers/calculate');

const fetchCompanies = () =>
  fetchCsvData()
    .then(({ companies }) => companies);

const fetchScores = () =>
  fetchCsvData()
    .then(({ _, scores }) => scores);

// Default Candidate ID to 889
const getCandidateStats = (candidateId = 889) =>
  fetchCsvData()
    .then(({ companies, scores }) =>
      calculateCandidatePercentiles(candidateId, scores, companies));

if (require.main === module) {
  // Allow entering Candidate ID via command line
  const arg = process.argv[2];
  const candidateId = arg ? Number(arg) : undefined;

  getCandidateStats(candidateId)
    .then(console.log)
    .catch(console.log);
}

module.exports = {
  fetchCompanies,
  fetchScores,
  getCandidateStats
};
