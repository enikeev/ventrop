(function(){
	var app = {
		tabs: function(){

			$('.js-tab-wrap').on('click', '[data-tab-link]', function(e){
				e.preventDefault();
				var $t = $(this);

				if ( !$t.hasClass('active') ){
					var ind = $t.data('tab-link'),
						$wrap = $t.closest('.js-tab-wrap'),
						$link = $wrap.find('[data-tab-link]'),
						$item = $wrap.find('[data-tab-item]'),
						$itemActive = $wrap.find('[data-tab-item=' + ind + ']');

					$link.filter('.active').removeClass('active');
					$item.filter('.active').removeClass('active');
					$t.addClass('active');
					$itemActive.addClass('active');

					if ( $itemActive.find('.gallery').size() ){
						$itemActive.find('.gallery').owlCarousel({
							margin:10,
							mouseDrag: false,
							loop: true,
							nav: true,
							items:3,
							autoWidth:true
						});
					}
				}
			});

		},

		advantageSlider: function(){
			var $slider = $('.advantage-slider');

			$slider.owlCarousel({
				margin:200,
				mouseDrag: false,
				items:1,
				autoWidth:true,
				onInitialized: function(){
					var l = this._items.length, $dots = this.$element.find('.owl-dots'), $dot = $dots.find('.owl-dot');
					$dot.width(100 / l + '%');
					var $trigger = $('<div class="owl-line"><div class="owl-line__trigger"></div></div>');
					$dots.after($trigger);
					triggerCheck();
				},
				onTranslate: function(){
					var path = ''
				},
				onTranslated: function(){
					var ind = $slider.find('.owl-item').filter('.active').index();
					$('.advantage-nav__link')
						.filter('.active')
						.removeClass('active')
						.closest('.advantage-nav')
						.find('li')
						.eq(ind)
						.find('.advantage-nav__link')
						.addClass('active');
				//	triggerCheck();
				}
			});

			$('.advantage-nav__link').click(function(){
				if ( !$(this).hasClass('active') ){
					var ind = $(this).parent().index();
					$('.advantage-nav__link').filter('.active').removeClass('active');
					$(this).addClass('active');

					$slider.trigger('to.owl.carousel', [ind, 300]);
					triggerCheck(ind, true);
				}
			});

//			var slWdth = $slider.find('.owl-stage').width();

	//		console.log(itms);

			$(document).on('mousedown', '.owl-line__trigger', function(e){
				var $this = $(this), x1, x2, current = '', line = $this.closest('.owl-line');
				var lnWdth = $slider.find('.owl-controls').width();
				var itms = $slider.find('.owl-dot').length;

				x1 = e.pageX;

				$('body').addClass('no-user-select');

				$(document).mousemove(function(e){
					x2 = e.pageX;
					x = x2-x1;

					line.width( line.width() + x );
					var ind = Math.floor(line.width() / (lnWdth / itms)) ;

					if ( current !== ind ){
						current = ind;
						console.log( ind );
						$slider.trigger('to.owl.carousel', [ind, 300]);
					}

					x1 = x2;
					return x1;
				});

				$(document).mouseup(function(){
					$(document).off('mousemove');
					$('body').removeClass('no-user-select');
					triggerCheck(current, false);
				});
			});

			function triggerCheck(n, anim){
				var $tr = $slider.find('.owl-line');
				var $dot = $slider.find('.owl-dot');
				var $dotAct = $dot.filter('.active');

				if ( n ) {
				//	$tr.width($dot.eq(n).position().left + $dot.eq(n).width()/2);
					if ( !anim ){
						$tr.css({'width': ($dot.eq(n).position().left + $dot.eq(n).width()/2)});
					} else {
						$tr.stop(true, true).animate({'width': ($dot.eq(n).position().left + $dot.eq(n).width()/2)});
					}
				} else {
				//	$tr.width($dotAct.position().left + $dotAct.width()/2);
					if ( !anim ){
						$tr.css({'width': ($dotAct.position().left + $dotAct.width()/2)});
					} else {
						$tr.stop(true, true).animate({'width': ($dotAct.position().left + $dotAct.width()/2)});
					}
				}

				return
			}

		},

		init: function(){
			if ( $('.advantage-slider').size() ){ app.advantageSlider(); }
			if ( $('.objects-info .info-item.active .gallery').size() ){
				$('.objects-info .info-item.active .gallery').owlCarousel({
					margin:10,
					mouseDrag: false,
					loop: true,
					nav: true,
					items:3,
					autoWidth:true
				});
			}
			app.tabs();

			$('select').selectbox();

			$('.header-scrolldown').click(function(){
				$('html,body').animate({scrollTop:$('section.brands-line').offset().top}, 300);
			});

			$('section.objects-info .left, section.objects-info .right').mCustomScrollbar();

			$('.brands .brands-list .brands-item .info .text').mCustomScrollbar();

			$('.brands-item .img').click(function(){
				var $t = $(this);
				var info = $t.siblings('.info');
				info.fadeIn();
			});

			$('.brands-item .info .close').click(function(e){
				$(this).closest('.info').fadeOut(300);
			});
			$('.brands-item .info').click(function(e){
				if ( !$(e.target).closest('.info__inner').length ){
					$(this).fadeOut(300);
				}
			});

			if ( $('.fancybox').size() ){
				$('a.fancybox').fancybox({
					'transitionIn'	:	'elastic',
					'transitionOut'	:	'elastic',
					'speedIn'		:	600,
					'speedOut'		:	200,
					'overlayShow'	:	false
				});
			}
		}
	};

	var appLoad = function(){
		jQuery.app = app;
		app.init();
	};
	var appInt = setInterval(function(){
		if (typeof jQuery !== 'function') return;
		clearInterval(appInt);
		jQuery(function(){ appLoad(); });

	}, 50);

})();