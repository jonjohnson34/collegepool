angular.module("collegepool").directive('totals', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/totals/totals.html',
        controllerAs: 'totalsList',
        controller: function ($scope, $reactive, $q) {
            $reactive(this).attach($scope);
                
          
        }
    }
});
