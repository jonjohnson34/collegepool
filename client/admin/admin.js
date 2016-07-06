angular.module("collegepool").directive('admin', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin.html',
        controllerAs: 'adminL',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            //this.activeWeek = {};                

            this.updateWeek = () => {
                Weeks.update({ _id: "kXb76mmhjh6zmbL2a" }, { "weekID": 1, "week": this.activeWeek }, { upsert: true });
            };

            this.helpers({
                savedActiveWeek: () => {
                    return (Weeks.find({}));
                }
            });

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
                        for (i = 0; i < results.data.length; i++) {
                            Scores.insert(results.data[i]);
                        }
                        console.log("Scores Finished:");
                    }
                });
            }
        }
    }
});