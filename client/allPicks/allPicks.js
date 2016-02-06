angular.module("collegepool").directive('allpicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/allPicks/allPicks.html',
        controllerAs: 'allPicks',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                picks: () => {
                   return Picks.find({}); 
                }
            });
            
            this.helpers({
                savedActiveWeek: () => {
                   return (Weeks.find({}));
                }
            });
        }
    }
});
