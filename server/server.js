
Meteor.startup(function () {
    //Change to cloud mysql database
    var connectionSettings = {
        URL: 'mysql://b915fcfdf8ee29:c2739825@us-cdbr-iron-east-04.cleardb.net/heroku_1a8cfca05b2b94f?reconnect=true',
    };

    var db = Mysql.connect(connectionSettings);
    if (db){
        console.log(db);
    }
    else {
        console.log('error');
    }
    
  //  Picks = db.meteorCollection('Picks', 'pickscollection');
  //  Scores = db.meteorCollection('Scores', 'scorescollection');

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
            if (_.where(this.newPick, { lock: true }).length > 31) {
                throw new Meteor.Error("Too Many Locks");
            }
            else if (_.where(this.newPick, { lock: true }).length < 0) {
                throw new Meteor.Error("Not Enough Locks");
            }
            else {

                console.log(newPick);
                var newPicksId = Picks.insert(newPick);
                console.log(newPicksId);
                return { success: 'Success' };
                // newPick = {};
                // $state.go('allPicks');
            }
        },

        //TODO: connect to mysql and bring back scores and spreads based on team and week
        showPicks: function(activeWeek){
            var getPicks =  Picks.find({week: activeWeek}).fetch();  
            return getPicks;   
        },

        showGames: function(activeWeek){
            console.log(activeWeek);
            var getScores =  Scores.find({week: activeWeek}).fetch();  
            console.log(getScores.length)        
            return getScores;   
        }
        
});

