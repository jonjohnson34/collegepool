angular.module("collegepool").directive('awards', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/awards/awards.html',
    controllerAs: 'awards'
  }
});