angular.module("collegepool").directive('allpicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/allPicks/allPicks.html',
        controllerAs: 'allPicks',
        controller: function ($scope, $reactive, $q) {
            $reactive(this).attach($scope);

            var activeWeek = this.activeWeek;
                    
            this.weekChanged = (activeWeek) => {
                getData(activeWeek).then((data) => {
                    this.gotPicks = data;
                    //console.log(this.gotPicks);
                });
            };

            var getData = (activeWeek) => {
                var deferred = $q.defer();
                Meteor.call('showPicks', this.activeWeek, (error, result) => {
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