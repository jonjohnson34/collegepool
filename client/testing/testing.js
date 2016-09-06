angular.module("collegepool").directive('testing', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/testing/testing.html',
        controllerAs: 'testing',
        controller: function ($scope, $reactive, $q) {
            $reactive(this).attach($scope);

            var activeWeek = 'Week One';

            this.checkButton = () => {
                getData().then((data) => {
                    this.gotPicks = data;
                });
            };

            var getData = () => {
                var deferred = $q.defer();
                Meteor.call('test_showPicks', 'Week One', (error, result) => {
                    if (error) {
                        console.log('failed', error);
                        deferred.reject('error');
                    } else {
                        console.log('success', result);
                        deferred.resolve(result);
                    }
                });
                return deferred.promise;
            };
        }
    }
});