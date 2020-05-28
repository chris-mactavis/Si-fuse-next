
// Displaying the Sidebar
$(document).ready(function () {

   
    $('#close-btn').on('click', function () {
        // hide sidebar
        $('.sidebar').toggleClass('active');
    });

    $('#open-btn').on('click', function () {
        // open sidebar
        $('.sidebar').toggleClass('active');
    });
    
    // Displying the Account notification bar 
    $('#account-profile').on('click', function () {
        $('.account-container').toggle();
    });
    
});

// Displaying Modal
$('#startup-lead').change(function() {
    $('.modal').modal('show');
});

// Displaying the message box in the startup page
$('#message').on('click', function() {
    $('#st-message').toggle();
});


$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

// Displaying the notification box
$('#notification-btn').on('click', function() {
    $('.notification-box').toggle();
});

// Displaying the messages
$('#reply-btn').on('click', function() {
    $('#message-read').toggle();
    $('#message-send').toggle();
    console.log('i was clicked');
});

// Displaying the free register block
$('#btn-reg').on('click', function(e) {
    e.preventDefault();
    $('#register-free').toggle();
    $(this).hide();
});

// Displaying the payed register block
$('#btn-reg-pay').on('click', function(e) {
    e.preventDefault();
    $('#register-pay').toggle();
    $(this).hide();
});
