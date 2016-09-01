angular.module("collegepool").directive('picks', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/picks/picks.html',
    controllerAs: 'picks',

    controller: function ($scope, $reactive, $rootScope) {

      $reactive(this).attach($scope);

      var loggedIn = $rootScope.username;
      
      if (!loggedIn){
        document.location = '/login';
      }

      this.helpers({
        savedActiveWeek: () => {
          return (Weeks.find({}));
        }
      });

      var activeWeek = this.savedActiveWeek[0].week;

      Meteor.call('alreadySubmitted', loggedIn, activeWeek, function (err, res) {
        console.log(res);
        if (err) {
          swal("Oh No!", err, "error");
        }
        else {
          if (res === false){
             //document.location = '/picks';
          }
          else {
             document.location = '/allPicks';   
          }
         
        }

      });
    }
  }
});
