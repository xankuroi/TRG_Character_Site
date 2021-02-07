# TRG Character Sheets

This is the frontend for the TRG character sheets. The "database" is a number of Google sheets. W15 and W16 are hard-coded pages and do not pull from any sheets due to the closure of Google Sheets API v3.

Current frontend uses sheetjs to process an xlsx export of the workbook.

## New Week Setup

1. First, make a copy of the \[TEMPLATE\] TRG: Backend (W17+). Details about setting up the spreadsheet is in that spreadsheet.
2. Publish sheet to web (File -> Publish to the web)
3. Take the key from the publish link (https://docs.google.com/spreadsheets/d/e/THISISTHEKEY/pubhtml)
4. In `vue.config.js`, add the new week to the `weeks` array.
5. In `vue.config.js`, add a new entry for the week in the `pages` object.
6. Push changes to master

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Changelog

W18 - Decouple role from workbooks, allow for alternate currencies.

W17 - Complete rehaul of both backend to simplify user input and frontend to match.

W16 - Some small but important changes to make it easier to transition to the next Week.

W15 - First usage of character sites.
