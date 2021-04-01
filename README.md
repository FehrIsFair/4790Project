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

# Endpoints

## /Anime / getAnime

This just gets all the anime on file, no holds bar.

## /Manga / getManga

Same as /Anime, but for the manga on file.

## /List/:uid / getList

This gets a the list for the current user. And if it doesn't find a user by that uid, then it returns a new List object to the client. It does not save until logout. To use it in Postman, you need to have the userID not sure how to give that to you.

## /Anime/:mal_id / getAnimeByMalId

This gets a single anime object that contains the given mal_id.

Examples if you use Postman, are 1, 23273, 16498

## /Manga/:mal_id / getMangabyMalId

This gets a single manga object that contains the give mal_id.

Some examples, using Postman, are: 789, 1796, 1796

## /Anime/Detail/:mal_id / getAnimeDetail

This is to get the details on the anime in question as the api I used to get this data scraps data off the site. So I have to make a separate API call to get the details I need.

You can use the same IDs given in /Anime/:mal_id.

## /Manga/Detail/:mal_id / getMangaDetail

This does the same as /Anime/Detail/:mal_id as the manga are gotten in the same way.

You can use the same IDs given in /Manga/:mal_id.

## /EditList / editFavoriteList

This is how the client sends the edited List to be saved. You would need to provide a valid ObjectID so unless you have a valid ObjectID, you won't be saving one.

## /DeleteList/:_id / deleteFavoriteList

This is how the delete enpoint works. It takes the object ID and then searches for the object and then deletes it.

Again, need a valid object ID.

## /CreateList / createNewFavoriteList

This is the endpoint that saves all new Lists from new users.

Here is where you can sort of fake it. You can send the data via sending a body in Postman. Then using your fake uid, can call it with /List, edit it with /EditList and delete it with /DeleteList as you will then get a valid objectID as well.