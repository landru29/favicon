angular.module("favicon").directive("faviconInjector", function (favicon) {
    return {
        restrict: "A",
        link: function(scope, element) {
            "use strict";
            scope.$on("favicon-set-progress", function() {
                element.attr("href", favicon.getHref());
            })
        }
    };
});
