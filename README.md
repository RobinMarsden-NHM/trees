#   NHM tree ID guide

##  Dev notes

### App data

Raw data files for each candidate are stored in '~/data/candidates' and are concatenated at compile time into an array at '~/data/candidates.json'.  This acts as the master data source for the application.

This master file is created by a custom webpack plugin, '~/webpack/webpack-concat-json-plugin.js'.  Note that this only happens when a production build is triggered, so if an updated copy of the master data source is needed in the development environment it is recommended to run 'yarn build' then copy the created 'candidates.json' from 'dist/data' over to '~/data/'


### Terminology
In an attempt to keep this application general and reusable as far as possible, these generic terms are used throughout the app:

- 'Result': an individual ID result 'endpoint', eg a specific species of tree
- 'Candidate': a possible result that has not been ruled out by currently applied filters
