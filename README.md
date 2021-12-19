# CryptoGecko

![CryptoGecko's main page](sg-frontend/src/images/sg-github.JPG?raw=true "CryptoGecko")

## Table of Content

- [What is CryptoGecko](#what-is-strength-gap)
- [Installing CryptoGecko](#installing-strength-gap)
- [Running CryptoGecko](#running-strength-gap)
- [What Worked, and What Didn't](#what-needs-improving)
- [Contributions](#contributions)
- [License](#license)

## What is CryptoGecko

_A project made with React Native and TypeScript._

A simple mobile app to search and filter cryptocurrency information provided by the CoinGecko API.

It is made up of three tabs:

-The Coins tab, to look through the 10.000+ cryptocurrencies in existence, with information regarding their logo, name, symbol, current price, market cap, and percentage changes (1h/24h/7d).

-A tab to view the Top 100 Coins by Trading Volume; pretty self-explanatory.

-Finally, a tab to view Global Market information.

You can refine your searches in the Coins tab by filtering by name or by symbol; you can also look for exact matches by surrounding your search with quotations marks like so: "Bitcoin". Searches are case-insensitive.

## Installing CryptoGecko

All you need is git and the latest version of node.js.

First, initialize a git project and clone this repository:

    git init
    git clone https://github.com/FlyingMandarine/cryptogecko

Then, install all dependencies using npm:

    npm install

And that's it!

## Running CryptoGecko

1. First, start the app, which should open Expo in your browser.

```
npm start
```

2. Then, to start the app, use your mobile phone (Expo Go on Android, the Camera app on iOS), an Android/iOS simulator on your computer, or the web app provided by Expo in your browser. Be aware that Expo's browser simulator has a few known issues. I've tested CryptoGecko on Expo Go for Android without any issues.

## What Worked, and What Didn't

CryptoGecko is a small project made on a 3-day deadline. Here is what worked and what didn't:

:x: Automated testing: I couldn't manage to find a way to make Jest work by the time the project was due. I started this project with the Expo TypeScript template, and it came with the React Navigation library for routing purposes (I usually use React Router Native); unfortunately, the ScrollView on most of the components just wouldn't get recognized by Jest. I tried to mock it if only so I could access its contents, but wasn't able to. Short of finding a fix, the only way I could find of solving the issue was to rebuild the entire project with React Router Native; unfortunately, I run out of time to do that.

:white_check_mark: Pagination: I had already dealt with infinite-scrolling, cursor-based pagination with GraphQL and Apollo, but had never coded a regular, button-activated pagination (talk about running before learning to walk!). I couldn't find a suitable library for React Native that wasn't chock-full of functionalities I wouldn't use, so I had to make my own, hopefully bug-free.

:white_check_mark: The search bar: Also something I had to code on my own, using React Native Paper's Searchbar component as a basis. It went well, but CoinGecko's API is limited to 50 calls/minute, so there needs to be some amount of debouncing so that data isn't fetched each time a letter is entered or deleted. The trade-off is that the debouncing delays the data fetching by half a second; this might not seem like much, but with a higher API call allowance, the debouncing amount could be lowered further, allowing for a smoother experience.

:white_check_mark: Project structure: I tried to give the project a good structure, using custom hooks and separating components into smaller pieces to keep each file relatively small (under 150 lines). I made sure to fetch data as little as possible by preventing unnecessary re-renders; it worked well overall, but if I had had some more time, I would have polished a couple of useEffect hooks that still triggered too often for my taste.

## Contributions

The crypto API was kindly provided by CoinGecko at https://www.coingecko.com/.

All code by me, Patrice Hermenault. Any bugs, questions or suggestions, feel free to reach out at hermenaultpatrice@gmail.com.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
