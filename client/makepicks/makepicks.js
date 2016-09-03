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
            
            //TODO - change the drop down to pull form the list of games uploaded
            //TODO - inculde date time and filter list based on the games before 
            //         current date time
                                    
            this.helpers({
                teams: () => {
                    return Teams.find({});
                }
            });
             
            this.addPick = () => {
                var submittedDate = new Date();
                console.log(submittedDate);
                var activeWeek = this.savedActiveWeek;                
                this.newPick.week = activeWeek[0].week;
                this.newPick.username = this.username;
                this.newPick.submittedDate = submittedDate;
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