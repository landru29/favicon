angular.module("favicon", []);

angular.module("favicon").directive("faviconInjector", ["favicon", function (favicon) {
    return {
        restrict: "A",
        link: function(scope, element) {
            "use strict";
            scope.$on("favicon-set-progress", function() {
                element.attr("href", favicon.getHref());
            })
        }
    };
}])

angular.module("favicon").provider("favicon", function () {
    "use strict";
    var MovingIcon = function MovingIcon(rootScope, options) {
         this.options = options;
         this.rootScope = rootScope;
         this.canvas = window.document.createElement("canvas");
         this.canvas.height = this.options.height || 32;
         this.canvas.width = this.options.width || this.canvas.height;
         this.context = this.canvas.getContext("2d");

         if (this.options.autoInject) {
             var links = window.document.head.getElementsByTagName("link");
             var hasFavicon = false;
             for (var i=0; i<links.length; i++) {
                 if (/icon/.test(links[i].getAttribute("rel"))) {
                     hasFavicon = true;
                 }
             }
             if (!hasFavicon) {
               var link = document.createElement("link");
               link.setAttribute("rel", "icon")
                  window.document.head.appendChild(link);
             }
         }
     };

     MovingIcon.prototype.getHref = function () {
         return this.canvas.toDataURL('image/png');
     }

     MovingIcon.prototype.injectLink = function () {
         var links = window.document.head.getElementsByTagName("link");
         for (var i=0; i<links.length; i++) {
             if (/icon/.test(links[i].getAttribute("rel"))) {
                 links[i].setAttribute("href", this.getHref());
             }
         }
     }

     MovingIcon.prototype.setProgress = function (fraction) {
         var centerX = this.canvas.width / 2;
         var centerY = this.canvas.height / 2;
         var radius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
         this.context.fillStyle = this.options.color || "green";
         this.context.beginPath(); // La part de gateau
         this.context.arc(centerX, centerY, radius, 0, Math.PI * 2 * fraction);
         this.context.lineTo(centerX, centerY);
         this.context.fill();
         if (this.options.autoInject) {
             this.injectLink();
         }
         this.rootScope.$broadcast("favicon-set-progress");
     }


     this.$get = ["$rootScope", function ($rootScope) {
        return new MovingIcon($rootScope,
            {
                color: this.color,
                height: this.height,
                width: this.width,
                autoInject: this.autoInject
            }
        );
    }];
});
