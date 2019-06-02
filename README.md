## literate-octo-fortnite

[![CircleCI](https://circleci.com/gh/StigAkl/literate-octo-fortnite/tree/master.svg?style=svg)](https://circleci.com/gh/StigAkl/literate-octo-fortnite/tree/master)

This is a server rendered react app for sorting skins based on REAL rarity (i.e sort by last seen). 
## How to run
1. Set ```useDatabase: false``` in src/config.json
2. Run ```npm run dev```. Since this is server side rendering it uses the production build. This command is configured to create a production build of the react app and then boot up an express server on port 3001. 
3. Visit http://localhost:3001/home 