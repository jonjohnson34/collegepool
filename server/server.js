//Change to cloud mysql database
//production
/*   
var connectionSettings = {
        host: '138.68.5.242',
        port: '3306',
        user: 'root',
        password: 'Ricklefs34',
        database: 'COLLEGEPOOL' 
    };         
*/

MySql = Npm.require('mysql');

//Production MySql Database
var connectionSettingsProd = {
    connectLimit: 25,
    host: '138.68.5.242',
    port: '3306',
    user: 'root',
    
    database: 'COLLEGEPOOL' 
};

//Development MySql Database
var connectionSettingsDev = {
    connectLimit: 25,
    host: 'localhost',
    database: 'COLLEGEPOOL',
    user: 'root',
    
};

var pool = MySql.createPool(connectionSettingsProd);

var ds = Meteor.Replication.DataSource(pool);

var Games = Meteor.Replication('Games', ds.id('idGames'), 'Select * from COLLEGEPOOL.Games');
var Picks = Meteor.Replication('Picks', ds.id('newPickId'), 'Select * from COLLEGEPOOL.Picks');
var Totals = Meteor.Replication('weeklyScores', ds.id('idWeekly Scores'), 'Select * from COLLEGEPOOL.weeklyScores');
var Scores = Meteor.Replication('Scores', ds.id('ScoreID'), 'Select * from COLLEGEPOOL.Scores');


Meteor.startup(function () {

    if (Teams.find().count() === 0) {
        var teams = JSON.parse(Assets.getText('teams.json'));

        for (var i = 0; i < teams.length; i++) {
            Teams.insert(teams[i]);
        }
    }
});

Meteor.methods({

    makePick: function (newPick) {

        this.newPick = newPick;

        var numLocks = 0;
        var numPicks = 0;
        var submitted = 0;


        var weeklyPick = Picks.find({ username: this.newPick.username }, { week: this.newPick.week }).fetch();


        _.each(this.newPick, function (value, key) {
            if (value === true) {
                numLocks++;
            }
        });

        _.each(this.newPick, function (value, key) {
            if (typeof (value) === "string" && key != "week" && key != "username") {
                numPicks++
            }
        });
        // console.log(numPicks);

        if (weeklyPick.length > 0) {
            throw new Meteor.Error("You have already submitted your picks for this week");
        }
        else if (numPicks != 10) {
            throw new Meteor.Error("Please make all your picks");
        }
        else if (numLocks > 3) {
            throw new Meteor.Error("Too Many Locks");
        }
        else if (numLocks < 3) {
            throw new Meteor.Error("Not Enough Locks");
        }
        else {
             pool.query('INSERT INTO Picks SET ?', this.newPick, function(err, result) {
                  if (!err){
                        return { success: 'Success' };
                  }
                  else 
                  {
                      throw new Meteor.Error(err);
                  }
            });
        }
    },

    showPicks: function (activeWeek) {
        var getPicks = Picks.find({ week: activeWeek }).fetch();
        return getPicks;
    },

    getScores: function (activeWeek) {
        var getScores = Scores.find({ week: activeWeek }).fetch();
        return getScores;
    },

    getGames: function (activeWeek) {
        var getGames = Games.find({ gameweek: activeWeek }).fetch();
        console.log(getGames);
        return getGames;

    },

    getTotals: function () {
        var getTotals = Totals.find({}).fetch();
        return getTotals;
    },

    insertGames: function (results) {
        for (var index = 0; index < results.data.length; index++) {
            pool.query('INSERT INTO Games SET ?', results.data[index], function(err, result) {
                  if (!err){
                        return { success: 'Success' };
                  }
                  else 
                  {
                      throw new Meteor.Error(err);
                  }
            });
            //var newGameId = Games.insert(results.data[index]);
        }
        return { success: 'Success' };
    },

    insertScores: function (results) {
        for (var index = 0; index < results.data.length; index++) {
            pool.query('INSERT INTO Scores SET ?', results.data[index], function(err, result) {
                  if (!err){
                        return { success: 'Success' };
                  }
                  else 
                  {
                      throw new Meteor.Error(err);
                  }
            });
            //var newScoreId = Scores.insert(results.data[index]);
        }
        return { success: 'Success' };
    }
});