# FEATHER & STONE

## README

THIS IS THE FRONT-END PROGRAM; here is a link to the back-end: https://github.com/inee-ader/backend-fs

## DESCRIPTION
YOUTUBE
<iframe width="560" height="315" src="https://www.youtube.com/embed/xvJbh2iKgVw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This was a solo-project for Phase 3 of Flatiron School Software Engineering program; cohort start date October 5th, 2020. 

This simple journal entry app is meant to help the User reflect on their Feather--or a highlight of the day, and their Stone--a lowpoint of the day. 
The User has 5 minutes to write, and the time is measured by the snail's progress across the screen. No pressure, though, when the snail reaches the end, it just stops. The shades of light green release tension from the eyes. This app helps the User take a few minutes of calm to reflect. 
The date input defaults to the current, and you cannot create a journal entry for the future. Journal entries are organized in a list by the date. Entries can be edited and saved, or deleted. The date of the entry cannot be edited once the entry has been created. 
User can change their name, or delete their account through the 'Edit Name' button. To log out, click 'Close Journal'. 

Hope you like it! 

Other Notes:
This project was created with pure JavaScript in the front-end and Ruby on Rails in the back-end. 

I used a scaffold to set this project up, so I didn't have to deal with the backend much at all. 

I'm sure this code could be a lot more DRY, but I'm still learning, and as I built the program, I had to work around the code that was already working, so it's a bit patched up here and there. Someday I can refactor it! 

This project was not set up with authentications and sessions for the user. 

## INSTRUCTIONS

After downloading the front and back end, you can put these files in a main directory before opening it in VS Code, or other code editor.

Once navigated to the back-end directory, run `bundle install` to make sure all the gems are installed and up to date. 

Run the rails server with `rails s` in the back-end directory terminal, and view two database JSON files in your browser by going to: 
`www.localhost:3000/users`
`www.localhost:3000/entries`

Next, open the app by right clicking the `index.html` file in the front-end, and selecting 'Open in default browser'. 

Now you're ready to play with the app! Enjoy.

## CONTRIBUTING

I am super open to more contributions to this project. There are lots of things I would like to add, but for the purposes of this project, I met the requirements as it is. 

If I had more time, I'd love to add a little calendar to the bottom of the page which indicates the current day, and which days have entries. Might be cool to put a random inspirational quote on each day as well to be saved as part of the journal entry. 

I'd want to add password authentication and sessions to the app, as well as more error message handleing for the User experience. There are validations set up for the User name and Entries models, but no way of conveying to the User that the entry must be filled out before submission, or that the User name could not be changed because it already exists in the database. Things like that. 

I like the styling, but some parts of the page flash, like when the form is cleared and re-rendered, and sometimes the buttons push things around slightly. I couldn't figure out how to get that perfect in time. 

## AUTHORS and ACKNOWLEDGEMENT

I made dis. BUUUUT I had lots of help from my cohort-mates. I am still learning code and this whole project was a challenge for me. Thank you to my entire cohort for helping me, and the instructor and coach as well! 

* Ruby version
    2.6.1
