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
                        swal("Oh No!", err, "error")
                    }
                    else {
                        swal("Good job!","You have added all the Teams that have covered", "success")
                    }
                });
            };
                        
            this.weeklyScores = () => {
                var activeWeek = this.savedActiveWeek[0].week;
                Meteor.call('weeklyScores', activeWeek, function (err, res) {
                    if (err) {
                        swal("Oh No!", err, "error")
                    }
                    else {
                        swal("Good job!", "You have calculated all the totals for the week", "success")
                    }
                });
            };

            this.overallTotals = () => {
                var activeWeek = this.savedActiveWeek[0].week;
                Meteor.call('calculateTotals', activeWeek, function (err, res) {
                    if (err) {
                        swal("Oh No!", err, "error")
                    }
                    else {
                        swal("Good job!", "You have updated the Overall Total Scores", "success")
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
                                swal("Oh No!", err, "error")
                            }
                            else {
                                swal("Good job!", "All the Weeks Games have been uploaded!", "success")
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
                                swal("Oh No!", err, "error")
                            }
                            else {
                                swal("Good job!", "All the Weeks Scores have been uploaded!", "success")
                            }
                        });
                    }
                });
            }
        }
    }
});