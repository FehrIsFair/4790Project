# Anime Page API (Now with API Calls!)

## Forking/Cloning Info

This project was a school assignment, copying it for academic use is prohibited.

## Features

### A fast and simple way to display info on the anime you want to watch.

# Known Issues

- No error messages for forms. Like login and sign up. There's a bit of logic missing that I have no idea what to do to fix it.

# Fixed Issues

- Ghibli Bug fixed. Added conditional rendering to the adaptation parts

# Documentation

## IMPORTANT

You must have an account to use this app. It connects via firebase and you must provide the auth keys required from firebase. Email and Password and Google Accounts are supported.

## Commands

- yarn/npm start

"yarn start" just starts the dev environment. Nothing fancy here.

THERE ARE NO BUILD COMMANDS. This is a web-app. If you wish to deploy this app you must deploy to a service like Netlify or Digital Ocean.

## Components

### Login.js and SignUp.js

Login and SignUp.js are equal parts the same and different. One just logs you in with an existing account, and the other lets you create an account. They are structured the exact same way and don't do much other than redirect you once everything has been validated correctly.

### Search.js/SearchManga.js

This is where you can see the anime on offer.

This lists all the anime in the database. You can add or remove the anime from your favorite list.

There is also a manga version of the component called SearchManga.js. It serves very much the same function but for Manga.

I took out the actual search functionality because before another api backend handled how to sort all the titles and other titles for me and I didn't want to even give any thought as I wanted to make sure I met the bare minimum first. And even then I couldn't find the time to properly do it. For example: just doing a title sort wouldn't be easy. When you search for an anime/manga, you have to take into account that there might be different titles that different fans might use for it given that when an Anime is translated into English it recieves an English title. For My Hero Academia, the Japanese title is Boku no Hero Academia. Fans who first started reading it before it was fully translated by VIZ call it by its Japanese name and there for use it in a search when searching for information. And the opposite is true as well. The data structure litterally looks like this Anime/Manga -> title:String, other_titles:Array -> value1:String, value2:String. Running a simple sort would be dificult cause now I got to figure out how a sort taking in those two fields alone would work.

### Anime.js and Manga.js

Clicking the title of a search result in Search.js/SEarchManga.js will bring you to this page. It contains a more detail look at the anime in question. And like in search, you can also add the anime/manga to a favorite list.

### FavoriteList.js

FavoriteList.js isn't perfect. If I had more time I'd make it so that it stores info in firebase and retrieves it based on the user that is currently logged in. But for now I have to deal with temp lists.

Favorite list congregates the anime the user favorited and lists them here. They aren't in any particular order, but you can activly remove and immediately get a refreshed list.

There is a switch that lets you switch between favorite manga and favorite anime. And an option to delete the favorite list upon logout. This will not work if you are a new user as there is no user to delete.

### Navigation.js

Navigation.js holds all the logic for manuvering around the sight. It conditinally renders based on if the user is logged in or not.

### Authentication.js

Authentication.js is where the context and all the logic of the previous components is stored. It's also how the user authenticates. Again, as stated above, the authentication uses firebase. You will need to make a .env file with the appropriate keys to ensure the app works correctly. This also talks to the backend to ensure lists are loaded properly and saved/upddated/deleted properly as well.

### GeneralInfo.js

GeneralInfo.js was created to simplify both Search.js and Anime.js. There was an intention to use it for FavoriteList.js but it caused an infinite loop when implemented. It holds the synopsis, title, promotional art, score, and add to/remove from favorites button.
