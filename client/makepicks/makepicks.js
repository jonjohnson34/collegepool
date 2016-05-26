angular.module("collegepool").directive('makepicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/makepicks/makepicks.html',
        controllerAs: 'makepicks',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);   
            
            this.newPick = {};
                        
            this.helpers({
                teams: () => {
                    return Teams.find({});
                }
            });
             
            this.addPick = () => {
                console.log(this.newPick);
                Meteor.call('makePick', this.newPick, function(err, res){
                    if (err){
                        alert(err);
                    }
                    else {
                        alert('your picks have been submitted');
                    }
                });
                
            };
            
        }
    }
});