/**
 * Calculation helper functions
 */

const { scoreTypes } = require('./constants');
const {
  getScoreByCandidateId,
  getCompanyById,
  getSimilarCompanyIds,
  getComparableScores
} = require('./utils');

/**
 * Calculate the percentile of a score in a list of scores
 * @param  {Number}  x
 * @param  {Array}   xs
 * @return {Number}  the calculated percentile
 */
const calculatePercentile = (x, xs) => {
  const lower = xs.filter(n => n < x);

  // TODO: make sure this is the correct formula
  return ((lower.length + 0.5) / (xs.length + 1)) * 100;
};

/**
 * Get a sorted list of scores by type (coding/communication)
 * @param  {Array}   scores
 * @param  {String}  type
 * @return {Array}   the sorted score values
 */
const getSortedScoresByType = (scores, type) =>
  scores
    .map(score => score[type])
    .sort((x, y) => x - y);

/**
 * Calculate all the relevant scores/percentiles
 * @param  {Object}  score
 * @param  {Array}   scores
 * @return {Object}  mappings of score calculations
 */
const calculateScorePercentiles = (score, scores) => {
  const { CODING, COMMUNICATION } = scoreTypes;
  const {
    coding_score: codingScore,
    communication_score: communicationScore
  } = score;

  const codingScores = getSortedScoresByType(scores, CODING);
  const communicationScores = getSortedScoresByType(scores, COMMUNICATION);

  return {
    codingScore,
    communicationScore,
    codingScorePercentile: calculatePercentile(codingScore, codingScores),
    communicationScorePercentile: calculatePercentile(communicationScore, communicationScores),
  };
};

/**
 * Determine the scoring statistics of a candidate relative to others
 * @param  {Number}  candidateId
 * @param  {Array}   scores
 * @param  {Array}   companies
 * @return {Object}  mappings of scoring statistics and percentiles
 */
const calculateCandidatePercentiles = (candidateId, scores, companies) => {
  const score = getScoreByCandidateId(candidateId, scores);

  // TODO: improve validations and error handling
  if (!score) throw new Error(`Invalid candidate ID ${candidateId}!`);

  const { title, company_id: companyId } = score;
  const company = getCompanyById(companyId, companies);
  const similarCompanyIds = getSimilarCompanyIds(company, companies);
  const comparableScores = getComparableScores(scores, similarCompanyIds, candidateId, title);

  const {
    codingScore,
    communicationScore,
    codingScorePercentile,
    communicationScorePercentile
  } = calculateScorePercentiles(score, comparableScores);

  return {
    candidate_id: candidateId,
    company_id: companyId,
    candidate_coding_score: codingScore,
    candidate_communication_score: communicationScore,
    percentile_coding_score: codingScorePercentile,
    percentile_communication_score: communicationScorePercentile
  };
};

module.exports = {
  calculatePercentile,
  calculateScorePercentiles,
  calculateCandidatePercentiles
};
