!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});
window.Beacon('init', 'a6340a1d-cb01-44b3-883c-e770e8818bb2');

//smooth page scrolling
$(function() {
    $('.scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
//status
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.ctx.com/status",
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    if (response.maintentance) {
        $("#status").addClass("status-warning");
        $(".status-large").addClass("status-warning");
        $("#status-text").text("Maintenance");
    } else {
        $("#status").addClass("status-good");
        $(".status-large").addClass("status-good");
        $("#status-text").text("Online");
    }
    $.each(response.networks, function(index, value) {
        myDate = new Date(value.lastTransactionReceivedOn).toLocaleString('en-GB', {
            timeZone: 'UTC'
        });
        coinIcon = value.currency.toLowerCase();

        console.log(myDate);
        if (value.connected) {
            status = "Connected";
        } else {
            status = "Disconnected";
        }
        $('#nodes-list').append($(`
                <div class="border p-3 mt-3 d-flex text-center node-info flex-column justify-content-between flex-md-row align-items-center">
                    <span class="title mt-1 mb-1 ms-md-2"><img src="../images/coins/${coinIcon}.png" height="30" width="30" alt="DASH"/>${value.currency}</span>
                    <span class="mt-1 mb-1"><strong>Last Block:</strong><br /> ${value.localBlockCount}</span>
                    <span class="mt-1 mb-1"><strong>Last transaction received:</strong><br /> ${myDate} UTC</span>
                    <span class="me-md-2 node-status ${status}">${status}</span>
                </div>
                `));
    });
}).fail(function() {
    $("#status").addClass("status-bad");
    $(".status-large").addClass("status-bad");
});
//viewport animate
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
$(window).on('resize scroll', function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $(".sticky").addClass("is-sticky");
    } else {
        $(".sticky").removeClass("is-sticky");
    }
    $('.animate').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('animated');
        }
    });
});
$(function() {
    $('.animate').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('animated');
        }
    });
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $(".sticky").addClass("is-sticky");
    } else {
        $(".sticky").removeClass("is-sticky");
    }
});