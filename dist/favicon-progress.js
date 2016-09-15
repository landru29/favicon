angular.module("favicon", []);

angular.module("favicon").provider("favicon", function () {
    "use strict";
    var opts = {};
    var MovingIcon = function MovingIcon(rootScope, options) {
         this.options = angular.extend(
             {
                 color: "green",
                 height: 32,
                 width: 32,
                 autoInject: true,
                 type: "pie",
                 border: true,
                 successColor: "#53C516",
                 failureColor: "#F6491F"
             },
             options
         );
         this.rootScope = rootScope;
         this.canvas = window.document.createElement("canvas");
         this.canvas.height = this.options.height;
         this.canvas.width = this.options.width;
         this.context = this.canvas.getContext("2d");

         var links = window.document.head.getElementsByTagName("link");
         for (var i=0; i<links.length; i++) {
             if (/icon/.test(links[i].getAttribute("rel"))) {
                 this.oldHref = links[i].getAttribute("href");
             }
         }

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

     MovingIcon.prototype.restore = function () {
         this.repaint(this.oldHref);
     };

     MovingIcon.prototype.getHref = function () {
         return this.canvas.toDataURL('image/png');
     };

     MovingIcon.prototype.getSize = function (filter) {
         var size = {
             centerX: this.canvas.width / 2,
             centerY: this.canvas.height / 2,
             height: this.canvas.height,
             width: this.canvas.width
         }
         if (filter && size[filter] !== undefined) {
             return size[filter];
         }
         return size;
     };

     MovingIcon.prototype.repaint = function (href) {
         if (this.options.autoInject) {
             var links = window.document.head.getElementsByTagName("link");
             for (var i=0; i<links.length; i++) {
                 if (/icon/.test(links[i].getAttribute("rel"))) {
                     links[i].setAttribute("href", href || this.getHref());
                 }
             }
         }
         this.rootScope.$broadcast("favicon-set-progress");
     };

     MovingIcon.prototype.clearIcon = function () {
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     };

     MovingIcon.prototype.getContext = function() {
         return this.context;
     };

     MovingIcon.prototype.setProgress = function (fraction) {
         switch (this.options.type) {
             case "donut":
             this.setDonutProgress(fraction);
                break;
            default:
                this.setPieProgress(fraction);
         }
     };

     MovingIcon.prototype.getColor = function(fraction) {
         if (this.options.color !== "rainbow") {
             return this.options.color;
         }
         return "hsl(" + (fraction * 90) + ", 100%, 50%)";
     }

     MovingIcon.prototype.addCircle = function(fraction, display) {
         if (!display) {
             return;
         }
         var centerX = this.canvas.width / 2;
         var centerY = this.canvas.height / 2;
         var radius = Math.min(this.canvas.width, this.canvas.height) / 2;
         this.context.strokeStyle = this.getColor(fraction);
         this.context.lineWidth = 1;
         this.context.beginPath();
         this.context.arc(centerX, centerY, radius - this.context.lineWidth, 0, Math.PI * 2 );
         this.context.stroke();
     };

     MovingIcon.prototype.setPieProgress = function (fraction) {
         var centerX = this.canvas.width / 2;
         var centerY = this.canvas.height / 2;
         var radius = Math.min(this.canvas.width, this.canvas.height) / 2;
         this.clearIcon();
         this.context.fillStyle = this.getColor(fraction);
         this.context.beginPath();
         this.context.arc(centerX, centerY, radius, 0, Math.PI * 2 * fraction);
         this.context.lineTo(centerX, centerY);
         this.context.fill();
         this.addCircle(fraction, this.options.border);
         this.repaint();
     };

     MovingIcon.prototype.setDonutProgress = function (fraction) {
         var centerX = this.canvas.width / 2;
         var centerY = this.canvas.height / 2;
         var radius = Math.min(this.canvas.width, this.canvas.height) / 3;
         this.clearIcon();
         this.context.lineWidth = Math.min(this.canvas.width, this.canvas.height) / 4;
         this.context.strokeStyle = this.getColor(fraction);
         this.context.beginPath();
         this.context.arc(centerX,centerY,radius,0,Math.PI * 2 * fraction, false); // outer (filled)
         this.context.stroke();
         this.addCircle(fraction, this.options.border);
         this.repaint();
     };

     MovingIcon.prototype.setSuccess = function () {
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var radius = Math.min(this.canvas.width, this.canvas.height) / 2;
        this.clearIcon();
        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.options.successColor;
        this.context.fill();

        this.context.beginPath();
        this.context.lineWidth = radius / 3;
        this.context.strokeStyle = "#FFFFFF";
        this.context.moveTo(centerX * 0.5, centerY * 1.1);
        this.context.lineTo(centerX, centerY * 1.5);
        this.context.lineTo(centerX * 1.6, centerY * 0.6);
        this.context.stroke();
        this.repaint();
     };

     MovingIcon.prototype.setFailure = function () {
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var radius = Math.min(this.canvas.width, this.canvas.height) / 2;
        this.clearIcon();
        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.options.failureColor;
        this.context.fill();

        this.context.beginPath();
        this.context.lineWidth = radius / 3;
        this.context.strokeStyle = "#FFFFFF";
        this.context.moveTo(centerX * 0.5, centerY * 0.5);
        this.context.lineTo(centerX * 1.5, centerY * 1.5);
        this.context.moveTo(centerX * 1.5, centerY * 0.5);
        this.context.lineTo(centerX * 0.5, centerY * 1.5);
        this.context.stroke();
        this.repaint();
     };

     MovingIcon.prototype.setOptions = function(options) {
         angular.extend(this.options, options);
     };

     this.setOptions = function(options) {
         opts = options || {};
     };

     this.$get = ["$rootScope", function ($rootScope) {
        return new MovingIcon($rootScope, opts);
    }];
});

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
}]);
