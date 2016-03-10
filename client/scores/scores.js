<<<<<<< HEAD
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
=======

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
    
>>>>>>> 54fb4e65f0e58dd3824a55a305b2a2e08f99ad55
