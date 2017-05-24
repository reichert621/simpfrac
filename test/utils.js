const assert = require('chai').assert;
const {
  getScoreByCandidateId,
  getCompanyById,
  getSimilarCompanyIds,
  getComparableScores
} = require('../helpers/utils');

describe('Test utils', () => {
  it('gets a score by candidate id', () => {
    const candidateId = 4;
    const scores = [
      { candidate_id: 1, company_id: 1, title: 'Engineer', coding_score: 4, communication_score: 10 },
      { candidate_id: 2, company_id: 1, title: 'Engineer', coding_score: 8, communication_score: 17 },
      { candidate_id: 3, company_id: 2, title: 'Engineer', coding_score: 12, communication_score: 23 },
      { candidate_id: 4, company_id: 2, title: 'Engineer', coding_score: 13, communication_score: 20 },
      { candidate_id: 5, company_id: 3, title: 'Engineer', coding_score: 15, communication_score: 25 }
    ];

    const {
      candidate_id,
      company_id,
      title,
      coding_score,
      communication_score
    } = getScoreByCandidateId(candidateId, scores);

    assert.equal(candidate_id, 4);
    assert.equal(company_id, 2);
    assert.equal(title, 'Engineer');
    assert.equal(coding_score, 13);
    assert.equal(communication_score, 20);
  });

  it('gets a company by id', () => {
    const companyId = 2;
    const companies = [
      { company_id: 1, fractal_index: 0.5 },
      { company_id: 2, fractal_index: 0.6 },
      { company_id: 3, fractal_index: 0.8 }
    ];

    const { company_id, fractal_index } = getCompanyById(companyId, companies);

    assert.equal(company_id, 2);
    assert.equal(fractal_index, 0.6);
  });

  it('gets similar companies', () => {
    const company = { company_id: 5, fractal_index: 0.5 };
    const companies = [
      { company_id: 1, fractal_index: 0.4 },
      { company_id: 2, fractal_index: 0.8 },
      { company_id: 3, fractal_index: 0.6 },
      { company_id: 4, fractal_index: 0.3 },
    ];

    const similarIds = getSimilarCompanyIds(company, companies);

    assert.deepEqual(similarIds, [1, 3]);
  });

  it('gets comparable scores', () => {
    const candidateId = 3;
    const companyIds = [1, 2];
    const title = 'Engineer';
    const scores = [
      { candidate_id: 1, company_id: 1, title: 'Senior Engineer', coding_score: 4, communication_score: 10 },
      { candidate_id: 2, company_id: 1, title: 'Engineer', coding_score: 8, communication_score: 17 },
      { candidate_id: 3, company_id: 2, title: 'Engineer', coding_score: 12, communication_score: 23 },
      { candidate_id: 4, company_id: 3, title: 'Engineer', coding_score: 15, communication_score: 25 }
    ];

    const results = getComparableScores(scores, companyIds, candidateId, title);

    assert.deepEqual(results, [
      { candidate_id: 2, company_id: 1, title: 'Engineer', coding_score: 8, communication_score: 17 }
    ]);
  });
});
