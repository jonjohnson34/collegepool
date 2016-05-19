
angular.module("collegepool").directive('scores', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scores/scores.html',
        controllerAs: 'scoreList',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.showGames = () => {
                Meteor.call('showGames').then(
                    function (data) {
                        console.log('success inviting', data);
                    },
                    function (err) {
                        console.log('failed', err);
                    });
            };
        }
    };
});
