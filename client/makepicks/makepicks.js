angular.module("collegepool").directive('makepicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/makepicks/makepicks.html',
        controllerAs: 'makepicks',
        controller: function ($scope, $reactive, $state, $location, $rootScope) {
            $reactive(this).attach($scope);   
            
            this.username = Meteor.user().username;
                                                      
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
                this.newPick.username = this.username;
                Meteor.call('makePick', this.newPick, function(err, res){
                    if (err){
                        swal("Oh No!", err, "error");
                    }
                    else{
                        
                        document.location = '/allPicks';
                    }
                });
                
            };
            
        }
    }
});