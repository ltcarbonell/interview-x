var soccerApp = angular.module('soccerApp', []);

function mainController($scope, $http) {

  // when landing on the page, get all todos and show them
  $http.get('/api/standings')
  .success(function(data) {
    $scope.standings = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

}

function adminController($scope, $http) {
  $scope.team1Score = 0;
  $scope.team2Score = 0;

  $scope.team1 = {};
  $scope.team2 = {};


  $scope.teams = {};

  $http.get('/api/admin')
  .success(function(data) {
    $scope.teams = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  function checkScore(score1, score2) {
    if (score1 > score2) {
      var data = {
        points: 2,
        win: 1,
        lose: 0,
        draw: 0};
        return data;
      } else if (score2 > score1) {
        return {
          points: 0,
          win: 0,
          lose: 1,
          draw: 0};
        } else {
          return {
            points: 1,
            win: 0,
            lose: 0,
            draw: 1};
          }
        }
        function postData(scoreData) {
          $http.post('/api/admin', scoreData)
          .success(function(response) {
            console.log(response);
          })
          .error(function(response) {
            alert('Error posting to server');
            console.log('Error: ' + response);
          });
        }


        // when submitting the add form, send the text to the node API
        $scope.addMatch = function() {
          if ($scope.team1.team_id && $scope.team2.team_id) {
            var scoreData1 = checkScore($scope.team1Score, $scope.team2Score);
            console.log("Team 1 ID:" + $scope.team1.team_id)
            scoreData1.team_id = $scope.team1.team_id;
            var scoreData2 = checkScore($scope.team2Score, $scope.team1Score);
            scoreData2.team_id = $scope.team2.team_id;
            postData(scoreData1);
            postData(scoreData2);
            alert('Match information submitted successfully');
            $scope.team1Score = 0;
            $scope.team2Score = 0;
            $scope.team1 = {};
            $scope.team2 = {};
          } else {
            swal('Error Submitting Match, Please check all fields');
          }


        };
      }
