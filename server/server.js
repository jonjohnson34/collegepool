
Meteor.startup(function () {
    
var connectionSettings = {
            host: 'localhost',
            user: 'root',
            password: 'Ricklefs34',
            database: 'COLLEGEPOOL'
     }
    //process.env.MONGO_URL = 'mongodb://localhost:27017/collegepool';
    
    //mySql connection     
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
        
    testMySql: function (connectionSettings) {
        
        var db = Mysql.connect(connectionSettings);
           return db.table("Scores").findAll({});
            //.then(function (Scores) {
            //console.log("SELECT * FROM Scores");
       //     console.log(Scores);
         //   return Scores;
      },

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

    //TODO: connect to mysql and bring back scores and spreads based on team and week
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
