# collegepool
collegepool-meteor

# college-pool
This is a simple college football pick'em pool for my friends. 

This is an attempt at a meteor web application that creates a weekly college pick'em pool. 

TO DO's 
1.1.3

	AFTER SIGNING IN
		- set the picks page to only allow 3 locked games 
		- make sure all games are filled out. 
		
		- after picks redirect to page with everyones picks. 
			- create page with everyones picks laid out names vertically and picks horziontaly (Done)
			- only show picks that have been submitted. (Done)
		
		- don't allow anyone to submit picks twice in one week
			- add the week you are choosing to the submit form. 
			- add vaildation that if that week is in the db don't give them access to the picks page. 
		
		- show a page with the score of that week's game. 
			- calculate the spread of each game 
			- highlight the team that is covering. 
		
		- have a page showing the weekly winner based on the spread of the games
			- have a drop down for the week so that you can see historical games
			
		- have a page showing the yearly standing 
			- Don't calculate the two lowest scores.  

	ADMIN PAGE
		- allow the teams and spreads to be loaded each week (Done)
		- calculate the scores of each person who picked in database
		


    FLOW
        - Home Page
            Nav Bar 
                Login
                Sign Up
                Picks (Only after login)
                All Picks (Only after login and weekly picks have been submitted)
                Admin (only certain users)
                About
            Intro Graphic
            Contact Me Section
        - Login
        - Sign Up
        - Picks
                List of Games/Spreads
                Form to pick the games
        - All Picks
                Shows all picks from all players
        - Season Stats
                Shows Weekly scores 
                Shows Yearly totals
                Shows Kenny's Awards
        - Admin
                Pick active week 
                Load weekly games/spreads
                Load scores from the games
        - About
            
            
                