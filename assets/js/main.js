/*
	This is the Main Java Script File! This Defines some general logic
*/

(function($) {
	
	var	$window = $(window),
		$body = $('body');

	// Breakpoints of website for different sizes
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ], 	//Large Screens, Monitors, etc.
			large:   [ '981px',   '1280px' ],	//Usually lare Laptops, large Tablets.
			medium:  [ '737px',   '980px'  ],	// Normal tablets and large Phones/Foldables maybe.
			small:   [ null,      '736px'  ]	// Phones and anything smaller than that
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdown Logic for the Navigation
		function initializeDropdowns() {
			const nav = document.querySelector('#nav > ul');

			if (!nav || !window.jQuery || !jQuery.fn.dropotron) {
				return;
			}

			// Prevent accidental duplicate initialization.
			if (jQuery(nav).data('dropotron-initialized')) {
				return;
			}

			jQuery(nav).data('dropotron-initialized', true);

			jQuery(nav).dropotron({
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'left',
				detach: true,
				offsetX: 0,
				offsetY: 0,
				globalOffsetY: 0
			});
		}

		document.addEventListener('siteHeaderLoaded', initializeDropdowns);

})(jQuery);