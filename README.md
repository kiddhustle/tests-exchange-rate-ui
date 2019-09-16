# Currency rate table

You are creating an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) of a currency rate table. It's a React-based web application which displays the currency rates in a table that is sortable.

## Setup

Follow these steps to setup the app:

1. `npm install` – install dependencies
2. `npm test` – run all tests in watch mode (should fail unless you implement the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

# Task

Use the fetch API to request 'api/rates.json' and render it inside a sortable table.

The table by default should be sorted by the first column ascending.

The table can only be sorted by one column at a time.

Clicking on a header column should sort the table by that column.

Clicking on a header column that is already sorted should invert the sort direction.

You need to get all tests passing.