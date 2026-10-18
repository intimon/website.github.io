/*
	Escape Velocity by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
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

	
	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo h1').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);