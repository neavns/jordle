# Wordle clone 👾

This is a quick clone of the [Wordle](https://www.nytimes.com/games/wordle/index.html) game called Jordle (John + Wordle).

# Demo

![alt text](https://user-images.githubusercontent.com/32618877/176718177-4d521257-2e08-49f0-a908-ed4163d7e1db.gif "Demo")

# Tech stack

- Vanilla JavaScript on the client
- NodeJs on the server
- No database

# Technical Aspect
When we start the app it will initialise with a random word to be guessed (stored in cache) and start a cron job that updates the cache everyday at midnight.

Because this is a simple clone, there's no database. There's a defined list of words, 500 to be precise, that can be guessed which lives in a static file. Everytime the cron job runs we take current word and cache it in a `seenWords` list so that it's not repeated. Then we pick a random word from the list and set it as the new word to be guessed.

Everytime the user tries to guess the word, we make a request to the server and check if the letters are correct and are in the right place. We return two arrays, one with letter indexes that are in the correct place and one with the letter indexes that are in the word but in the wrong place. Frontend then does the rest.

We also store the progress in `localStorage` so that the user can continue from where they left off when they refresh the page. The `localStorage` is cleared every day.

## Update
After looking at the real Wordle app, I realised that they don't have a server - everything is done on the client 😱. You can also cheat and find the solution in the `localStorage`. I totally got sidetracked and forgot that this isn't supposed to be a competitive game 🤦🏻‍♂️. But nevertheless, I really enjoyed working on this.

# Getting Started
To get it up and running simply clone the repo and run the following commands

```bash
> npm i
> npm run dev
```

The app will be running on localhost:3000 🚀

# Contributing

If you want to contribute to this project, please feel free to open an issue or pull request.

## Also feel free to make a copy of this app and change it however you want 🚀