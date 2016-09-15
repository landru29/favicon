
angular.module("MyApp", ["favicon"]);

angular.module('MyApp').config(function(faviconProvider) {
    "use strict";
    faviconProvider.setOptions({
        color: "blue",
        height: 32,
        width: 32,
        autoInject: true,
        type: "donut",
        successColor:"green",
        failureColor:"red",
        border: false
    });

});

angular.module('MyApp').controller("MyCtrl", function ($interval, favicon) {
    "use strict";
    var progress = 0;
    var dir = 1;
    var step = 0.05;
    $interval(
        function () {
            progress += dir*step;
            if (progress > 1) {
                progress = 1;
                dir = -1;
                return;
            }
            if (progress < 0) {
                progress = 0;
                dir = 1;
            }
            favicon.setProgress(progress);
        },
        200
    );
});
