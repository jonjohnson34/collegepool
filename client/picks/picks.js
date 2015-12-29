angular.module("collegepool").directive('picks', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/picks/picks.html',
    controllerAs: 'picks',
  }
});