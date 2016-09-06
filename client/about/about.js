angular.module("collegepool").directive('about', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/about/about.html',
    controllerAs: 'about'
  }
});