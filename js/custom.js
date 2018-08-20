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

		// ParticlesJS mobile or desktop config
		if ( $.browser.mobile ) {
			var particlesConfig = 'js/particlesjs-config-mobile.json';
		} else {
			var particlesConfig = 'js/particlesjs-config.json';
		}

		/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
		particlesJS.load('particles-js', particlesConfig, function() {
			console.log('callback - particles.js config loaded');
		});

	});

	/*

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

	*/

	/*
	$.fn.scrollStopped = function( callback) {
		var that = this, $this = $(that);
		
		$this.scroll( $.debounce( 100, function(ev) {
			clearTimeout($this.data('scrollTimeout'));
			$this.data('scrollTimeout', setTimeout(callback.bind(that), 50, ev));
			console.log('testest');
		}));

	};

	$(window).on('scroll', $.throttle( 100, function() {
		$('body').addClass('scrolling');
		//window.pJSDom[0].pJS.particles.move.enable = false;
	}));

	$(window).scrollStopped( $.throttle( 100, function() {
		$('body').removeClass('scrolling');
		window.pJSDom[0].pJS.particles.move.enable = true;
		//pJSDom[0].pJS.fn.particlesRefresh();
	}));
	*/
		

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

require=function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(a){b.exports=function(b,c){var d,e,f=b.getBoundingClientRect();return c=c||0,d=f.bottom+c>0&&f.top-c<a.innerHeight,e=f.right+c>0&&f.left-c<a.innerWidth,d&&e}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(a,b,c){(function(b){var c=a("jquery"),d=a("./near-viewport.js");c.expr[":"]["near-viewport"]=function(a,c,e){var f=b.parseInt(e[3])||0;return d(a,f)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./near-viewport.js":1,jquery:"jquery"}],jquery:[function(a,b,c){(function(a){b.exports=a.jQuery}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[2]);

} )( jQuery );