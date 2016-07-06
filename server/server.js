
Meteor.startup(function () {
    //Change to cloud mysql database
    
    var connectionSettings = {
            host: 'localhost',
            user: 'root',
            password: 'Ricklefs34',
            database: 'COLLEGEPOOL'
        };

    var db = Mysql.connect(connectionSettings);
    
    Picks = db.meteorCollection('Picks', 'pickscollection');
    Scores = db.meteorCollection('Scores', 'scorescollection');
    Games = db.meteorCollection('Games', 'gamescollection');
    
    
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
            
            var numLocks = 0;
            var numPicks = 0;
            
            _.each(this.newPick, function(value, key){
                if (value === true){
                     numLocks++;
                }
            });
            
            _.each(this.newPick, function(value, key){
                if (typeof(value) === "string" && key != "week"  && key != "username"){
                    numPicks++
                }        
            });  
            console.log(numPicks);
            
            if(numPicks != 10){
                throw new Meteor.Error("Please make all your picks");
            }          
            else if(numLocks > 3){
                throw new Meteor.Error("Too Many Locks");
            }
            else if (numLocks < 3){
                throw new Meteor.Error("Not Enough Locks");
            }
            else {
                var newPicksId = Picks.insert(newPick);
                return { success: 'Success' };
            }
        
        },

        //TODO: connect to mysql and bring back scores and spreads based on team and week
        showPicks: function(activeWeek){
            var getPicks =  Picks.find({week: activeWeek}).fetch();
            //console.log(getPicks);  
            return getPicks;   
        },

        showGames: function(activeWeek){
            //console.log(activeWeek);
            var getScores =  Scores.find({week: activeWeek}).fetch();  
            //console.log(getScores.length)        
            return getScores;   
        },
        
        getGames: function(activeWeek) {
            var getGames = Games.find({week: activeWeek}).fetch();
            return getGames;
        },
        
        insertGames: function(results){
            for (var index = 0; index < results.data.length; index++) {
                var newGameId = Games.insert(results.data[index]);
            }
             return { success: 'Success' };  
        }
        
});

