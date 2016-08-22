angular.module("collegepool").directive('admin', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin.html',
        controllerAs: 'adminL',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.updateWeek = () => {
                Weeks.update({ _id: "kXb76mmhjh6zmbL2a" }, { "weekID": 1, "week": this.activeWeek }, { upsert: true });
            };

            this.helpers({
                savedActiveWeek: () => {
                    return (Weeks.find({}));
                }
            });

            this.teamsThatCovered = () => {
                var activeWeek = this.savedActiveWeek[0].week;
                Meteor.call('teamsCovered', activeWeek, function (err, res) {
                    if (err) {

                        alert(err);
                    }
                    else {
                        alert("Records Created");
                    }
                });
            };

            this.weeklyScores = () => {
                var activeWeek = this.savedActiveWeek[0].week;
                Meteor.call('weeklyScores', activeWeek, function (err, res) {
                    if (err) {

                        alert(err);
                    }
                    else {
                        alert("Totals Created");
                    }
                });
            };
            
            this.overallTotals = () => {
                var activeWeek = this.savedActiveWeek[0].week;
                Meteor.call('calculateTotals', activeWeek, function (err, res) {
                    if (err) {

                        alert(err);
                    }
                    else {
                        alert("Totals Created");
                    }
                });
            };

            this.gamesOnSave = (files) => {
                let f = files[0];
                Papa.parse(f, {
                    header: "true",
                    complete: function (results) {
                        Meteor.call('insertGames', results, function (err, res) {
                            if (err) {
                                alert(err);
                            }
                            else {
                                alert("Games Finished:");
                            }
                        });
                    }
                });
            }

            this.scoresOnSave = (files) => {
                let f = files[0];
                Papa.parse(f, {
                    header: "true",
                    complete: function (results) {
                        Meteor.call('insertScores', results, function (err, res) {
                            if (err) {
                                alert(err);
                            }
                            else {
                                alert("Scores Finished:");
                            }
                        });
                    }
                });
            }
        }
    }
});