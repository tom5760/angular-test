Angular Test App
================

Author: Tom Wambold <tom5760@gmail.com>

A fairly simple Angular app with my preferred organization, plugins, addons,
and tests.

[View the app on GitHub.](http://tom5760.github.io/angular-test)

[![Build Status](https://travis-ci.org/tom5760/angular-test.svg?branch=master)](https://travis-ci.org/tom5760/angular-test)

Quick Start
-----------

* Install GraphicsMagick

* Install [Node.js](http://nodejs.org/).
* Install [Bower][bower] and [Grunt][grunt] to your system:

        $ npm install -g grunt-cli bower

  See the section "Installing npm modules locally" below for some (optional)
  customization of `npm install -g` locations.

* From the root of the app directory, install all the dependencies by running:

        $ npm install
        $ bower install

* To run the development server:

        $ grunt server

  This will start a server on http://localhost:3000.  It should open a browser
  tab for you automatically.  It will watch for changes in files and reload
  automatically.

* To run the unit tests:

        $ grunt test:unit

* To run the end-to-end tests (see Protractor section below for setup):

        $ grunt test:e2e

* To run all tests:

        $ grunt test

* To build a minified app:

        $ grunt

  Note: This will run all the unit tests, etc.  If you want to specifically
  skip that, you can run `grunt build` manually.

[bower]: http://bower.io/ "Bower Home Page"
[grunt]: http://gruntjs.com/ "Grunt Home Page"

Overview
--------

### File Organization

The `app` directory contains all code that I've written that will be deployed
to a user.  It's organized into components for each distinct chunk of
functionality.  Each component contains the JS/HTML/LESS it requires.  Each JS
file is included in `index.html`, and each LESS file is included in `app.less`.

The `test` directory contains unit and end-to-end tests.  The unit test
directory structure mirrors the `app` directory structure.  The end-to-end
tests are grouped by page.

### Translations

This project uses the [angular-translate](http://angular-translate.github.io/)
package to provide site-wide internationalization for the app.  Basically,
any user facing string should go in `app/components/translation/en.js`.

### Animations

This uses the `ngAnimate` module in Angular.js along with a
[LESS version](https://github.com/machito/animate.less) of
[animate.css](http://daneden.github.io/animate.css/) to provide small
animations throughout the app.  I think small, subtle animations make the site
feel a lot more pleasant to use.  Search the LESS styles for `ng-enter` and
`ng-leave` to see how the animations are implemented.

### Other Modules

The app uses the [Angular-UI Router](https://github.com/angular-ui/ui-router),
which I think is the current best choice for modeling states in your app.

It also uses the [Angular-UI Bootstrap](http://angular-ui.github.io/bootstrap/)
package (from the same group as `ui-router`).  It provides angular-native
implementations of the Bootstrap JS library.  Therefore, the Bootstrap JS files
are not required at all!

### Bower

[Bower][bower] Is used to manage versions of client-side dependencies (things
like Angular).  It is similar to [NPM][npm], which manages build system
dependencies in our usecase.

 * Search for a package:

        $ bower search <LIB>

  * Install a package, saving it to `bower.json`.

        $ bower install --save <LIB>

  * View installed packages (and show outdated versions):

        $ bower list

**NOTE:** If the version number in `bower.json` has any symbols in it, such as
a tilde (~2.5.4) or caret (^1.0.5), those should be removed with a text editor.
Those symbols allow Bower to install newer versions of the library then the one
specified.  I prefer all version bumps (even minor ones) to be done manually.
If there is a newer version you'd like to use, change the version number in
`bower.json` and run `bower update`.  See the
[node-semver](https://github.com/isaacs/node-semver) for more info.

### NPM

[NPM][npm] serves a similar role as Bower, but for Node.js dependencies.  In
our case, these are for the build system and testing frameworks.

 * Install a new npm module, saving it to `package.json`:

        $ npm install --save-dev <LIB>

  * View outdated packages:

        $ npm outdated | grep -v ' > '

The same note about symbols in versions numbers in Bower applies here.  Please
ensure that no version strings have symbols in them.

[npm]: http://www.npmjs.org/ "NPM Home Page"

### Grunt

[Grunt][grunt] is a build automation tool for Node.js.  It's equivalent to
something like Make, Ant, or Maven.  It has a bunch of plugins for
minification, test running, etc.  It's configured in `Gruntfile.js`.  Run
`grunt --help` to list all possible tasks.

### End-to-end Testing

Check out the [Protractor docs](https://github.com/angular/protractor/blob/master/docs/toc.md)
for a decent overview of it's functionality.  In particular, the
[Page Object Pattern](https://github.com/angular/protractor/blob/master/docs/page-objects.md)
is extremely useful.  Essentially, perform any sort of element selectors in
page objects, and use those in your tests, to encapsulate changes to your HTML
in a single spot.

Also, the [Selenium API docs](http://selenium.googlecode.com/svn/trunk/docs/api/java/index.html?overview-summary.html)
are useful.

To-Do
-----

* Use "strict-DI" mode in minified builds.
  * https://github.com/angular/angular.js/commit/4b1695ec61aac8de7fcac1dfe8b4b420f9842c38

Notes
-----

### Setting up Protractor

Protractor depends on Selenium, which requires a Java installation.  Make sure
you have the `java` command on your `PATH` by running `java -version`.

### Installing npm modules locally

You can customize the location to with `npm install -g` installs modules.
Create a `.npmrc` in your home directory, and put something similar to the
following in it:

    prefix=/home/tom/programs/npm
    tmp=/home/tom/programs/npm/tmp

Then, add the equivalent of `/home/tom/programs/npm/bin` to your `PATH`.

If your system installed default version of Python is not version 2 (type
`python --version` to find out), then add something like the following to your
`.npmrc`.

    python=/usr/bin/python2
