/**
 * Constants
 */

// CSV paths
const COMPANIES_PATH = './csvs/companies.csv';
const SCORES_PATH = './csvs/score-records.csv';

// Score types
const CODING = 'coding_score';
const COMMUNICATION = 'communication_score';

module.exports = {
  paths: { COMPANIES_PATH, SCORES_PATH },
  scoreTypes: { CODING, COMMUNICATION }
};
