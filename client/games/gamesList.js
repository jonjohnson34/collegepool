angular.module("collegepool").directive('games', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/games/gamesList.html',
        controllerAs: 'gamesList',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                games: () => {
                    return Games.find({});
                }
            });
            
        }
    }
});

