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

	var checkCurrentSection = function() {
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

	var checkAnimationState = function() {
		var animations = $('.animation');

		animations.each( function() {
			if ( $(this).is(':near-viewport') ) {
				$(this).removeClass('paused');
			} else {
				$(this).addClass('paused');
			}
		})
	}

	$(document).ready( function() {
		if ( !$.browser.mobile ) {
			$('html').removeClass('mobile');
		}

		checkAnimationState();
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

		$(window).scroll( $.debounce( 100, checkAnimationState ) );
		$(window).scroll( $.debounce( 100, checkCurrentSection ) );

		console.log($.browser.mobile);

		// ParticlesJS Desktop Only
		if ( $.browser.mobile == false ) {
			particlesJS.load('particles-js', 'js/particlesjs-config.json', function() {
				console.log('callback - particles.js config loaded');
			});
		}
	});

	// Random Meteors
	var meteors = [false, false, false, false, false];

	( function fallingMeteors() {

		var	numMeteors = 5,
			maxTime = 10000,
			minTime = 500,
			randTime = Math.floor(Math.random() * (maxTime - minTime) + minTime);

		setTimeout(function() {

			var randMeteor = Math.floor(Math.random() * meteors.length),
				randMeteorValue = meteors[randMeteor];

			if ( meteors[randMeteor] ) {
				fallingMeteors();
				return;
			}
			meteors[randMeteor] = true;

			$('#meteor-' + (randMeteor + 1)).removeClass('fall');

			setTimeout( function() {
				$('#meteor-' + (randMeteor + 1)).addClass('fall');
			}, 2000);

			setTimeout( function() {
				meteors[randMeteor] = false;
			}, 5000);

			fallingMeteors();

		}, randTime);

	}());

	// Random meteor impact
	( function impactMeteor() {
		var maxTime = 15000,
			minTime = 10000,
			randTime = Math.floor(Math.random() * (maxTime - minTime) + minTime);;

		setTimeout( function() {
			$('#island-impact').removeClass('impact');

			setTimeout( function() {
				$('#island-impact').addClass('impact');
			})

			impactMeteor();

		}, randTime);

	}());

} )( jQuery );