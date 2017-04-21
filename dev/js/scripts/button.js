$(window).scroll(function() {
	if ($(window).scrollTop() > 100) {
		$(".totop-button").fadeIn("slow");
	} else {
		$(".totop-button").fadeOut("fast");
	}
});

$('.totop-button').click(function(){
	$('html,body').animate({
		scrollTop: $('#mapid').offset().top - 40
	}, 1500, function(){
		$('.card').css("background","none");
	});
});