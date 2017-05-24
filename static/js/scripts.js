/**
 * Angular app
 */
const app = angular
  .module('app', [])
  .factory('Api', ApiService)
  .controller('MainCtrl', MainCtrl);

// API Service
function ApiService($http, $q) {
  const getCandidateIds = (scores) =>
    scores.map(score => score.candidate_id);

  const fetchScores = () =>
    $http.get('/api/scores')
      .then(res => res.data.scores);

  const getCandidateStats = (candidateId) =>
    $http.get(`/api/stats/${candidateId}`)
      .then(res => res.data.stats);

  return {
    fetchCompanies() {
      return $http.get('/api/companies')
        .then(res => res.data.companies);
    },

    getAllCandidateStats() {
      return fetchScores()
        .then(scores => {
          const candidateIds = getCandidateIds(scores);

          return $q.all(
            candidateIds.map(getCandidateStats)
          );
        });
    }
  };
}

ApiService.$inject = ['$http', '$q'];

// Main Controller
function MainCtrl($log, $q, Api) {
  // Defaults
  this.field = 'percentile_coding_score';
  this.reverse = true;
  this.stats = [];

  const init = () => {
    return $q.all([
        Api.getAllCandidateStats(),
        Api.fetchCompanies()
      ])
      .then(([stats, companies]) => {
        this.stats = stats;
        this.companies = companies;
      })
      .catch($log.error);
  };

  this.setField = (field) => {
    if (this.field === field) {
      this.reverse = !this.reverse;
    } else {
      this.field = field;
      this.reverse = true;
    }
  };

  init();
}

MainCtrl.$inject = ['$log', '$q', 'Api'];
