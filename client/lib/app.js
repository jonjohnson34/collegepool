angular.module('collegepool', [
    'angular-meteor',
    'ui.router',
    'ngRoute',
    'ngFileUpload',
 ]).run(function ($rootScope) {
     $rootScope.username = '';     
 });
