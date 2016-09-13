
angular.module("MyApp", ["favicon"]);

angular.module('MyApp').config(function(faviconProvider) {
    "use strict";
    faviconProvider.color = "blue";
    faviconProvider.height = 32;
    faviconProvider.width = 32;
    faviconProvider.autoInject = false;
});

angular.module('MyApp').controller("MyCtrl", function (favicon) {
    "use strict";
    favicon.setProgress(0.5);
});
