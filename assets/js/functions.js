// color declaration
var colors = {
    violet      :   "#a31af0",
    pink        :   "#fe0072",
    dark_blue   :   "#16263f",
};

// prevent default all <a> tag with onclick attribute
$("a[onclick]").click(function(e) {
    e.preventDefault();
});

function page_load() {
    var afterTime = new Date().getTime();
    var chart = new ProgressBar.Circle("#page-loader", {
        color: "url(#gradient)",
        strokeWidth: 8,
        trailWidth: 8,
        trailColor: "transparent",
        easing: "easeInOut",
        duration: afterTime - beforeTime,
        text: {
            autoStyleContainer: false,
            style: null
        },
        step: function(state, circle) {
            var progress = Math.round(circle.value() * 100);
            if (progress === 0) {
                $(".counter").html("");
            } else {
                $(".counter").html(progress + "%");
            }
        }
    });
    chart.animate(1.0, function() {
        $(".page-loader-container").addClass("animate-fade-out");
        $(".header-container").addClass("animate-play");
        $(".intro-text-container").addClass("animate-play");
        $(".svg-mouse-scrolling-icon").addClass("animate-play");
        $(".greetings").addClass("animate-play");
        setTimeout(function() {
            $(".header-container").removeClass("animate-header animate-play");
            $(".intro-text-container").removeClass("animate-intro-text animate-play");
            $(".svg-mouse-scrolling-icon").removeClass("animate-svg-mouse animate-play");
            $(".greetings").removeClass("animate-greetings animate-play");
        }, 1500);
    });
    let linearGradient = `
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="25%" stop-color="${colors.violet}"/>
            <stop offset="75%" stop-color="${colors.pink}"/>
        </linearGradient>
    </defs>
    `
    chart.svg.insertAdjacentHTML('afterBegin', linearGradient);
}

// smooth scrolling
function scrollToSection(id) {
    $(id).animatescroll({ 
        element: ".main-container", 
        scrollSpeed: 2000, 
        easing: "easeInCubic"
    });
}

function circle_chart(el) {
    var chart = new ProgressBar.Circle(el, {
        color: "url(#gradient)",
        strokeWidth: 6,
        trailWidth: 6,
        trailColor: "rgba(0, 0, 0, 0.1)",
        easing: "bounce",
        duration: 1500,
        text: {
            autoStyleContainer: false,
        },
        step: function(state, circle) {
            var progress = Math.round(circle.value() * 100);
            if (progress === 0) {
                circle.setText("");
            } else {
                circle.setText(progress);
            }
        }
    });
    var percent = $(el).attr("data-percent");
    chart.animate((percent / 100), function() {
        
    });
    let linearGradient = `
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="25%" stop-color="${colors.violet}"/>
            <stop offset="75%" stop-color="${colors.pink}"/>
        </linearGradient>
    </defs>
    `
    chart.svg.insertAdjacentHTML('afterBegin', linearGradient);
}