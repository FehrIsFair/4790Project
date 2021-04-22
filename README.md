# Full Stack GraphQL API App

This app talks to a custom GraphQL server powerd by prisma, apollo, and nexus. It als uses Postgresql to store its data.

It revolves around getting Anime/Manga and Lists. For Anime and Manga, its mainly by type(Either ANIME or MANGA) ID and for Lists its both by User ID and ID.

This is to demonstrate my skill in created a backend that can serve a front end and data from the backend to the front end.

## Explanations

To create a List you need only sign up with a new user, then log out. It will save the list.

If you want to save stuff to the lists then just go to either see anime or see manga and click add. Then log out and log back in. The list should be saved.

To delete just hit delete favorite list on log out. It will delete the list that is associeted with that user. 

## Commands

All commands can be executed with yarn/npm but better to stick with one when deploying.

"start"

This just starts the server. Right now id doesn't do much as I've ripped out the RESTful back end from the Front End but it still serves the production version of the front end. Though it will not have the REST stuff in it as at one point I thought we were just going to do what we did with Heroku and just point the browser to the backend and go from there.

## Files to look for

Note: This is mainly for the REST Stuff which will later be reworked to handle account stuff only later so I can authenticate. It will store passwords in bcrypt and salt them for security purposes.

### index.js

This is the backend entry point. It's how everything is setup and working.

### api.routes.js

This is how the api routes are configured for the backend.

### api.controller.js

This is how all the data is served and recieved.

### anime.model.js

This is the model for anime data. I don't allow for anime to be added, but it does have the skeleton for it.

### manga.model.js

This is the model for manga. Same as anime.

### list.model.js

This is where the list model is. It is imperitive that it is structured like this as it is how lists are saved and how they are edited.

## Client

A full README for the client can be found in the client folder.


# Endpoints

Will be re done for final project.

# GraphQL and Docker

First, if you aren't my professor and aren't already running docker, download it [here](https://docs.docker.com/get-docker/). You may have to restart if you are on Windows.

## Installation

To install you need only run ```docker-compose up -d``` after that you do need to pay attention to a few things:

1. For the front end, go to localhost:3000 and you should be greeted with its sign in page which (at the time of writing) only asks for a username. Make sure, when doing subsequent log ins, that you type the user name correctly, it currently doesn't have any logic to tell the difference between loging in or signing up.

2. For the graphql server you need only run 