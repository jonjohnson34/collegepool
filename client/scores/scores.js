
angular.module("collegepool").directive('scores', function () {
    
    return {
        restrict: 'E',
        templateUrl: 'client/scores/scores.html',
        controllerAs: 'ScoreCtrl',    
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                scores: () => {
                  return Scores.find({});
                }
            });
            
        }
    }
});    
    
