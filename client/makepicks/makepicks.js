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

            //TODO: Change back to $gt
            this.helpers({
                teams: () => {
                    return getTeams.find({ 'Week': activeWeek, 'Time': { $lt: new Date() } } );
                }     
            });

            this.addPick = () => {
                var submittedDate = new Date();
                var activeWeek = this.savedActiveWeek;
                this.newPick.week = activeWeek[0].week;
                this.newPick.username = this.username;
                this.newPick.dateSubmitted = submittedDate;

                Meteor.call('makePick', this.newPick, function (err, res) {
                    if (err) {
                        swal("Oh No!", err, "error");
                    }
                    else {
                        setTimeout(document.location = '/allPicks', 3000);
                    }
                });

            };

        }
    }
});