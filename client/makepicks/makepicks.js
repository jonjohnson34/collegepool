angular.module("collegepool").directive('makepicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/makepicks/makepicks.html',
        controllerAs: 'makepicks',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);   
            
            this.newPick = {};
               
            this.helpers({
                savedActiveWeek: () => {
                    return (Weeks.find({}));
                }
            });
                        
            this.helpers({
                teams: () => {
                    return Teams.find({});
                }
            });
             
            this.addPick = () => {
                var activeWeek = this.savedActiveWeek;                
                this.newPick.week = activeWeek[0].week;
                
                //console.log(this.newPick);
                
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