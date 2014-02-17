define(['ash'], function (Ash) {
    
    var MotionControls = Ash.Class.extend({
        
        constructor: function (left, right, jump, teleport, maxSpeed, jumpTime, jumpVelocity) {

            this.left = left;
            this.right = right;
            // this.up = up;
            // this.down = down;
            this.jump = jump;
            this.teleport = teleport;

            //values
            this.maxSpeed = maxSpeed;
            this.jumpSpeed = maxSpeed * 0.5;
            this.jumpTime = jumpTime;
            this.jumpVelocity = jumpVelocity;
            this.jumpCounter = 0;

            //flags
            this.isTeleporting = false;

            //override keyboard math
            this.touching = false;
        }
    });

    return MotionControls;
});