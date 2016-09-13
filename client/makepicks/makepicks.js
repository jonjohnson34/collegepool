angular.module("collegepool").directive('makepicks', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/makepicks/makepicks.html',
        controllerAs: 'makepicks',
        controller: function ($scope, $reactive, $state, $location) {
            $reactive(this).attach($scope);

            this.username = Meteor.user().username;

            this.newPick = {};

            this.helpers({
                savedActiveWeek: () => {
                    return (Weeks.find({}));
                }
            });

            var activeWeek = this.savedActiveWeek[0].week;

            //TODO - change this back to $gt
            this.helpers({
                teams: () => {
                    return getTeams.find({ 'Week': activeWeek, 'Time': { $gt: new Date() } } );
                }     
            });

            this.addPick = () => {
                this.newPick.username = this.username;
                
                var submittedDate = new Date();
                this.newPick.dateSubmitted = submittedDate;
                
                var activeWeek = this.savedActiveWeek;
                this.newPick.week = activeWeek[0].week;
                
                var gotwSpread = getTeams.find({'Team': this.newPick.gotw, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gotwSpread = gotwSpread;
                    
                var gametwoSpread = getTeams.find({'Team': this.newPick.gametwo, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gametwoSpread = gametwoSpread;

                var gamethreeSpread = getTeams.find({'Team': this.newPick.gamethree, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamethreeSpread = gamethreeSpread;

                var gamefourSpread = getTeams.find({'Team': this.newPick.gamefour, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamefourSpread = gamefourSpread;

                var gamefiveSpread = getTeams.find({'Team': this.newPick.gamefive, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamefiveSpread = gamefiveSpread;

                var gamesixSpread = getTeams.find({'Team': this.newPick.gamesix, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamesixSpread = gamesixSpread;

                var gamesevenSpread = getTeams.find({'Team': this.newPick.gameseven, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamesevenSpread = gamesevenSpread;

                var gameeightSpread = getTeams.find({'Team': this.newPick.gameeight, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gameeightSpread = gameeightSpread;

                var gamenineSpread = getTeams.find({'Team': this.newPick.gamenine, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamenineSpread = gamenineSpread;

                var gametenSpread = getTeams.find({'Team': this.newPick.gameten, 'Week': activeWeek[0].week}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gametenSpread = gametenSpread;

                //console.log(this.newPick);
                Meteor.call('makePick', this.newPick, function (err, res) {
                    if (err) {
                        swal("Oh No!", err, "error");
                    }
                    else {
                        document.location = '/allPicks';
                    }
                });

            };

        }
    }
});