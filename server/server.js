
Meteor.startup(function () {
    
    //process.env.MONGO_URL = 'mongodb://localhost:27017/collegepool';
    
    if (Games.find().count() === 0) {
        var games = JSON.parse(Assets.getText('picks.json'));

        for (var i = 0; i < games.length; i++) {
            Games.insert(games[i]);
        }
    }

    if (Teams.find().count() === 0) {
        var teams = JSON.parse(Assets.getText('teams.json'));

        for (var i = 0; i < teams.length; i++) {
            Teams.insert(teams[i]);
        }
    }
}),

Meteor.methods({

    makePick: function (newPick) {
        this.newPick = newPick;
        if (_.where(this.newPick, { lock: true }).length > 3) {
            console.log('Too Many Locks');
        }
        else if (_.where(this.newPick, { lock: true }).length < 3) {
            console.log('Not Enough Locks');
        }
        else {
            Picks.insert(newPick);
            console.log('Success');
            newPick = {};
            // $state.go('allPicks');
        }
    },

    showGames: function () {
       var scores = Scores.aggregate(
            [{
                $lookUp:
                {
                    from: "Games",
                    localField: "HomeTeam",
                    foreignField: "HomeTeam",
                    as: "Cover"
                }
            }]);
    return scores;
    }

});
