sticky-notes
============

Sample code with React and Fluxxor.

This project is broken down into sub-projects for ease of consumption

All projects utilize the following build tools:

* Node/npm
* Gulp
* Browserify
* Reactify

Additionally, the following JavaScript libraries are used

* React - http://facebook.github.io/react/
* Material UI - http://material-ui.com/#/
* JQuery - http://jquery.com/
* Less - http://lesscss.org/

# withreact

The withreact project contains a simple React-only implementation of sticky-notes.

## Building

Within the `withreact` folder, run the following

```
npm install
gulp
```

This will produce a `dist` folder with an index.html, open this in a browser to play with sticky-notes!

# withfluxxor

The withfluxxor project contains a React and Fluxxor implementation of sticky-notes including an additional
feature to show the potential benefits of a Flux architecture.

## Building

Within the `withfluxxor` folder, run the following

```
npm install
gulp
```

This will produce a `dist` folder with an index.html, open this in a browser to play with sticky-notes 2.0!
