// Grab the canvas.nav
const canvasNav = document.querySelector(".nav");

const mn = canvasNav.getContext("2d");

// Set canvas dimensions
canvasNav.width = 150;
canvasNav.height = 150;

var line_dimensions = {
    width: 8,
    length: 40
}

horizontal_center = canvasNav.width / 2;
vertical_center = canvasNav.height / 2;

function animateNav(t) {
    requestAnimationFrame(animateNav);

    mn.beginPath();
    mn.lineCap = "round";
    mn.moveTo(horizontal_center, vertical_center);
    mn.lineTo(horizontal_center + line_dimensions.length, vertical_center + line_dimensions.length);
    mn.lineWidth = line_dimensions.width;
    mn.stroke();

    mn.beginPath();
    mn.lineCap = "round";
    mn.moveTo(horizontal_center, vertical_center);
    mn.lineTo(horizontal_center - line_dimensions.length, vertical_center - line_dimensions.length);
    mn.lineWidth = line_dimensions.width;
    mn.stroke();

    mn.beginPath();
    mn.lineCap = "round";
    mn.moveTo(horizontal_center, vertical_center);
    mn.lineTo(horizontal_center + line_dimensions.length, vertical_center - line_dimensions.length);
    mn.lineWidth = line_dimensions.width;
    mn.stroke();

    mn.beginPath();
    mn.lineCap = "round";
    mn.moveTo(horizontal_center, vertical_center);
    mn.lineTo(horizontal_center - line_dimensions.length, vertical_center + line_dimensions.length);
    mn.lineWidth = line_dimensions.width;
    mn.stroke();
    
};

animateNav();