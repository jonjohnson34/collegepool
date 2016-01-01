angular.module("collegepool").directive('makepicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/makepicks/makepicks.html',
        controllerAs: 'makepicks',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);   
            
            this.newPick = {};
            
            this.helpers({
               isRequired: () =>{
                   return true;
               } 
            }); 
            
            this.helpers({
                teams: () => {
                    return Teams.find({});
                }
            });
             
            this.addPick = () => {
                Picks.insert(this.newPick);
                this.newPick = {};  
                $state.go('allPicks');
            };
            
        }
    }
});