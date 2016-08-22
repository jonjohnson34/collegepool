angular.module("collegepool").directive('scores', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scores/scores.html',
        controllerAs: 'scoreList',
        controller: function ($scope, $reactive, $q) {
            $reactive(this).attach($scope);

            this.weekChanged = (activeWeek) => {
                getData(activeWeek).then((data) => {
                    this.testing = data;
                });
            };

            var getData = (activeWeek) => {
                var deferred = $q.defer();
                Meteor.call('getScores', this.activeWeek, (error, result) => {
                    if (error) {
                        //console.log('failed', error);
                        deferred.reject('error');
                    } else {
                        //console.log('success', result);
                        deferred.resolve(result);
                    }
                });
                return deferred.promise;
            };
        }
    };
});
