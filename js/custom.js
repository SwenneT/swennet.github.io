( function( $ ) {

	/*
	 * Replace all SVG images with inline SVG
	 * 
	 * Remove on release.
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


	/* 
	 * Scrolled Class
	 * 
	 * Adds the scrolled class to the BODY element when the page is scrolled.
	 */
	var checkScrollState = function() {
		if ( $(window).scrollTop() > 0 ) {
			$('body').addClass('scrolled');
		} else {
			$('body').removeClass('scrolled');
		}
	}


	/* 
	 * Pause Animations when View
	 * 
	 * Pauses animations when not in view.
	 */
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


	/* 
	 * Check page section
	 * 
	 * Changes the current active navigation item when section is scrolled in view.
	 */
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


	/* 
	 * Run after page is loaded.
	 */
	$(document).ready( function() {

		/* 
		 * Remove Mobile Class
		 * 
		 * Removes the default mobile class from the HTML element.
		 */
		if ( !$.browser.mobile ) {
			$('html').removeClass('mobile');
		}


		/* 
		 * Set Active Navigation
		 * 
		 * Adds the active class to a navigation item when clicked on.
		 */
		$('#navigation a[href^="#"]').on('click', function(e) {
			e.preventDefault();

			$('#navigation .active').removeClass('active');
			$('#navigation').find('a[href="' + $(this).attr('href') + '"]').addClass('active');
		});


		/* 
		 * Scroll to Element
		 * 
		 * Scroll to an element when button is clicked.
		 */
		$('a[href^="#"]').on('click', function(e) {
			e.preventDefault();
			
			$('body').addClass('scrolling');
			
		
			$($(this).attr('href'))[0].scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
	
			setTimeout( function() {				
				$('body').removeClass('scrolling');
			}, 1000);
		});

		
		/* 
		 * Fire States
		 * 
		 * Checks which page states should be fired on page load.
		 */
		checkScrollState();
		checkAnimationState();
		checkCurrentSection();


		/* 
		 * Scrolled Class
		 * 
		 * Adds the scrolled class to the BODY element when the page is scrolled.
		 */
		$(window).on('scroll', $.throttle( 250, checkScrollState ) );


		/* 
		 * Pause Animations when View
		 * 
		 * Pauses animations when not in view.
		 */
		$(window).on('scroll', $.debounce( 100, checkAnimationState ) );


		/* 
		 * Check page section
		 * 
		 * Changes the current active navigation item when section is scrolled in view.
		 */
		$(window).on('scroll', $.debounce( 100, checkCurrentSection ) );


		/* 
		 * Load ParticlesJS (Stars)
		 * 
		 * Disbled while on mobile.
		 */
		if ( $.browser.mobile == false ) {
			particlesJS.load('particles-js', 'js/particlesjs-config.json', function() {
				console.log('callback - particles.js config loaded');
			});
		}


		/* 
		 * Random Meteors
		 * 
		 * Disbled while on mobile. Drops meteors randomly on island.
		 */
		if ( !$.browser.mobile ) {
			var meteors = [false, false, false, false, false];

			/* 
			 * Random Meteors
			 */
			( function fallingMeteors() {

				var	numMeteors = 5,
					minTime = 500,
					maxTime = 10000,
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
		}


		/* 
		 * Meteor on Shield
		 */
		( function impactMeteor() {
			var minTime = 100,
				maxTime = 2000,
				randTime = Math.floor(Math.random() * (maxTime - minTime) + minTime);;

			setTimeout( function() {
				$('#island-impact').removeClass('impact');

				setTimeout( function() {
					$('#island-impact').addClass('impact');
				})

				impactMeteor();

			}, randTime);
		}());


		/* 
		 * Open modal when Github button is clicked on mobile
		 */
		$('#github-button').on('click', function(e) {
			if ( $.browser.mobile ) {
				e.preventDefault();
	
				$('#modal-container').show();
	
				setTimeout( function() {
					$('html').addClass('modal-active');
				}, 0);
			}		
		});


		/* 
		 * Go to URL when clicked continue and close modal
		 */
		$('#modal-continue').on('click', function(e) {
			e.preventDefault();

			window.open($('#github-button').attr('href'), "_blank ");

			$('#modal-cancel').click();
		});


		/* 
		 * Close Modal when clicked on cancel
		 */
		$('#modal-cancel').on('click', function(e) {
			e.preventDefault();
			$('html').removeClass('modal-active');

			setTimeout( function() {
				$('#modal-container').hide();
			}, 200);
		});


		/* 
		 * Close Modal when clicked outside
		 */
		$('#modal-container').on('mousedown', function(e) {
			e.preventDefault();
			
			if ( $(e.target).is('.modal-container') ) {
				$('#modal-cancel').click();
			}
		});
		

	});

} )( jQuery );