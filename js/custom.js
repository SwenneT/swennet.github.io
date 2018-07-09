( function( $ ) {

	/*
	* Replace all SVG images with inline SVG
	*/
	$('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if ( typeof imgClass !== 'undefined' ) {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});

	$(document).ready( function() {

		$('.navigation').on('click', 'a', function(event) {
			$('.navigation a.active').removeClass('active');
			$(this).addClass('active');
		});

		$(window).on('scroll', function() {
			if ( $(window).scrollTop() > 0 ) {
				$('body').addClass('scrolled');
			} else {
				$('body').removeClass('scrolled');
			}
		});

	});

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
	
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});


} )( jQuery );