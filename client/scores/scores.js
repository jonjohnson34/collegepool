
angular.module("collegepool").directive('scores', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/scores/scores.html',
    controllerAs: 'scoreList',
    controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);
        
            this.helpers({
                scores: () => {
                    return Scores.aggregate(
                    [{
                        $lookUp:
                        {
                            from: "Games",
                            localField:"HomeTeam",
                            foreignField: "HomeTeam",
                            as: "Cover"
                        }   
                    }])
                }       
            });
           
        }
  }
});
