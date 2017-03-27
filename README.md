# Neighborhood Map
This is a single-page application to find interesting places in an area.

## Installation
1. Install node (https://nodejs.org/)
2. Install modules with `npm i`
3. Start the app with `npm start`

If you want to apply changes to the code, do this in the app/ directory.
Once all changes are applied, run `npm run build` to generate the project
in the dist/ directory or simply start the app with `npm start`.

### Setup APIs
There are 3 APIs being used in this app, 2 of which require API keys to function.
- **Google Maps** - There is already a key provided for this API, but due to security checks it might be useless from your machine. In order to fix this, you can get your API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key). Once you have it, open app/index.html and replace it right after "maps.googleapis.com/maps/api/js?key=" and before "&callback=initMap".<br/> **Note**: You may need to rebuild the project after applying this change. Check the *Installation* instructions for this.
- **Yelp** - This API uses OAuth. To make it work, look up your API credentials at [this page](https://www.yelp.de/developers/v2/manage_api_keys) (if you don't have an account yet, create one). Then go to the server/ directory within this project. Make a copy of the config.js.generic file and rename it to config.js within the same directory. Finally, fill in your credentials in the new file. **Note**: You need to restart the server for this changes to take effect.

## Technologies
- JQuery
- Bootstrap
- Knockout
- Webpack
- APIs
  - Google Maps
  - Yelp
  - Wikipedia