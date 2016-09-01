MySql = Npm.require('mysql');

//Production MySql Database
var connectionSettingsProd = {
    connectLimit: 25,
    host: '138.68.5.242',
    port: '3306',
    user: 'root',
    password: 'Ricklefs34',
    database: 'COLLEGEPOOL'
};

//Development MySql Database
var connectionSettingsDev = {
    connectLimit: 25,
    host: 'localhost',
    database: 'COLLEGEPOOL',
    user: 'root',
    password: 'Ricklefs34'
};

var pool = MySql.createPool(connectionSettingsDev);

var ds = Meteor.Replication.DataSource(pool);

var Games = Meteor.Replication('Games', ds.id('idGames'), 'Select * from COLLEGEPOOL.Games');
var Picks = Meteor.Replication('Picks', ds.id('newPickId'), 'Select * from COLLEGEPOOL.Picks');
var Totals = Meteor.Replication('weeklyScores', ds.id('idWeekly Scores'), 'Select * from COLLEGEPOOL.weeklyScores');
var Scores = Meteor.Replication('Scores', ds.id('ScoreID'), 'Select * from COLLEGEPOOL.Scores');
var Covered = Meteor.Replication('Covered', ds.id('idCovered'), 'Select * from COLLEGEPOOL.Covered');

Meteor.startup(function () {
    
      process.env.MAIL_URL = 'smtp://thecollegespread@gmail.com:Ricklefs34@smtp.gmail.com:587';

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

        var weeklyPick = Picks.find({ username: this.newPick.username, week: this.newPick.week }).fetch();
        
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
        else if (!this.newPick.username){
            throw new Meteor.Error('You are not logged in');
        }        
        else {
            pool.query('INSERT INTO Picks SET ?', this.newPick, function (err, result) {
                if (!err) {
                    return { success: 'Success' };
                }
                else {
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
        return getGames;

    },

    getTotals: function () {
        var getTotals = Totals.find({}).fetch();
        return getTotals;
    },
    
    alreadySubmitted: function(loggedIn, activeWeek){
      var alreadySubmitted = Picks.find ({ week: activeWeek, username: loggedIn }).fetch();
        if (alreadySubmitted.length > 0){
            return true;
        }
        return false;
    },
    

    insertGames: function (results) {
        var alreadySubmittedGames = Games.find({gameweek: results.data[0].gameweek }).fetch();
        
        if (alreadySubmittedGames.length > 0){
            throw new Meteor.Error("You have already inserted this weeks games");
        }
        else 
        {
            for (var index = 0; index < results.data.length; index++) {
                pool.query('INSERT INTO Games SET ?', results.data[index], function (err, result) {
                    if (!err) {
                        return { success: 'Success' };
                    }
                    else {
                        throw new Meteor.Error(err);
                    }
                });
             }
        }
        return { success: 'Success' };
    },

    insertScores: function (results) {
        var alreadySubmittedScores = Scores.find({week: results.data[0].week }).fetch();
        
        if (alreadySubmittedScores.length > 0){
            throw new Meteor.Error("You have already inserted this weeks Scores");
        }
        else 
        {
            for (var index = 0; index < results.data.length; index++) {
                pool.query('INSERT INTO Scores SET ?', results.data[index], function (err, result) {
                    if (!err) {
                        return { success: 'Success' };
                    }
                    else {
                        throw new Meteor.Error(err);
                    }
                });
            }
        }
        return { success: 'Success' };
    },

    teamsCovered: function (activeWeek) {
        var alreadySubmittedCovered = Covered.find({gameweek: activeWeek }).fetch();
        
        if (alreadySubmittedCovered.length > 0)
        {
            throw new Meteor.Error("You have already update this weeks covered table");
        }
        else 
        {
            pool.query('CALL COLLEGEPOOL.teamsThatCovered("' + activeWeek + '")',  function (err, result) {
                if (!err) {
                    return { success: 'Success' };
                }
                else {
                    throw new Meteor.Error(err);
                }
            });
        }
    },
    
    weeklyScores: function (activeWeek) {
            pool.query('CALL COLLEGEPOOL.weeklyScores("' + activeWeek + '")',  function (err, result) {
                if (!err) {
                    
                }
                else {
                    throw new Meteor.Error(err);
                }
            });
    },
        
    calculateTotals: function(){   
        pool.query('CALL COLLEGEPOOL.overall_totals()',  function (err, result) {
                    if (!err) {
                        return { success: 'Success' };
                    }
                    else {
                        throw new Meteor.Error(err);
                    }
        });
    }


});