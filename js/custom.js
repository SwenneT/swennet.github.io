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
	
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});

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

		$(window).scroll( $.debounce( 100, checkCurrentSection ) );

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
			}, 2000);

			loop();  

		}, rand);

	}());

	(function loop2() {
		var min = 10000,
			max = 30000,
			rand = Math.floor(Math.random() * (max - min) + min);

		var thisShield = $('#meteor-1');

		setTimeout(function() {
	
			thisShield.removeClass('fall');
	
			setTimeout( function() {
				thisShield.addClass('fall');
			}, 2000);

			loop2();  

		}, rand);

	}());

	(function loop3() {
		var min = 5000,
			max = 30000,
			rand = Math.floor(Math.random() * (max - min) + min);

		var thisShield = $('#meteor-2');

		setTimeout(function() {
	
			thisShield.removeClass('fall');
	
			setTimeout( function() {
				thisShield.addClass('fall');
			}, 2000);

			loop3();  

		}, rand);

	}());

	$.fn.scrollStopped = function(callback) {
		var that = this, $this = $(that);
		
		$this.scroll( $.debounce( 50, function(ev) {
			clearTimeout($this.data('scrollTimeout'));
			$this.data('scrollTimeout', setTimeout(callback.bind(that), 50, ev));
			console.log('testest');
		}));

	};

	$(window).on('scroll', $.throttle( 100, function() {
		$('body').addClass('scrolling');
		//window.pJSDom[0].pJS.particles.move.enable = false;
	}));

	$(window).scrollStopped( $.debounce( 100, function() {
		$('body').removeClass('scrolling');

		console.log('test');
	}));

} )( jQuery );