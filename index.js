angular.module("favicon").provider("favicon", function () {
    var MovingIcon = function MovingIcon(options) {
         this.options = options;
         this.canvas = window.document.createElement("canvas");
         this.canvas.height = this.options.height || 32;
         this.canvas.width = this.options.width || this.canvas.height;
         this.context = this.canvas.getContext("2d");
         var links = window.document.head.getElementsByTagName("link");
         debugger;
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
     };

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
         var url = this.canvas.toDataURL('image/png');
         var links = window.document.head.getElementsByTagName("link");
         for (var i=0; i<links.length; i++) {
             if (/icon/.test(links[i].getAttribute("rel"))) {
                 links[i].setAttribute("href", url);
             }
         }
     }
     this.$get = function () {

    // let's assume that the UnicornLauncher constructor was also changed to
    // accept and use the useTinfoilShielding argument
    return new MovingIcon({
        color: this.color,
      height: this.height,
      width: this.width
    });
  };
});
