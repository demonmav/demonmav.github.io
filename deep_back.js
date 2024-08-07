/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

// those previous functions is for what will happen when there is a collision



// Grab the canvas
const canvas_back = document.querySelector("canvas.back");

var w = window.innerWidth;
var h = window.innerHeight;

function resize_canvas() {
    canvas_back.width = w;
    canvas_back.height = h;
};

resize_canvas();

window.addEventListener("resize", resize_canvas);

const m = canvas_back.getContext("2d");

// Getting the distance in betweeen circles
// with the help of pythegoreon theorem
function distance(xa, ya, xb, yb) {
    var distanceX = xa - xb;
    var distanceY = ya - yb;

    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
};

class circles_Yard {
    constructor(x, y, dx, dy, radius, color, mass) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: Math.random() - 8,
            y: Math.random() - 8
       };
        this.radius = radius;
        this.color = color;
        this.mass = mass;

        this.draw = () => {
            m.beginPath();
            m.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            m.lineWidth = 3;
            m.strokeStyle = "whitesmoke";
            m.stroke();
            m.fillStyle = this.color;
            m.fill();
        };

        this.update = () => {
            if (this.x + this.radius > w + this.radius || this.x - this.radius < 0 - this.radius) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.y + this.radius > h + this.radius || this.y - this.radius < 0 - this.radius) {
                this.velocity.y = -this.velocity.y;
            }

            for (var i = 0; i < circles_arraY.length; i++) {
                // if the object equals itself just continue, break the loop
                if (this === circles_arraY[i]) {
                     continue;
                }

                // this code findes the distance between all points
                // it's all about the pythegreon theorem
                // if the distance between this object and any other...
                // circle canvasCircles[i] is less than twice the radius, do that
                // this what will happen when the distance between two circles is less..
                // than twice the radius.. collision
                if (distance(this.x, this.y, circles_arraY[i].x, circles_arraY[i].y) - this.radius * 2 < 0) {
                     resolveCollision(this, circles_arraY[i]);
                }
           };

            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;

            this.draw();
        };
    };
};

var circles_arraY = [];
for (let i = 0; i < 20; i++) {
    var x, y, dx, dy, radius, color, mass;
    x = Math.random() * w;
    y = Math.random() * h;
    dx = 8;
    dy = 8;
    radius = 30;
    color = "tomato";
    mass = 10;


    // keep circles apart and i don't have an idea about this yet !!
     // before you push a circles with all its prop, do that
     if (i !== 0) {
        // making a for loop limited with canvasCircles length
        for(var j = 0; j < circles_arraY.length; j++) {
             // check if the distance is less than twise the raidus
             // x and y are just created

             // if the distance between this just created x and y...
             // and any other circles canvasCircles[j] is less than twice the radius
             if (distance(x, y,circles_arraY[j].x,circles_arraY[j].y) - radius * 2 < 0) {
                  x = Math.random() * innerWidth;
                  y = Math.random() * innerHeight;
                  j = -1;
             }
        }
   };


    circles_arraY.push(new circles_Yard(x, y, dx, dy, radius, color, mass))
};

function animate(t) {
    requestAnimationFrame(animate)
    m.clearRect(0, 0, w, h)
        

        for (let i = 0; i < circles_arraY.length; i++) {
            circles_arraY[i].update();
        }
};

animate();



// the responsive navbar
