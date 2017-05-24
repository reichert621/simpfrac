const assert = require('chai').assert;
const { fetchCsvData } = require('../helpers/csv');

describe('Test CSV helpers', () => {
  it('fetches and parses the CSV data', () => {
    return fetchCsvData()
      .then(data => {
        const { companies, scores } = data;

        assert(companies && companies.length);
        assert(scores && scores.length);

        companies.forEach(company => {
          assert.equal(typeof company.company_id, 'number');
          assert.equal(typeof company.fractal_index, 'number');
        });

        scores.forEach(score => {
          assert.equal(typeof score.candidate_id, 'number');
          assert.equal(typeof score.communication_score, 'number');
          assert.equal(typeof score.coding_score, 'number');
          assert.equal(typeof score.title, 'string');
          assert.equal(typeof score.company_id, 'number');
        });
      });
  });
});
