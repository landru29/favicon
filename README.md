# Favicon

Dynamic favicon to display progress

## Installation
```
    bower install https://github.com/landru29/favicon.git
```

## Usage

### Example

```
    angular.module("MyApp", ["favicon"]);

    angular.module('MyApp').config(function(faviconProvider) {
        "use strict";
        faviconProvider.setOptions({
            color: "blue",
            height: 32,
            width: 32,
            autoInject: false,
            type: "donut",
            successColor:"green",
            failureColor:"red",
            border: false
        });
    });

    angular.module('MyApp').controller("MyCtrl", function (favicon) {
        "use strict";
        favicon.setProgress(0.5);
        favicon.setFailure();
        favicon.setSuccess();
        favicon.restore();
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

### Provider options
| Field        | Type           | Description  |
|--------------|----------------|--------------|
|  color       | css color      | Color of the progress. If "rainbow" is specify, the color will be computed with the progress |
| height       | Integer        | Height of the icon |
| width        | Integer        | Width of the icon |
| autoInject   | Boolean        | Let the plugin inject of do it by yourself |
| type         | String         | Shape (donut / pie) |
| successColor | css color      | Success background |
| failureColor | css color      | Failure background |
| border       | boolean        | Display a border ? |

### Functions

#### restore
Restore the original favicon

#### setProgress(fraction)
Display the favicon progress

#### setSuccess()
Display the success favicon

#### setFailure()
Display the failure favicon

#### setOptions(options)
Rewrite options

#### getContext()
Get the canvas context to design your own icon

#### repaint()
Repaint your icon. This is used when you want to design your own icon

#### getSize(filter)
Get some dimensions. If filter is not set, get an object with all dimensions.
if filter is dimension name, get this dimensions. This is used when you want to design your own icon
```
    favicon.getSize();
    favicon.getSize("centerX");
```

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
