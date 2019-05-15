$(function() {

    // page on load
    window.onload = page_load;

    // window load, resize and scroll function
    $(window).add(".main-container").on("load resize", function() {
        var screen_width = $(this).width();
        //screen_height = $(this).height();
        if (screen_width > 1680) {
            $(".main-container").addClass("is-narrow");
        } else {
            $(".main-container").removeClass("is-narrow");
        }
    });

    // initialize nano scroller
    $(".nano").nanoScroller().find(".nano-slider").css({
        "background" : colors.pink,
        "background" : "linear-gradient(" + colors.violet + ", " + colors.pink + ")"
    });

    /*
    var scene = new ScrollMagic.Scene({
        triggerElement: ".avatar",  
        triggerHook: 0.9,           // this fires first 0.9 from bottom thats 90% height of viewport from top
        duration: "90%",            // this fires second when elements leaves the viewport at 90% which means before reaching 100% height of viewport from top
        reverse: false,
    })
    .setClassToggle(".avatar", "fade-in")
    .addIndicators({
        name: "trigger",
        colorTrigger: "black",
        colorStart: "green",
        colorEnd: "red",
    })
    .addTo(controller);
    */

    // initialize scroll magic
    var controller = new ScrollMagic.Controller({
        container: ".main-container"
    });

    // parallax on scroll
    var home_parallax = new TimelineMax();
    home_parallax
    .to("#intro-text", 2, { yPercent: 95, ease: Power0.easeNone })
    .to("#svg-mouse-scrolling-icon", 2, { yPercent: 200, ease: Power0.easeNone }, 0)
    .to(".cloud-left", 2, { yPercent: 20, ease: Power0.easeNone }, 0)
    .to(".cloud-right", 2, { yPercent: 20, ease: Power0.easeNone }, 0)
    .to(".cloud-big", 2, { yPercent: 10, ease: Power0.easeNone }, 0)
    .to(".greetings", 2, { yPercent: 20, ease: Power0.easeNone }, 0);
    var parallax_scene = new ScrollMagic.Scene({
        triggerElement: "#about",
        triggerHook: 1,      
        duration: "100%"
    })
    .setTween(home_parallax)
    .addTo(controller);
    var testimonals_scene = new ScrollMagic.Scene({
        triggerElement: ".testimonals-container",
        triggerHook: 1,      
        duration: "150%"
    })
    .setTween(TweenMax.from(".bg-testimonals", 2, { y: "-50%", ease: Power0.easeNone }))
    .addTo(controller);

    // title container on scroll
    $(".title-container").find("h1").each(function() {
        var title_scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.9,
            reverse: false,
        })
        .setClassToggle(this, "animate-tracking-in-contract")
        .addTo(controller);
    });

    // pinned sections on scroll
    var about_pinned = [
        ".timeline-container",
        ".dots"
    ];
    $.each(about_pinned, function(key, el) {
        var about_pinned_scene = new ScrollMagic.Scene({
            triggerElement: ".about-start-pinned",
            triggerHook: 0,      
            duration: "100%"        
        })
        .setPin(this, { pushFollowers: false })
        .addTo(controller); 
    });
    var skills_pinned_scene = new ScrollMagic.Scene({
        triggerElement: ".pinned-proficiency-graphics",
        triggerHook: 0,      
        duration: "100%"        
    })
    .setPin(".pinned-proficiency-graphics", { pushFollowers: false })
    .addTo(controller);
    var portfolio_pinned_scene = new ScrollMagic.Scene({
        triggerElement: ".web-container",
        triggerHook: 0,      
        duration: "100%"        
    })
    .setPin(".web-container", { pushFollowers: false })
    .addTo(controller);

    // slide on sccroll 
    var slide_in = {
        title: ".bar",
        about: [
            "#avatar",
            "#greetings",
            "#objective",
            ".iphone-container",
            ".timeline"
        ],
        skills: [    
            "#macbook-web",
            "#macbook-graphics",
            "#proficiency-web",
            "#proficiency-graphics",
        ],
        portfolio: [
            "#portfolio-title",
            "#portfolio-subtitle",
            "#gurkka",
            "#greg-timbol",
            "#ultra-upload",
            "#testimonals-title",
            "#testimonals-subtitle",
            "#quote-icon",
            "#message",
            "#messenger"
        ],
        contact: "#contact-form"
    };
    $.each(slide_in, function(key, el) {
        $(el).map(function() {
            var slide_in_scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9,
                reverse: false
            })
            // slide in left
            if ($(this).hasClass("from-left")) {
                slide_in_scene
                .setClassToggle(this, "animate-slide-in-left")
                .addTo(controller);            
            }
            // slide in right
            if ($(this).hasClass("from-right")) {
                slide_in_scene
                .setClassToggle(this, "animate-slide-in-right")
                .addTo(controller);  
            }
            // slide in bottom
            slide_in_scene
            .setClassToggle(this, "animate-slide-in-bottom")
            .addTo(controller);
        });
    });

    // vibrate text on scroll
    var vibrate_scene = new ScrollMagic.Scene({
        triggerElement: "#contact-title",
        triggerHook: 1,
    })
    .setClassToggle("#contact-title", "animate-vibrate")
    .addTo(controller); 

    // chart on scroll
    var chart = [
        "#chart-web",
        "#chart-graphics"
    ];
    $.each(chart, function(key, el) {
        var chart_scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
        })
        .on("enter", function() {
            setTimeout(function() {
                $(el).find(".chart-progress").each(function() {
                    var id = "#" + $(this).attr("id");
                    circle_chart(id);
                }); 
            }, 500); 
        })
        .addTo(controller);
    });

    // variable declaration for grid items
    var $reveal_button = $("#view-more"),
        $hide_element = $("#testimonals, #contact, #footer"),
        $grid_items, 
        get_items, 
        get_items_html, 
        all_items = [],
        all_items_class = [],
        all_items_href = [],
        all_items_html = [],
        reveal_items = [],
        visible_items = 12;

    // initialize type.js
    var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        smartBackspace: true,
        loop: true,
        backSpeed: 40,
        typeSpeed: 40,
        backDelay: 2000,
    });

    // initialize isotope
    var $grid = $("#grid").isotope({
        itemSelector: "none",
        percentPosition: true,
        stagger: 30,
        masonry: {
            columnWidth: ".grid-col-sizer",
            gutter: ".grid-gutter-sizer",
        },
        visibleStyle: { transform: "translateY(0)", opacity: 1 },
        hiddenStyle: { transform: "translateY(100px)", opacity: 0 },
    });

    var $items = $grid.find(".grid-item");

    // initialize fancybox
    $items.add(".card-img-wrapper").fancybox({
        animationEffect: "zoom-in-out",
        protect: true,
        image: {
            preload: true
        }
    });

    // initalize imagesLoaded
    $grid.imagesLoaded(function() {
        $grid.removeClass("img-unloaded");
        $grid.isotope("option", { itemSelector: ".grid-item" });
        $grid.isotope("appended", $items);
    });

    // append items function
    var append_items = function(items) {
            
        get_items = items.splice(0, visible_items);
        get_items_html = get_items.map(function(value) {
            return value;
        });

        if (!get_items.length) {
            return;
        }

        if (items.length == 0) {
            $reveal_button.hide();
        } else {
            $reveal_button.show();
        }
        
        $grid_items = $(get_items_html.join(""));

        $grid_items.imagesLoaded(function() {

            $grid.append($grid_items);

            // initialize tilt for grid items
            $grid_items.tilt({
                maxTilt: 10,
                glare: true,
                maxGlare: 0.4
            });

            $grid.isotope("appended", $grid_items);

            $hide_element.removeClass("d-none");

        }).addClass("animate-fade-in");
   
    };

    // load grid items then remove those items and save to array
    $items.each(function(index) {
        all_items_class[index] = $items.eq(index).attr("class");
        all_items_href[index] = $items.eq(index).attr("href");
        all_items_html[index] = $items.eq(index).html();
        all_items[index] = "<a class='" + all_items_class[index] + "' data-fancybox='grid-item' href='" + all_items_href[index] + "'>" + all_items_html[index] + "</a>";
        reveal_items.push(all_items[index]);
        $items.eq(index).remove();
    });

    // filter option function
    $("#filter-options").change(function() {
        var filter_value = this.value;
        $hide_element.addClass("d-none");
        $grid.find(".grid-item").remove();
        reveal_items = [];
        $.each(all_items, function(index, el) {
            if (el.indexOf(filter_value) > -1) {
                reveal_items.push(all_items[index]);
            }
        });
        append_items(reveal_items);
        $grid.isotope("layout");
    });

    // view more button function
    $reveal_button.click(function(e) {
        e.preventDefault();
        append_items(reveal_items);
    });

    // run functions
    append_items(reveal_items);

    // form textboxes animate when focus
    $("#txt-name, #txt-email, #txtarea-msg").focus(function() {
        $(this).parent().css({
            "box-shadow" : "0 0 10px 0 " + colors.dark_blue
        }).removeClass("focusout").addClass("focus");
    }).focusout(function() {
        $(this).parent().css({
            "box-shadow" : "none"
        }).removeClass("focus").addClass("focusout"); 
    }).keyup(function() {
       
    }); 

    $("#btn-submit").click(function() {
        if ($("#txt-name").val() == "" && $("#txt-email").val() == "" && $("#txtarea-msg").val() == "") {
            $(".modal-body p").html("The fields are empty. Please fill up the form.");
            $("#modal-dialog-box").modal("toggle");
           return false;
        }
    });

    $(".web-wrapper a").click(function(e) {
        if ($(this).attr("href") == "#") {
            e.preventDefault();
            $(".modal-body p").html("The website dont exist anymore. Thank you.");
            $("#modal-dialog-box").modal("toggle");
        }
    });

});