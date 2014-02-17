define(['ash', 'utils/Point'], function (Ash, Point) {
    
    var CameraControls = Ash.Class.extend({
        
        constructor: function (zoomIn, zoomOut, snapshot, zoom) {

			//keyboard
            this.zoomIn = zoomIn;
            this.zoomOut = zoomOut;
            this.snapshot = snapshot;

            //camera
            this.zoom = zoom;
            this.position = new Point(0, 0);
        }
    });

    return CameraControls;
});
