angular.module("collegepool").directive('allpicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/allPicks/allPicks.html',
        controllerAs: 'allPicks',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.weekChange = (activeWeek) => {

                //console.log(this.activeWeek);

                Meteor.call('showGames', this.activeWeek, function(res, err){
                    if (err){
                       console.log(err); 
                    }   
                    else{
                        console.log(res);
                    }
                });
                
            }
        }
    }
});
