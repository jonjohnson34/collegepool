angular.module("collegepool").directive('picks', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/picks/picks.html',
    controllerAs: 'picks',

    controller: function ($scope, $reactive, $rootScope) {

      $reactive(this).attach($scope);

      var loggedIn= Meteor.user().username;
            
      
      this.helpers({
        savedActiveWeek: () => {
          return (Weeks.find({}));
        }
      });

      var activeWeek = this.savedActiveWeek[0].week;
      

      Meteor.call('alreadySubmitted', loggedIn, activeWeek, function (err, res) {
       if (err) {
          swal("Oh No!", err, "error");
        }
        else {
          if (res === false){
             
          }
          else {
             document.location = '/allPicks';   
          }
         
        }

      });
      
      Meteor.call('getTeams', activeWeek, function(err, res){
          if (!err){
            console.log('all good');
          }
          else {
            console.log('error');
          }
      });

    }
  }
});
