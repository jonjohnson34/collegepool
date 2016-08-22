angular.module("collegepool").directive('totals', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/totals/totals.html',
        controllerAs: 'totalsList',
        controller: function ($scope, $reactive, $q) {
            $reactive(this).attach($scope);


            var getData = () => {
                var deferred = $q.defer();
                Meteor.call('getTotals', (error, result) => {
                    if (error) {
                        deferred.reject('error');
                    } else {
                        deferred.resolve(result);
                    }
                });
                return deferred.promise;
            };

            getData().then((data) => {
                this.testing = data;
            });    
        }
    }
});
