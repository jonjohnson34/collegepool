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
                if (_.where(this.newPick, {lock: true}).length > 3)
                {
                    alert('Too Many Locks');
                }
                else if  (_.where(this.newPick, {lock: true}).length < 3)
                {
                    alert ('Not Enough Locks');
                }
                else {
                    Picks.insert(this.newPick);
                    this.newPick = {};  
                    $state.go('allPicks');
                }
            };
            
        }
    }
});