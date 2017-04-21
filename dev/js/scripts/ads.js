function placeAds(){
	$('<div class="card-ad">' +
		'<!-- //////////////////// Leaderboard Top \\\\\\\\\\\\\\\\\\\\ -->' +
		'<div class="advert"><div id="leaderboard-top"><script>googletag.cmd.push(function() { googletag.display("leaderboard-top"); });</script></div></div>' +
		'<!-- \\\\\\\\\\\\\\\\\\\\ Leaderboard Top //////////////////// -->' +
	'</div>')
		.insertAfter($('.card:nth-child(12)')); // Must be multiple of 12 to fit between rows
	$('<div class="card-ad">' +
		'<!-- //////////////////// Medium Rectangle 1 \\\\\\\\\\\\\\\\\\\\ -->' +
		'<div class="advert"><div id="medium-rectangle-1"><script>googletag.cmd.push(function() { googletag.display("medium-rectangle-1"); });</script></div></div>' +
		'<!-- \\\\\\\\\\\\\\\\\\\\ Medium Rectangle 1 //////////////////// -->' +
	'</div>')
		.insertAfter($('.card:nth-child(37)')); // 36 + 1 for the other ad
}