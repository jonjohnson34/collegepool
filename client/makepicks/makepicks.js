angular.module("collegepool").directive('makepicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/makepicks/makepicks.html',
        controllerAs: 'makepicks',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);   
            
            this.newPick = {};
            
            this.helpers({
                teams: () => {
                    return Teams.find({});
                }
            });
             
            this.addPick = () => {
                console.log(this.newPick);
                Picks.insert(this.newPick);
                this.newPick = {};  
                return console.log('picks submitted');
            };
            
        }
    }
});