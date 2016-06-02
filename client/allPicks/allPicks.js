angular.module("collegepool").directive('allpicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/allPicks/allPicks.html',
        controllerAs: 'allPicks',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);
             
              this.weekChange = () => {
                 this.call('showGames', this.activeWeek, (err, result) => {
                        this.result = result;
                        console.log(this.result);
                 });                   
              }
            
            
       }
    }
});
