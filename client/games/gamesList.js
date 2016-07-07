angular.module("collegepool").directive('games', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/games/gamesList.html',
        controllerAs: 'gamesList',
        controller: function ($scope, $reactive, $q) {
            $reactive(this).attach($scope);

            this.weekChanged = (activeWeek) => {
                getData(activeWeek).then((data) => {
                    //console.log(typeof data);
                    this.testing = data;
                    //console.log(this.testing);
                });
            };

            var getData = (activeWeek) => {
                var deferred = $q.defer();
                Meteor.call('getGames', this.activeWeek, (error, result) => {
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

