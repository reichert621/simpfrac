/**
 * CSV helper functions
 */

const fs = require('fs');
const { parse } = require('csv');
const { paths } = require('./constants');

const readCsv = (path) => fs.readFileSync(path, 'utf-8');

/**
 * Parse a CSV string into an array
 * @param  {String}  csv
 * @param  {Object}  options
 * @return {Array}   csv represented as an array
 */
const parseCsv = (csv, options = { columns: true }) =>
  new Promise((resolve, reject) =>
    parse(csv, options, (err, results) =>
      err ? reject(err) : resolve(results)));

/**
 * Ensure all numeric values are represented correctly
 * @param  {Array}   companies
 * @return {Array}   sanitized companies
 */
const sanitizeCompanies = (companies) =>
  companies.map(company => {
    return {
      company_id: Number(company.company_id),
      fractal_index: Number(company.fractal_index)
    };
  });

/**
 * Ensure all numeric values are represented correctly
 * @param  {Array}   scores
 * @return {Array}   sanitized scores
 */
const sanitizeScores = (scores) =>
  scores.map(score => {
    return {
      candidate_id: Number(score.candidate_id),
      communication_score: Number(score.communication_score),
      coding_score: Number(score.coding_score),
      title: String(score.title),
      company_id: Number(score.company_id)
    };
  });

/**
 * Fetch and parse the relevant CSV files
 * @return {Object}  mappings to parsed/sanitized CSV arrays
 */
const fetchCsvData = () =>
  Promise.all([
    parseCsv(readCsv(paths.COMPANIES_PATH)),
    parseCsv(readCsv(paths.SCORES_PATH))
  ])
    .then(([companies, scores]) => {
      return {
        companies: sanitizeCompanies(companies),
        scores: sanitizeScores(scores)
      };
    });

module.exports = {
  fetchCsvData
};
