
angular.module('collegepool', [
  'angular-meteor',
  'ui.router',
  'accounts.ui',
  'ngFileUpload'
]);

function onReady() {
  angular.bootstrap(document, ['collegepool'], {
    strictDi: true
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
  
  
  