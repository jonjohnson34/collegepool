
Meteor.startup(function () {
         var connectionSettings = {
                host: 'localhost',
                user: 'root',
                password: 'Ricklefs34',
                database: 'COLLEGEPOOL'
            };

            var db = Mysql.connect(connectionSettings);
            Picks = db.meteorCollection("Picks", 'pickscollection');
            
           
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
        showGames: function (activeWeek) {
            console.log(activeWeek);
            return Picks.find({week: activeWeek});
            //console.log(respJson);
        
            //console.log(results); 
            //return respJson;       
        }

    });
