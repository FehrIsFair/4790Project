# Full Stack RESTful API App

This app talks to a custom MongoDB/Mongoose backend to get data and serve it to you in the form of a "Favorite Anime/Manga List" App.

It's gets revolve around getting Anime/Manga and Lists. For Anime and Manga, its mainly by ItemType(Either Anime or Manga) ID and for Lists its both by User ID and Object ID.

This is to demonstrate my skill in created a backend that can serve a front end and data from the backend to the front end.

## Explanations

To create a List you need only sign up with a new user, then log out. It will save the list.

If you want to save stuff to the lists then just go to either see anime or see manga and click add. Then log out and log back in. The list should be saved.

To delete just hit delete favorite list on log out. It will delete the list that is associeted with that user. 

## Commands

All commands can be executed with yarn/npm but better to stick with one when deploying.

"start"

This starts the server. Easy enough.

"test"

this starts it in Nodemon for easy debugging and testing so you can immediately see changes in the code.

"postinstall"

This ensures that we get both the server's dependencies and the backends dependencies installed.

"heroku-postbuild"

This ensures that heroku builds the front end after the front end is built.

"build"

This builds the client for you.

## Files to look for

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
