/**
 * Helper functions
 */

const isCandidateScore = (score, candidateId) =>
  score.candidate_id === candidateId;

const getScoreByCandidateId = (candidateId, scores = []) =>
  scores.find(score => isCandidateScore(score, candidateId));

const getCompanyById = (id, companies = []) =>
  companies.find(company => company.company_id === id);

const isScoreInCompanyIds = (score, companyIds = []) =>
  companyIds.includes(score.company_id);

const isScoreOfTitle = (score, title) =>
  score.title.toLowerCase() === title.toLowerCase();

/**
 * Check if two companies are similar based on fractal index
 * @param  {Object}  c1
 * @param  {Object}  c2
 * @return {Boolean} if the companies are similar
 */
const areSimilarCompanies = (c1, c2) =>
  Math.abs(c1.fractal_index - c2.fractal_index) < 0.15;

/**
 * Find similar companies relative to the target company
 * @param  {Object}  target
 * @param  {Array}   companies
 * @return {Array}   list of similar company ids
 */
const getSimilarCompanyIds = (target, companies = []) =>
  companies
    .filter(company => areSimilarCompanies(target, company))
    .map(company => company.company_id);

/**
 * Find comparable scores based on similar companies and job title
 * @param  {Array}   scores
 * @param  {Array}   companyIds
 * @param  {Number}  candidateId
 * @param  {String}  title
 * @return {Array}   filtered relevant scores
 */
const getComparableScores = (scores, companyIds, candidateId, title) =>
  scores.filter(score =>
    !isCandidateScore(score, candidateId) &&
    isScoreOfTitle(score, title) &&
    isScoreInCompanyIds(score, companyIds));

module.exports = {
  getScoreByCandidateId,
  getCompanyById,
  getSimilarCompanyIds,
  getComparableScores
};
