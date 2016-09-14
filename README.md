# Favicon

Dynamic favicon to display progress

## Installation
```
    bower install https://github.com/landru29/favicon.git
```

## Usage

```
    angular.module("MyApp", ["favicon"]);

    angular.module('MyApp').config(function(faviconProvider) {
        "use strict";
        faviconProvider.color = "blue";
        faviconProvider.height = 32;
        faviconProvider.width = 32;
        faviconProvider.autoInject = true;
    });

    angular.module('MyApp').controller("MyCtrl", function (favicon) {
        "use strict";
        favicon.setProgress(0.5);
    });
```

Your Html looks like this:

```
<!DOCTYPE html>
<html lang="en" data-ng-app="MyApp" >
  <head>
    <meta charset="utf-8">
    <title>Favicon</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="/index.js"></script>
    <script src="index.js"></script>
  </head>
  <body data-ng-controller="MyCtrl">
    <!-- page content -->
  </body>
</html>
```

If you want to manage your injection, add in your html (``<head>`` section)
```
    <link data-favicon-injector rel="icon" type="image/png" href="">
```
and specify ``faviconProvider.autoInject = false``

## Developpers

### Prerequisite

You must have a sane instance of [nodejs](https://nodejs.org) and gulp (``sudo npm install -g gulp``)

### Getting the sources

After cloning the repository:

```
npm install
bower install
```

### Building

Just run gulp

```
gulp
```
