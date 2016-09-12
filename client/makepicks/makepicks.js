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
                    return getTeams.find({ 'Week': activeWeek, 'Time': { $lt: new Date() } } );
                }     
            });

            this.addPick = () => {
                this.newPick.username = this.username;
                
                var submittedDate = new Date();
                this.newPick.dateSubmitted = submittedDate;
                
                var activeWeek = this.savedActiveWeek;
                this.newPick.week = activeWeek[0].week;
                
                var gotwSpread = getTeams.find({'Team': this.newPick.gotw}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gotwSpread = gotwSpread;
                    
                var gametwoSpread = getTeams.find({'Team': this.newPick.gametwo}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gametwoSpread = gametwoSpread;

                var gamethreeSpread = getTeams.find({'Team': this.newPick.gamethree}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamethreeSpread = gamethreeSpread;

                var gamefourSpread = getTeams.find({'Team': this.newPick.gamefour}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamefourSpread = gamefourSpread;

                var gamefiveSpread = getTeams.find({'Team': this.newPick.gamefive}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamefiveSpread = gamefiveSpread;

                var gamesixSpread = getTeams.find({'Team': this.newPick.gamesix}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamesixSpread = gamesixSpread;

                var gamesevenSpread = getTeams.find({'Team': this.newPick.gameseven}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamesevenSpread = gamesevenSpread;

                var gameeightSpread = getTeams.find({'Team': this.newPick.gameeight}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gameeightSpread = gameeightSpread;

                var gamenineSpread = getTeams.find({'Team': this.newPick.gamenine}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gamenineSpread = gamenineSpread;

                var gametenSpread = getTeams.find({'Team': this.newPick.gameten}, {'Spread': 1}).fetch()[0].Spread; 
                this.newPick.gametenSpread = gametenSpread;


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