# Favicon

Dynamic favicon to display progress

## Installation
```
    bower install https://github.com/landru29/favicon.git
```

## Usage

```
    angular.module("MyApp", ["favicon"]);

    angular.module('myApp').config(function(faviconProvider) {
      faviconProvider.color = "blue"
      faviconProvider.height = 32
      faviconProvider.width = 32
    });

    angular.module('myApp').controller("MyCtrl", function (favicon) {
        favicon.setProgress(0.5);
    });
```
