$(window).scroll(function() {
    if ($(".navbar").offset().top > 150) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-brand").addClass("navbar-brand-reduce");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".navbar-brand").removeClass("navbar-brand-reduce");
    }

    var wScroll = $(this).scrollTop();

    /*
    if (wScroll > $(".about").offset().top - 50) {
        $(".kicker").fadeOut(100);
    }
    else if ($(".navbar").offset().top < 150) {
        $(".kicker").fadeIn(1000, 'swing');
    }

    if (wScroll > $(".service-info").offset().top - ($(window).height() / 2)) {
        $(".service").each(function(item) {
            setTimeout(function() {
                $(".service").eq(item).addClass("is-showing");
            }, 200 * (item + 1));
        });
    }
    if (wScroll > $(".about").offset().top - 50) {
        $(".blockquote-reverse p").addClass("is-showing");
    }
    */

    if ($(window).width() > 767) {
        $(".smoke").css({
            'transform' : 'translate(0px, ' + wScroll / -25 + '%)'
        });
        $(".logo").css({
            'transform' : 'translate(0px, ' + wScroll / 16 + '%)'
        });


        /* Poistettu käytöstä 13.7 - jotain bugia tuossa alemmalla rivillä offset().top:n kohdalla.
        if (wScroll > $('.services').offset().top - $(window).height()) {
            var opacity = (wScroll - $('.services').offset().top + ($(window).height() / 2)) / (wScroll / 4);
            $('.window-tint-2').css({'opacity': opacity});
        }
        */
    }
});

$(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});

$("body").on("click", ".navbar-collapse a", function() {
    var $this = $(this);

    setTimeout(function() {
        $this.closest(".navbar-collapse").collapse('hide');
    }, 650);
});