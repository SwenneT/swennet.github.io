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

	var checkCurrentSection = function() {
		if ( $('body').hasClass('scrolling') ) {
			return;
		}

		var sections = $('#main').children('section'),
			currentSection;

		sections.each( function() {
			var currentScrollPos = $(window).scrollTop(),
				sectionTop = $(this).offset().top - ( $(window).height() / 4 );

			if ( currentScrollPos > sectionTop ) {
				currentSection = $(this);
			}
		});

		$('#navigation .active').removeClass('active');
		$('#navigation').find('[href="#' + currentSection.attr('id') + '"]').addClass('active');
	}

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {

		anchor.addEventListener('click', function (e) {
			e.preventDefault();
		
			$('body').addClass('scrolling');
	
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});

			setTimeout( function() {
				$('body').removeClass('scrolling');
			}, 1000);

		});
	});

	$(document).ready( function() {

		checkCurrentSection();

		$('a[href^="#"]').on('click', function(event) {
			$('#navigation .active').removeClass('active');
			$('#navigation').find('a[href="' + $(this).attr('href') + '"]').addClass('active');
		});

		$(window).on('scroll', $.throttle( 250, function() {
			if ( $(window).scrollTop() > 0 ) {
				$('body').addClass('scrolled');
			} else {
				$('body').removeClass('scrolled');
			}
		}));

		$(window).scroll( $.throttle( 250, checkCurrentSection ) );

	});

	(function loop() {
		var min = 10000,
			max = 30000,
			rand = Math.floor(Math.random() * (max - min) + min);

		var thisShield = $('#island-impact');

		setTimeout(function() {
	
			thisShield.removeClass('impact');
	
			setTimeout( function() {
				thisShield.addClass('impact');
			}, 100);

			loop();  

		}, rand);

	}());

} )( jQuery );