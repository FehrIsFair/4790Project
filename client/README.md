# Anime Page API (Now with API Calls!)

## Forking/Cloning Info

This project was a school assignment, copying it for academic use is prohibited.

## Features

### A fast and simple way to display info on the anime you want to watch.

# Known Issues

- No error messages for forms. Like login and sign up. There's a bit of logic missing that I have no idea what to do to fix it.

# Documentation

## IMPORTANT

You must have an account to use this app. Besure to type your username correctly upon subsequent logins.

## Commands

- yarn/npm start

"yarn start" just starts the dev environment. Nothing fancy here.

There are build commands but this entire Front end has been dockerized so there isn't a need for one.

## Components

### Login.js and SignUp.js

Login and SignUp.js are equal parts the same and different. One just logs you in with an existing account, and the other lets you create an account. They are structured the exact same way and don't do much other than redirect you once everything has been validated correctly.

However, right now, SignUp.js has be stripped from the program entirely for the time being. It will be back once custom authentication has been implemented.

### Search.js/SearchManga.js

This is where you can see the anime on offer.

This lists all the anime in the database. You can add or remove the anime from your favorite list.

There is also a manga version of the component called SearchManga.js. It serves very much the same function but for Manga.

The search functionality may or may not be there by the time you grade it. I'm currently coming up with a solution to search stuff.

### Anime.js and Manga.js

Clicking the title of a search result in Search.js/SearchManga.js will bring you to this page. It contains a more detail look at the anime in question. And like in search, you can also add the anime/manga to a favorite list.

### FavoriteList.js

Favorite list congregates the anime the user favorited and lists them here. They aren't in any particular order, but you can activly remove and immediately get a refreshed list.

There is a switch that lets you switch between favorite manga and favorite anime. And an option to delete the favorite list upon logout. This will not work if you are a new user as there is no user to delete.

### Navigation.js

Navigation.js holds all the logic for manuvering around the sight. It conditinally renders based on if the user is logged in or not.

### Authentication.js

Authentication.js is where the context and all the logic of the previous components is stored. It's also how the user authenticates. Again, as stated above, the authentication uses firebase. You will need to make a .env file with the appropriate keys to ensure the app works correctly. This also talks to the backend to ensure lists are loaded properly and saved/upddated/deleted properly as well.

### GeneralInfo.js

GeneralInfo.js was created to simplify both Search.js and Anime.js. There was an intention to use it for FavoriteList.js but it caused an infinite loop when implemented. It holds the synopsis, title, promotional art, score, and add to/remove from favorites button.
