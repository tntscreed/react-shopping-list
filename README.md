# React Shopping List App

## Running the project

The app requires a json-server running on port 8000. The default file used during development is `data/db.json`. To run the database, install json-server from node, then use the following command:

    npx json-server --watch data/db.json --port 8000

To run the app, use the following command:

    npm run start

The app will open on port 3000.

## Code Structure

The app is structured as follows:

- src: contains the source code of the application
  - src/App.js: the main component of the app, containing the MainPage.
  - src/apiconfig.js: contains the configuration for the json-server
  - src/api: contains the code to interact with the json-server
  - src/components: contains the React components
    - src/components/ItemForm: the form to add a new item or edit an existing one
    - src/components/ItemGrid: the grid of items, including the remove and edit buttons.
    - src/components/MainPage: the main page of the app, containing the ItemGrid and ItemForms.
