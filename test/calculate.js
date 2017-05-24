const assert = require('chai').assert;
const {
  calculatePercentile,
  calculateScorePercentiles,
  calculateCandidatePercentiles
} = require('../helpers/calculate');

describe('Test calculation helpers', () => {
  it('calculates the percentile', () => {
    const p1 = calculatePercentile(10, [1, 5, 15, 20]);
    const p2 = calculatePercentile(30, [1, 5, 15, 20]);
    const p3 = calculatePercentile(0, [1, 5, 15, 20]);

    assert.equal(p1, 50);
    assert.equal(p2, 90);
    assert.equal(p3, 10);
  });

  it('calculates the percentiles of a score', () => {
    const score = { coding_score: 10, communication_score: 15 };
    const scores = [
      { coding_score: 4, communication_score: 10 },
      { coding_score: 8, communication_score: 17 },
      { coding_score: 12, communication_score: 23 }
    ];

    const {
      codingScorePercentile,
      communicationScorePercentile
    } = calculateScorePercentiles(score, scores);

    assert.equal(codingScorePercentile, 62.5);
    assert.equal(communicationScorePercentile, 37.5);
  });

  it('calculates all the stats of a candidate', () => {
    const candidateId = 3;
    const scores = [
      { candidate_id: 1, company_id: 1, title: 'Engineer', coding_score: 4, communication_score: 10 },
      { candidate_id: 2, company_id: 1, title: 'Engineer', coding_score: 8, communication_score: 17 },
      { candidate_id: 3, company_id: 2, title: 'Engineer', coding_score: 12, communication_score: 23 },
      { candidate_id: 4, company_id: 2, title: 'Engineer', coding_score: 13, communication_score: 20 },
      { candidate_id: 5, company_id: 3, title: 'Engineer', coding_score: 15, communication_score: 25 }
    ];

    const companies = [
      { company_id: 1, fractal_index: 0.5 },
      { company_id: 2, fractal_index: 0.6 },
      { company_id: 3, fractal_index: 0.8 }
    ];

    const {
      candidate_id,
      company_id,
      candidate_coding_score,
      candidate_communication_score,
      percentile_coding_score,
      percentile_communication_score
    } = calculateCandidatePercentiles(candidateId, scores, companies);

    assert.equal(candidate_id, 3);
    assert.equal(company_id, 2);
    assert.equal(candidate_coding_score, 12);
    assert.equal(candidate_communication_score, 23);
    assert.equal(percentile_coding_score, 62.5);
    assert.equal(percentile_communication_score, 87.5);
  });
});
