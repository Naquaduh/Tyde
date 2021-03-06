# Tyde [angular-webpack]

[![Dependency Status](https://david-dm.org/Naquaduh/Tyde.svg)](https://david-dm.org/Naquaduh/Tyde.svg#info=dependencies) [![devDependency Status](https://david-dm.org/Naquaduh/Tyde/dev-status.svg)](https://david-dm.org/Naquaduh/Tyde/dev-status.svg#info=devDependencies)



A complete, yet simple, starter for Angular and Bootstrap using Webpack.

This workflow serves as a starting point for building Angular 1.x applications using Webpack. Should be noted that apart from the pre-installed angular package, this workflow is pretty much generic.

* Heavily commented webpack configuration with reasonable defaults.
* [AngularJS](https://angularjs.org/) Application.
* [ES6](http://www.ecma-international.org/ecma-262/6.0/) support with [babel](http://babeljs.io/).
* [Bootstrap](http://getbootstrap.com/) 3 using [Sass](http://sass-lang.com/).
* Lazy loading of AngularJS modules using [ocLazyLoad](https://oclazyload.readme.io/).
* Image optimization using webpack image-loader.
* Source maps included in all builds. CSS Source maps are omitted from development build for performance concerns.
* Development server with hot module reload.
* Production builds with cache busting.
* No gulp and no grunt, just npm scripts.

>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start

> Clone/Download the repo then edit `tyde.js` inside [`/src/app/tyde.js`](/src/app/tyde.js)

```bash
# clone our repo
$ git clone https://github.com/Naquaduh/Tyde.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

go to [http://localhost:8080/](http://localhost:8080) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [License](#license)

# Getting Started

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
* Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+)

## Installing

* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Build files

* single run: `npm run build`
* build files and run serve: `npm run server`

# License

[MIT](/LICENSE)
