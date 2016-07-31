/*
 * copyright (c) 2015 Themedo
 * Author: Themedo
 * This file is made for CURRENT TEMPLATE
*/


jQuery(document).ready(function($){

	"use strict";

	var H = jQuery( window ).height();
	var W = jQuery( window ).width();
	
	$(window).resize(function(e) {
		var H = jQuery( window ).height();
		var W = jQuery( window ).width();	
	});
	

	// -----------------------------------------------------
	// ----------------    INTRO LOADER    -----------------
	// -----------------------------------------------------
	window.onload=function() {
		$('.introLoading').fadeOut(500)
	}
	 
	
	// -----------------------------------------------------
	// -------------------    HEADER    --------------------
	// -----------------------------------------------------
	
	var headerH = $('header.td_header').data('window-height');
	
	function headerHeight(){
		var H = jQuery( window ).height();
		if(headerH == 'on'){
			$('header.td_header').css({height:H});
		}
	}
	
	headerHeight();
	jQuery(window).resize(function(e) { headerHeight(); });
	jQuery(window).load(function(e) { headerHeight(); });
	




	// -----------------------------------------------------
	// -----------------    NAVIGATION    ------------------
	// -----------------------------------------------------

	// do function
	navFunction();

	function navFunction(){

		"use strict";

		var wrapper				=       $('.td_contentwrap');
		var	wrapperinside       =       $('.td_contentinside');
		var	navType 			= 		wrapper.data('nav-type');
		var	navPosition 		= 		wrapper.data('nav-position');
		
		var	navHorPosition 		= 		wrapper.data('nav-y-position');
		var	navVerPosition 		= 		wrapper.data('nav-x-position');

		var	headerHeight 		= 		$('header.td_header').outerHeight();

		var	nav 				= 		$('nav.td_nav');
		var	navHeight 			= 		$('nav.td_nav').outerHeight(true);
		var	navHorizontal       =       $('nav.td_nav.horizontal');
		var	navVertical         =       $('nav.td_nav.vertical');
		var	navInside 			= 		$('nav.td_nav .td_navinside');

		var	navVerType 		    = 		wrapper.data('nav-ver-type');
		var	navBgcolor          =       wrapper.data('nav-bgcolor');

		//horizontal menu
		var	navSticky           =       wrapper.data('nav-hor-sticky');
		var	navBoxed            =       wrapper.data('nav-hor-boxed');
		var	navTemplate			=       nav.data('nav-template');

		var contentSections     =       $('.td_section');
		var navLink             =       nav.find('ul.td_menu > li > a');




		// remove this line after finish template
		/*if($('nav.td_nav').find('img').length != ''){if(navBgcolor == 'dark' || navBgcolor == 'currentLight' || navBgcolor == 'transDark'){$("nav.td_nav img")[0].src='img/logo-light.png';}}*/


		// scrollOffset is related to navigation height
		var scrollOffset = 0;
		
		addOffset(); $(window).resize(function(e) {addOffset();});
		function addOffset(){
			var W = jQuery( window ).width();
			
			if(W > 979){
				if(navType=='hor' && navSticky == 'on'){
					scrollOffset = navHeight-1;
				}	
			}else{
				scrollOffset = 0;	
			}
		}
		

		// -----------------------------------------------------
		// ----------------    SMOOTH SCROLL    ----------------
		// -----------------------------------------------------
	
		/**
         * This part causes smooth scrolling
         * We target all a tags inside the nav.
         */
        
		$("ul.td_menu li a[href^='#'], .todown a").on('click', function(evn){
			evn.preventDefault();
			$('html,body').scrollTo(this.hash, this.hash, {
				gap: { y: -scrollOffset },
				animation:{
					duration: 1500,
            		easing: "easeInOutExpo"
				}
			});
			return false;	
		});

		// -----------------------------------------------------
		// ---------------    LINK HIGHLIGHT    ----------------
		// -----------------------------------------------------
		
		/**
         * This part handles the highlighting functionality.
         * We use the scroll functionality again, some array creation and
         * manipulation, class adding and class removing, and conditional testing
         */
        var aChildren = $("ul.td_menu > li").find('a:first'); // find the a children of the list items
        var aArray = []; // create the empty aArray
        for (var i=0; i < aChildren.length; i++) {
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        } // this for loop fills the aArray with attribute href values

		$(window).scroll(function(){
			linkHighlight();
		});

		function linkHighlight(){
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
            var windowHeight = $(window).height(); // get the height of the window
            var docHeight = $(document).height();


            for (var i=0; i < aArray.length; i++) {
                var theID = aArray[i];
				var div = $(theID);
				if(div.length){
					var divPos = $(theID).offset().top; // get the offset of the div from the top of page
					var divHeight = $(theID).height(); // get the height of the div in question
					if (windowPos >= (divPos-scrollOffset-2) && (windowPos + scrollOffset + 2) < (divPos + divHeight)) {
						$("a[href='" + theID + "']").closest('li').addClass("is-active");
					} else {
						$("a[href='" + theID + "']").closest('li').removeClass("is-active");
					}
					if((windowPos+scrollOffset) < headerHeight){
						$("a[href='" + theID + "']").closest('li').removeClass("is-active");
					}	
				}
                
            }

            if(windowPos + windowHeight == docHeight) {
                if (!$("ul.td_menu > li:last-child").hasClass("is-active")) {
                    var navActiveCurrent = $(".is-active").find('a:first').attr("href");
                    $("a[href='" + navActiveCurrent + "']").closest('li').removeClass("is-active");
					if(!navHorizontal.hasClass('temp-b')){
						$("ul.td_menu > li:last-child").addClass("is-active");
					}else{
						$("ul.td_menu.right > li:last-child").addClass("is-active");
					}
                }
            }
		}




		// -----------------------------------------------------
		// ----------------    VERTICAL NAV    -----------------
		// -----------------------------------------------------
		
		if(navType == 'ver'){
			nav.css({height:H});
			navInside.css({height:H});
		}


		// SCROLL & BGIMG & GRADIENT

		sbg(); $(window).resize(function(e) {sbg();});

		function sbg(){
			var H = jQuery( window ).height();

			$('nav.td_nav.vertical .td_navinside').css({height:H});
			$('nav.td_nav.vertical .scrollable').css({height:H});
			$("nav.td_nav.vertical .scrollable").niceScroll({
				touchbehavior:false,
				cursorwidth:0,
				autohidemode:true,
				cursorborder:"0px solid #fff"
			});

			// some fixes
			var bottomWrapHeight = $('.td_navinside .td_nav_bottomwrap').outerHeight(true,true);
			var topWrapHeight = H - bottomWrapHeight;
			$('.td_navinside .td_nav_topwrap').css({minHeight:topWrapHeight});

			// vertical nav (wrap with span)
			var navSpan = $('nav.td_nav.vertical ul.td_menu li').find('span');
			if(navSpan.length == ''){$('nav.td_nav.vertical ul.td_menu li a').wrap('<span></span>');}

		} // end of sbg();



		// submenu
		jQuery('nav.td_nav.vertical ul.td_menu li').each(function(index, element) {
			var subMenu = jQuery(this).children('ul');
			if(subMenu.length){

				var childI = jQuery(this).children('i');
				if(!childI.length){
					jQuery(this).append('<i class="xcon-angle-down"></i>');
				}

				jQuery(this).children('i').on('click', function(e) {
				   e.preventDefault();
				   if(!jQuery(this).parent('li').hasClass('opened')){
						jQuery(this).parent('li').addClass('opened');
						jQuery(this).parent('li').children('ul').slideDown();
						jQuery(this).removeClass('xcon-angle-down').addClass('xcon-angle-up')
					}else{
						jQuery(this).parent('li').removeClass('opened');
						jQuery(this).parent('li').children('ul').slideUp();
						jQuery(this).removeClass('xcon-angle-up').addClass('xcon-angle-down')
					}
					
					return false;
				});
			}
		});

		
		
		// menuonly
		var	menuonly = $('nav.td_nav .td_menuonly');
		
		
		
		// windowmenu
		var	windowmenu = $('nav.td_nav .td_windowmenu');
		windowmenu.css({height:H, width:W});
		windowmenu.find('div.td_fake_table').css({height:H});
		
		
		
		
		// nav trigger
		$('.td_nav .td_navtrigger a').on('click', function(e) {
			e.preventDefault();
			if(!$('nav.td_nav.vertical').hasClass('opened')){
				$('nav.td_nav.vertical').addClass('opened');
				$(this).addClass('opened');
				if(navVerType == 'invisible-2'){wrapperinside.addClass('opened');}
				if(navType == 'menuonly'){menuonly.fadeIn();}
				if(navType == 'windowmenu'){windowmenu.fadeIn();}
			}else{
				$('nav.td_nav.vertical').removeClass('opened');
				$(this).removeClass('opened');
				wrapperinside.removeClass('opened');
				if(navType == 'menuonly'){menuonly.fadeOut();}
				if(navType == 'windowmenu'){windowmenu.fadeOut();}
			};
			return false;
		});
		
		
		if((navType == 'ver' && navVerType == 'invisible') || (navType == 'ver' && navVerType == 'invisible-2') || navType == 'menuonly' || navType == 'windowmenu'){
			$('nav.td_nav.vertical ul.td_menu li a').on('click', function(e) {
                $('nav.td_nav.vertical').removeClass('opened');
				$('.td_nav .td_navtrigger a').removeClass('opened');
				wrapperinside.removeClass('opened');
				if(navType == 'menuonly'){menuonly.fadeOut();}
				if(navType == 'windowmenu'){windowmenu.fadeOut();}
				return false;
            });
		}
		

		// dot menu
		var	dotmenu = $('nav.td_nav .td_dotmenu');
		
		if(navType == 'dotmenu'){
			dotmenu.find('a').each(function(index, element) {
                var isSpanLabel = $(this).children('span.label');
				var isSpanDot = $(this).children('span.dot');

				if(!isSpanLabel.length){
					$(this).wrapInner('<span class="label"></span>');
				}
				if(!isSpanDot.length){
					$(this).append('<span class="dot"><span></span></span>');
				}
            });
		}
		
		
		
		
		
		// -----------------------------------------------------
		// ---------------   HORIZONTAL NAV    -----------------
		// -----------------------------------------------------
		
		if(navHorizontal.length){
			if(navSticky == 'on'){
				var windowPos = $(window).scrollTop();
				
				if(windowPos>(headerHeight+navHeight)){
					navHorizontal.stick_in_parent({
						parent: ".td_contentwrap"
					});
				}
				
				var navPos = nav.offset().top;
				$(window).scroll(function(e) {
					var windowPos = $(window).scrollTop();
					
					if(navHorPosition == 'down'){
						if(headerHeight<windowPos){
							navHorizontal.stick_in_parent({
								parent: ".td_contentwrap"
							});
						}	
					}else{
						if(navPos<windowPos){
							navHorizontal.stick_in_parent({
								parent: ".td_contentwrap"
							});
						}		
					}
	
				});
			}  // sticky menu	
		}
		
		


		// submenu for horizontal nav
		jQuery('nav.td_nav.horizontal ul.td_menu').superfish({
			delay:       200,                            // one second delay on mouseout
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
			speed:       'fast',                          // faster animation speed
			autoArrows:  false,
		});
		

		if(navType == 'hor'){if(navBoxed == 'on'){ $(".td_navinside > div").addClass('container'); }} // center aligned

		var attAppearance   =   $('.td_contentwrap').attr('data-nav-hor-appearance');
		var menuLink    	= 	navHorizontal.find('ul.td_menu > li > a');
		var offset1 		= 	menuLink.height();
		var offset2  		= 	navHorizontal.find('.td_socialwrap').height();
		var navHalfHeight  	=   (navHorizontal.find('.td_logo').outerHeight() - offset1 - 1)/2;
		var navHalfHeight2  =   (navHeight - offset2)/2;
		var menuPos         =   wrapper.data('nav-menu-pos');
		var navLogo         =   wrapper.data('nav-logo');

		
		sinxLogo(); $(window).resize(function(e) {sinxLogo();}); $(window).load(function(e) {sinxLogo();});
		
		function sinxLogo(){
			if(menuPos != 'center'){
				if(navLogo != 'off'){
					menuLink.css({paddingTop:navHalfHeight, paddingBottom:navHalfHeight});
				}
				navHorizontal.find('.td_socialwrap').css({marginTop:navHalfHeight2});
			}
	
			if(navHorizontal.hasClass('temp-b')){
				if(navLogo != 'off'){
					menuLink.css({paddingTop:navHalfHeight, paddingBottom:navHalfHeight});
				}
			}	
		}
		


		// -----------------------------------------------------
		// -------------    HORIZONTAL DOWN NAV    -------------
		// -----------------------------------------------------
		if(navType == 'hor'){
			if(navHorPosition == 'down'){
				$('header.td_header').css({marginBottom:navHeight});
				$('nav.td_nav').css({marginBottom:-navHeight});
			}
		}
		

		// -----------------------------------------------------
		// --------    HORIZONTAL NAV TRANSPARENT    -----------
		// -----------------------------------------------------
		
		if(navType == 'hor'){
			if(navHorPosition == 'top' || navHorPosition == 'bottom'){
				if(attAppearance == 'transparent'){          //transparent
					var windowPos = $(window).scrollTop();
					if(windowPos>(headerHeight+navHeight)){
						$('.td_contentwrap').attr('data-nav-hor-appearance', '');
					}
					$(window).scroll(function(e) {
						e.preventDefault();
						var windowPos  =  $(window).scrollTop();
						if(0<windowPos){ $('.td_contentwrap').attr('data-nav-hor-appearance', '');
						}else{ $('.td_contentwrap').attr('data-nav-hor-appearance', 'transparent');}
					});
				}
				if(attAppearance == 'transparent-2'){          //transparent-2
					var windowPos = $(window).scrollTop();
					if(windowPos>(headerHeight+navHeight)){
						$('.td_contentwrap').attr('data-nav-hor-appearance', '');
					}
					$(window).scroll(function(e) {
						e.preventDefault();
						var windowPos  =  $(window).scrollTop();
						if((headerHeight-navHeight-1)<windowPos){ $('.td_contentwrap').attr('data-nav-hor-appearance', '');
						}else{ $('.td_contentwrap').attr('data-nav-hor-appearance', 'transparent-2');}
					});
				}
				if(attAppearance == 'transparent-3'){          //transparent-3
					var windowPos = $(window).scrollTop();
					navInside.append('<div class="td_glass"></div>');
					navInside.find('.td_glass').css({opacity:0.08});
					if(windowPos>(headerHeight+navHeight)){
						$('.td_contentwrap').attr('data-nav-hor-appearance', '');
						navInside.find('.td_glass').addClass('scrolled');
					}
					$(window).scroll(function(e) {
						e.preventDefault();
						var windowPos  =  $(window).scrollTop();
						if((headerHeight-navHeight-1)<windowPos){ 
							$('.td_contentwrap').attr('data-nav-hor-appearance', '');
							navInside.find('.td_glass').addClass('scrolled');
						}else{ 
						$('.td_contentwrap').attr('data-nav-hor-appearance', 'transparent-3');
							navInside.find('.td_glass').removeClass('scrolled');
						}
					});
				}
			}
		}
		
		// -----------------------------------------------------
		// ----------    HORIZONTAL NAV APPEAR    --------------
		// -----------------------------------------------------
		
		if(navType == 'hor'){
			if(navHorPosition == 'top'){
				if(attAppearance == 'appear'){                   //appear
					nav.css({marginTop:-navHeight});
					$(window).scroll(function(e) {
						e.preventDefault();
						var windowPos  =  $(window).scrollTop();
						if((headerHeight-navHeight-1)>windowPos){
							nav.css({marginTop:-navHeight, opacity:0});
						}else{
							nav.css({marginTop:0, opacity:1});
						}
					});
				}
			}
	
			if(navHorPosition == 'top' || navHorPosition == 'bottom'){
				if(attAppearance == 'appear-2'){                   //appear-2
					$(window).scroll(function(e) {
						e.preventDefault();
						var windowPos  =  $(window).scrollTop();
						if((headerHeight-navHeight-1)<windowPos){
							nav.addClass('appear-2');
						}else{
							nav.removeClass('appear-2');
						}
					});
				}
			}
			
			if(navHorPosition == 'top' || navHorPosition == 'bottom'){
				if(attAppearance == 'appear-3'){                   //appear-3
					$(window).scroll(function(e) {
						e.preventDefault();
						var windowPos  =  $(window).scrollTop();
						if((headerHeight-navHeight-1)<windowPos){
							nav.addClass('appear-3');
						}else{
							nav.removeClass('appear-3');
						}
					});
				}
			}
		}


	
		// -----------------------------------------------------
		// ----------------    MOBILE MENU    ------------------
		// -----------------------------------------------------
	
		// trigger
		$('.td_mobile .td_navtrigger a').on('click', function(e) {
			e.preventDefault();
			if(!$(this).hasClass('opened')){
				$(this).addClass('opened');
				$(".td_mobile").addClass('opened');
				$('.td_contentinside').addClass('on');
			}else{
				$(this).removeClass('opened');
				$(".td_mobile").removeClass('opened');
				$('.td_contentinside').removeClass('on');
			};
			return false;
		});
		
		$('.td_mobile ul.td_menu li a').on('click', function(e) {
			$('.td_mobile .td_navtrigger a').removeClass('opened');
			$(".td_mobile").removeClass('opened');
			$('.td_contentinside').removeClass('on');
			return false;
		});
		
		
		mobNav(); $(window).resize(function(e) {mobNav();});
		function mobNav(){
			
			var H = jQuery( window ).height();
			
			// scroll for fixed mobile nav
			$(".td_mobile .td_mnwrap").css({height:H});
		
			
			$(".td_mobile .td_mnwrap").niceScroll({
				touchbehavior:true,
				cursorwidth:0,
				autohidemode:true,
				cursorborder:"0px solid #000"
			});	
			
		}
	
	}



	// -----------------------------------------------------
	// ---------------    HEADER TYPES    ------------------
	// -----------------------------------------------------
	
	// rainy day
	function td_Rainyday(){
		var $image = document.getElementById('td_rain_img');
		var $parent = document.getElementById('td_rain_box');
		
		
		var engine = new RainyDay({
			image: $image,
			parentElement : $parent,
			blur: 20,
			opacity: 1,
			fps: 24
		});
		
		engine.gravity = engine.GRAVITY_NON_LINEAR;
		engine.trail = engine.TRAIL_SMUDGE;
        engine.rain([ [3, 5, 0.1], [2, 5, 0.1] ], 30 );
	
		$image.crossOrigin = "anonymous";
	}

	$(window).load(function(e) {
        $('#td_rain_img').imageScale({
			callback: function(){
				td_Rainyday();
			}	
		});
    });
	
	
	resizeHeaderType();
	$(window).resize(function(e) {resizeHeaderType(); });
	function resizeHeaderType(){
		
		var H = $('.td_header').height();
		var W = $(window).width();
		$('.equal_height').css({height:H, width:W});	
	}
	
	
	function resizeTextHolder(){
		var H = $('.td_header').height();
		var W = $('.td_header').width();
		$('.td_header_text.type_a').css({height:H, width:W});
	}
	

	$('.simple-word, .rotate-words').each(function(index, element) {
        var tds = $(this);
		var tdsColor = tds.data('color');
		if(tdsColor){
			tds.css({color:tdsColor});	
		}
    });

	/*var tds = $('.rotate-words');
	
	for (var i=0;i<tds.length; i++) {
		var sd = tds[i];
		var tdsColor = tds.data('color');
		if(tdsColor){
			tds.css({color:tdsColor});	
		}
	}*/
	
	// -----------------------------------------------------
	// -----------------    PORTFOLIO    -------------------
	// -----------------------------------------------------
	
	td_portfolio();
	jQuery(window).resize(function(e) {td_portfolio();});
	jQuery(window).load(function(e) {td_portfolio();});
	// filterable and masonry
	function td_portfolio(){
		if(jQuery().isotope) {
			
			// Needed variables
			var list = jQuery('.td_portfolio_list');
			var filter = jQuery('.td_portfolio_filter');
				
			// Run Isotope  
			list.isotope({
				filter				: '*',
				layoutMode   		: 'masonry',
				animationOptions	: {
					duration			: 750,
					easing				: 'linear',
					queue				: false
				}
			});	
			list.isotope( 'reloadItems' );
			
			if(filter.length){
				// Isotope Filter 
				filter.find('a').on('click', function(){
					var selector = jQuery(this).attr('data-filter');
					list.isotope({ 
						filter				: selector,
						animationOptions	: {
							duration			: 750,
							easing				: 'linear',
							queue				: false
						}
					});
					return false;
				});	
				
				// Change active element class
				filter.find('a').on('click', function() {
					filter.find('a').removeClass('current');
					jQuery(this).addClass('current');
					return false;
				});	
			}
			
		}
	}
	
	$('.td_portfolio_wrap').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var list = container.find('.td_portfolio_list');
		var child = list.find('.item_holder');
		var tdClickGallery = container.data('lightbox-gallery'); 
		var tdSwitcher;
		
		// lightbox for portfolio images
		if(tdClickGallery == 'on'){ tdSwitcher = true }else{ tdSwitcher = false }
		
		list.each(function(index, element) {
			jQuery(this).magnificPopup({
				delegate: 'a.zoomer',
				type: 'image',
				overflowY: 'auto',
				fixedContentPos: false,
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true,
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				},
				gallery: {
					enabled: tdSwitcher
				},
				zoom: {
					enabled: true,
					duration: 300, // don't foget to change the duration also in CSS
					opener: function(element) {
						return element.parent().parent().find('img');
					}
				}
			});
		});
		
		
		// animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });

	
	// -----------------------------------------------------
	// -------------------    BLOG    ----------------------
	// -----------------------------------------------------
	
	td_blog();
	jQuery(window).resize(function(e) {td_blog();});
	jQuery(window).load(function(e) {td_blog();});
	// filterable and masonry
	function td_blog(){
		if(jQuery().isotope) {
			// Needed variables
			var list = jQuery('.td_blog_wrap .td_blog_list');	
			// Run Isotope  
			list.isotope({
				filter				: '*',
				layoutMode   		: 'masonry',
				animationOptions	: {
					duration			: 750,
					easing				: 'linear',
					queue				: false
				}
			});	
			list.isotope( 'reloadItems' );
		}
	}
	
	$('.td_blog_wrap').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.item_holder');
		
		// animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	
	// -----------------------------------------------------
	// -----------------    GALLERY    ---------------------
	// -----------------------------------------------------
	
	td_gallery();
	$(window).resize(function(e) {td_gallery();});
	$(window).load(function(e) {td_gallery();});
	// masonry
	function td_gallery(){
		if(jQuery().isotope) {
			// Needed variables
			var list = $('.td_gallery_wrap .td_gallery_list');	
			// Run Isotope  
			list.isotope({
				filter				: '*',
				layoutMode   		: 'masonry',
				animationOptions	: {
					duration			: 750,
					easing				: 'linear',
					queue				: false
				}
			});	
			list.isotope( 'reloadItems' );
		}
	}
	
	$('.td_gallery_wrap').each(function(index, element) {
		
		var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.item_holder');
		var tdClickGallery = container.data('lightbox-gallery'), tdSwitcher;
		
		if(tdClickGallery == 'on'){ tdSwitcher = true }else{ tdSwitcher = false }
		
		// lightbox for gallery images
		container.find('.td_gallery_list').magnificPopup({
			delegate: 'a',
			type: 'image',
			overflowY: 'auto',
			fixedContentPos: false,
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			},
			gallery: {
				enabled: tdSwitcher
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.parent().parent().find('img');
				}
			}
		});


		// animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
							setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
						});						
					},
					offset:'90%'
				})
			}
		}
		
    });
	
	
	
	
	
	
	// -----------------------------------------------------
	// ----------------    TESTIMONIAL    ------------------
	// -----------------------------------------------------

	jQuery('.td_testimonials').each(function(index, element) {
        
		var testimonial = jQuery(this);
		var carousel = testimonial.find('.carouselle');
		var autoplay = testimonial.data('autoplay');
		var trig = '';
		if(autoplay == 'on'){trig = true}else{trig = false}

		carousel.owlCarousel({
			items : 1,
			margin:50,
			responsiveClass:true,	
			autoplay:trig,
			smartSpeed:500,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			loop:true,
			dots:true,
			nav:false,
			
		});
    });
	
	
	
	
	// -----------------------------------------------------
	// ------------------    PARALLAX    -------------------
	// -----------------------------------------------------
	
	doPar(); 
	$(window).resize(function(e) {doPar();});
	function doPar(){
		$('.td_parallax_box').each(function(index, element) {
        
			var par 	   =	 $(this);
			var parRate    = 	 par.data('rate');
			var parType    = 	 par.data('type');
			var parH 	   = 	 par.outerHeight();
			var rate       =     '';
			var H          = 	 jQuery( window ).height();
			
			if(parRate <= 1){rate = parRate}else{rate = 0.5}
			
			if(parType == 'ver'){
				var ypos = (- par.offset().top + $(window).scrollTop()) * rate;
				par.css({'background-position': 'center ' + ypos  + 'px' });
				
				$(window).on('scroll', function() {
					var ypos = (- par.offset().top + $(window).scrollTop()) * rate;
					par.css({'background-position': 'center ' + ypos  + 'px' });
				});		
			}else{
				
				var xpos = (- par.offset().top + H + $(window).scrollTop()) * rate;
				par.css({'background-position': -xpos+'px top'});
				
				$(window).on('scroll', function() {
					var xpos = (- par.offset().top + H + $(window).scrollTop()) * rate;
					par.css({'background-position': -xpos+'px top' });
				});
			}
		});	
	}
	
	
	
	
	// -----------------------------------------------------
	// ------------------    BG SLIDE    -------------------
	// -----------------------------------------------------
	$('.td_bgslide_box').each(function(index, element) {
        var bs 		= $(this);
		var bsType  = bs.data('bstype');
		var xaxis  	= bs.data('xaxis');
		var yaxis  	= bs.data('yaxis');
		var bsRate  = bs.data('rate');
		var rate       =     '';
		
		if(bsRate >= 30){rate = bsRate}else{rate = 30}
		
		var x = 0;
		var y = 0;
		setInterval(function(){
			if(xaxis == '' || xaxis == 0){x+=1;}else{x-=1;}
			if(yaxis == '' || yaxis == 0){y+=1;}else{y-=1;}
			
			if(bsType == 'hor'){
				bs.css('background-position', x + 'px  0');
					
			}else if(bsType == 'ver'){
				bs.css('background-position', '0 ' + y + 'px');
					
			}else if(bsType == 'both'){
				bs.css('background-position', x + 'px ' + y + 'px');	
			}
			
		}, rate);
		
    });
	
	
	$('.td_bgcolor_box').each(function(index, element) {
        var tdt 	=   $(this);
		var tdtRate =	tdt.data('transparency');
		var tdtBg 	=	tdt.data('color');
		var rate 	= 	"";
		if(tdtRate <= 1){rate = tdtRate}else{rate = 1}
		
		tdt.css({opacity:rate, backgroundColor:tdtBg});
    });
	
	
	$('.td_gradient_box').each(function(index, element) {
        var tdg  	 =  $(this);
		var tdgAngle = 	tdg.data('angle');
		var tdgTrans =  tdg.data('transparency');
		var color1 	 = 	tdg.data('color1');
		var color2 	 = 	tdg.data('color2');
		var angle  	 = 	tdgAngle+'deg';
		
		tdg.css({
			backgroundImage: 'linear-gradient('+angle+','+color1+', '+color2+')',
			opacity:tdgTrans
		});
    });
	
	
	$('.td_mask_box').each(function(index, element) {
        var tdm 	=   $(this);
		var tdmRate =	tdm.data('transparency');
		var rate 	= 	"";
		if(tdmRate <= 1){rate = tdmRate}else{rate = 1}
		tdm.css({opacity:rate});
    });
	
	
	$('.td_snow_box').each(function(index, element) {
        var tds 	 =  $(this);
		var tdsTrans =	tds.data('transparency');
		var rate 	 = 	"";
		if(tdsTrans <= 1){rate = tdsTrans}else{rate = 1}
		tds.css({opacity:rate});
    });
	
	
	
	$('.td_btn.td_gradient').each(function(index, element) {
        var tdb  	 =  $(this);
		var tdbAngle = 	tdb.data('angle');
		var color1 	 = 	tdb.data('color1');
		var color2 	 = 	tdb.data('color2');
		var angle  	 = 	tdbAngle+'deg';

		tdb.css({ backgroundImage: 'linear-gradient('+angle+','+color1+', '+color2+')'});
    });


		
	
	
	
	// -----------------------------------------------------
	// -------------------    HOTSPOT    -------------------
	// -----------------------------------------------------
	
	function hotspot(container){
		container.find('.td_hotspot').each(function(index, element) {
            var hotspot = $(this);
			var xPos = hotspot.data('left');
			var yPos = hotspot.data('top');
			var skin = hotspot.data('hs-skin');
			var hstip = hotspot.data('hs-tooltip');
			var tippos = hotspot.data('hs-tooltip-pos');
			var detectPulse = hotspot.find('.td_h_pulse');
			
			hotspot.css({top:yPos, left:xPos})
			
			if(!detectPulse.length){hotspot.append('<div class="td_h_pulse"></div>');}
			
			if (!hotspot.hasClass('td_hs_animate')) {
				setTimeout(function(){ 
					hotspot.addClass('td_hs_animate');
					setTimeout(function(){
						hotspot.themedotip({
							fade: true,
							gravity: tippos,
							html: true,
							opacity: 1,
							offset: 10,
							trigger: hstip,
							skin: skin	
						});
					}, 600);
				}, (index * 400));
			}
        });
	}
	
	
	jQuery('.td_hotspot_container').each(function(index, element) {
        var container = $(this);
		container.waypoint({
			handler: function(){
						hotspot(container);
					},
			offset: '50%'
		});
    });
	
	
	
	
	// -----------------------------------------------------
	// -------------------    COUNTER    -------------------
	// -----------------------------------------------------
	
	$('.td_counter_wrap').each(function(index, element) {
		var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.td_counter_list > li');
		
        // animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	
	$('.td_counter').each(function(i, el) {
        var el = $(this);
		el.waypoint({
			handler: function(e){
				if(!el.hasClass('stop')){
					el.addClass('stop').countTo({
						refreshInterval: 50,
						formatter: function (value, options) {
							return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
						},	
					});
				}
			},offset:'90%'	
		})
    });
	
	
	
	
	
	// -----------------------------------------------------
	// -------------------    TOP TOP    -------------------
	// -----------------------------------------------------
	
	jQuery("a[href='#totop']").on('click', function() {
		jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});
	
	
	
	// -----------------------------------------------------
	// ----------------    ROTATE WORDS    -----------------
	// -----------------------------------------------------
	
	var rotate_words = $('.rotate-words');
	var	interval = 3000;
	
	rotate_words.each(function(i, el) {
        var rw = $(this);
		if(rw.length) {
			var animation = rw.data('animation');
			interval = parseInt(rw.data("interval"), 10);
			rw.textrotator({
				animation: animation, // dissolve, maya, spin
				separator: ",",
				speed: interval
			});
		}
    });		
	
	
	// -----------------------------------------------------
	// -----------------    PROGRESS BAR    ----------------
	// -----------------------------------------------------
	function tdProgress(container){
		container.find('.td_progress').each(function(i, el) {
			var progress = $(this);
			var pValue = parseInt(progress.data('value'), 10);
			var pColor = progress.data('color');
			var pBarWrap = progress.find('.td_bar_wrap');
			var pBar = progress.find('.td_bar');
			pBar.css({width:pValue+'%', backgroundColor:pColor});
			setTimeout(function(e){pBarWrap.addClass('open');},(i*500));
		});
	}
	
	
	$('.td_progress_wrap').each(function(i, el) {
		var pWrap = $(this);
		pWrap.waypoint({handler: function(e){tdProgress(pWrap);},offset:'90%'});	
	});
	
	
	
	// -----------------------------------------------------
	// ---------------    IMAGE COMPORISON    --------------
	// -----------------------------------------------------
	$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
    $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.5, orientation: 'vertical'});
	
	
	
	
	// -----------------------------------------------------
	// -----------------    MEMBER POPUP    ----------------
	// -----------------------------------------------------
	
	$('.td_member_holder .img_holder a').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		overflowY: 'auto',
		closeBtnInside: true,
		closeOnBgClick: true,
		midClick: true,
		removalDelay: 300,
		callbacks: {
			beforeOpen: function() {
			   this.st.mainClass = this.st.el.attr('data-effect');
			},
		},
	});
	
	
	// -----------------------------------------------------
	// -----------------    SOCIAL LIST    ----------------
	// -----------------------------------------------------
	
 	function sl(el){
		el.each(function(index, element) {
			var sl = $(this);
			var slChild = sl.find('li a');
			var sltip = sl.data('tooltip');
			var tippos = sl.data('tooltip-pos');
			
			if(sltip != 'off'){
				slChild.themedotip({
					fade: true,
					gravity: tippos,
					html: true,
					opacity: 1,
					offset: 10,
					trigger: 'hover',
					skin: sltip	
				});	
			}	
		}); 
	}
	var tdslme = $('.social-list');
	sl(tdslme);
	
	$('.social-list').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('li > a');
		
		// animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	$('.td_social_list').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('li > a');
		
		// animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });

	
	// -----------------------------------------------------
	// ----------------    CONTACT FORM    -----------------
	// -----------------------------------------------------
	jQuery(".td_message_submit").on('click', function(){
		var name 		= jQuery(".contact_form #name").val();
		var email 		= jQuery(".contact_form #email").val();
		var message 	= jQuery(".contact_form #message").val();
		var subject 	= jQuery(".contact_form #subject").val();
		var success     = jQuery(".contact_form .returnmessage").data('success');
	
		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields	
		if(name==''||email==''||message==''){
			//alert("Please Fill Required Fields"); 
			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else{
			// Returns successful data submission message when the entered information is stored in database.
			jQuery.post("modal/contact.php",{ xx_name: name, xx_email: email, xx_message:message, xx_subject: subject}, function(data) {
				
				jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph
				
				
				if(jQuery(".contact_form .returnmessage span.contact_error").length){
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
				}else{
					jQuery(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>")
					jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
				}
				
				if(data==""){
					jQuery("#contact_form")[0].reset();//To reset form fields on success
				}
				
			});
		};
		return false;
	 
	});
	
	
	
	// -----------------------------------------------------
	// -----------    RESERVATION FORM (SALON)   -----------
	// -----------------------------------------------------
	// book online
	jQuery('a.book_salon').each(function(index, element) {
		jQuery(this).magnificPopup({
			type: 'ajax',
			fixedContentPos: false,
			overflowY: 'auto',
			closeBtnInside: true,
			closeOnBgClick: false,
			midClick: true,
			removalDelay: 300,
			callbacks: {
				beforeOpen: function() {
				   this.st.mainClass = this.st.el.attr('data-effect');
				},
				ajaxContentAdded: function(){
					jQuery(".book_submit").on('click', function(){
						var name 		= jQuery(".book_online_form #name").val();
						var email 		= jQuery(".book_online_form #email").val();
						var date 		= jQuery(".book_online_form #reservation-date").val();
						var time 		= jQuery(".book_online_form #reservation-time").val();
						var message 	= jQuery(".book_online_form #message").val();
						var contact 	= jQuery(".book_online_form #contact").val();
						var success     = jQuery(".book_online_form .returnmessage").data('success');
					
						jQuery(".book_online_form .returnmessage").empty(); //To empty previous error/success message.
						//checking for blank fields	
						if(name==''||email==''||contact==''||date==''||message==''){
							//alert("Please Fill Required Fields"); 
							jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
						}
						else{
							// Returns successful data submission message when the entered information is stored in database.
							jQuery.post("modal/book_salon.php",{ xx_name: name, xx_email: email, xx_date: date, xx_time: time, xx_message:message, xx_contact: contact}, function(data) {
								
								jQuery(".book_online_form .returnmessage").append(data);//Append returned message to message paragraph
								
								
								if(jQuery(".book_online_form .returnmessage span.book_error").length){
									jQuery(".book_online_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
								}else{
									jQuery(".book_online_form .returnmessage").append("<span class='book_success'>"+ success +"</span>")
									jQuery(".book_online_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
									setTimeout(function(){  $.magnificPopup.close() }, 5500);
								}
								
								if(data==""){
									jQuery(".book_online_form")[0].reset();//To reset form fields on success
								}
								
							});
						};
					 	return false;
					});
					
					
					jQuery('.datepicker-input').each(function(index, element) {
						var firstDay = jQuery(this).data( 'first-day' ) ? jQuery(this).data( 'first-day' ) : 0,
							dateFormat = jQuery(this).data( 'date-format' ) ? jQuery(this).data( 'date-format' ) : 'mm / dd / yy';
							
						jQuery(this).children('#reservation-date').datepicker({
							dateFormat: dateFormat,
							minDate: -0,
							firstDay: firstDay
						});
					});	
					
					jQuery('.td-time-picker').each(function(index, element) {
						jQuery('#reservation-time').timePicker({
							startTime: "09.00",
							endTime: "17.30",
							show24Hours: true,
							separator: '.',
							step:30	
						});
                    });
					
					
				}, //ajaxContentAdded ended here
			},	
		});
	});
	
	
	
	// -----------------------------------------------------
	// ----------------    SWIM CONTENT    -----------------
	// -----------------------------------------------------

	$(window).scroll(function(){swimcontent();});
	swimcontent();
	function swimcontent(){
		$('.td_swim_content').each(function(i, el) {
			var swim = $(this);
			var topSpace = swim.data('topspace');
			var botSpace = swim.data('botspace');
			var d = swim.data('rate'),
			f = 0, v = 1;
			
			if(d <= 1){f = d}else{f=0}
			
			var z = $(document).height();
			var t = $(window).height();
			var e = $(window).scrollTop();

			var n = 0,
			u = swim.outerHeight(),
			h = swim.offset().top - 100,
			l = h - e,
			c = l + u,
			y = 0,
			p = t - t * (n / 100);

			if (p >= c && 0 >= l) {
				if (u > t) {
					var y = (t - c) * f;
				}else {
					var y = -(l * f);
					if(0 > y){y = 0}
				}
				var jk = (e-h+100)/u;
				v = 1-jk;
			} else {y = 0; v=1;}
			swim.children().css({
				"-webkit-transform": "translateY(" + y + "px)",
				transform: "translateY(" + y + "px)",
				"-ms-transform": "translateY(" + y + "px)"
			});
			swim.children().css({paddingTop:topSpace+'px', paddingBottom:botSpace+'px', opacity:v});
		});
	}
                


	// -----------------------------------------------------
	// -----------------    EXPANDABLE    ------------------
	// -----------------------------------------------------
	$('.td_expandable').each(function(index, element) {
        var expand = $(element);
		var etitle = expand.children('.etitle');
		var econtent = expand.children('.econtent');
		
		econtent.children().css({opacity:0});
		
		etitle.on('click', function(e){
			e.preventDefault();
			if(!expand.hasClass('open')){
				expand.addClass('open');
				econtent.slideDown(500);
				econtent.children().delay(300).animate({opacity:1});
			}else{
				expand.removeClass('open');
				econtent.children().animate({opacity:0});
				econtent.delay(300).slideUp(500);		
			};
			return false;
		})
    });

	// -----------------------------------------------------
	// ----------------    NOTIFICATION    -----------------
	// -----------------------------------------------------
	$('.td_notification').each(function(index, element) {
        $(element).find('span.closer').on('click', function(e){
			e.preventDefault();
			$(element).children().animate({opacity:0});
			$(element).delay(200).slideUp();
			return false;
		}) 
    });
	
	// -----------------------------------------------------
	// -----------------    ACCORDION    -------------------
	// -----------------------------------------------------
	$(".td_accordion").themedo_accordion({
		showIcon: false, //boolean	
		animation: true, //boolean
		closeAble: true, //boolean
        slideSpeed: 500 //integer, miliseconds
	});
	
	// animation
	$('.td_accordion').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.accordion_in');

		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });	
	
	// -----------------------------------------------------
	// -------------------    TOGGLE    --------------------
	// -----------------------------------------------------
	$('.td_toggle').each(function(index, element) {
        var expand = $(element);
		var etitle = expand.children('.tog_head');
		var econtent = expand.children('.tog_content');
		
		econtent.children().css({opacity:0});
		
		etitle.on('click', function(e){
			e.preventDefault();
			if(!expand.hasClass('open')){
				expand.addClass('open');
				econtent.slideDown(500);
				econtent.children().delay(300).animate({opacity:1});
			}else{
				expand.removeClass('open');
				econtent.children().animate({opacity:0});
				econtent.delay(300).slideUp(500);		
			};
			return false;
		})
    });
	
	// animation
	$('.td_toggle_wrap').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.td_toggle');

		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });	
	
	
	// -----------------------------------------------------
	// -----------------    EASY TABS    -------------------
	// -----------------------------------------------------
	jQuery('.td_tabs').easytabs({
		animate: true,
		animationSpeed: 400,
		updateHash: false,
		//cycle: 6000
	});
	
	
	// -----------------------------------------------------
	// --------------------    LIST   ----------------------
	// -----------------------------------------------------
	$('.td_list').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('li');

		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	// -----------------------------------------------------
	// -----------------    PROCESS   ----------------------
	// -----------------------------------------------------
	$('.td_process_wrap').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('li');

		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
				container.css({opacity:0});
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) {
							container.animate({opacity:1}, 500);
							setTimeout(function(){
								setTimeout(function(){
									$(element).addClass('animated ' + animation);
									$(element).removeClass('hideforanimation');
								}, (index*delay));	
							}, 500);
                            
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	
	// -----------------------------------------------------
	// ------------------    TIMELINE   --------------------
	// -----------------------------------------------------
	$('.td_timeline_wrap').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('li');

		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
				container.css({opacity:0});
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) {
							container.animate({opacity:1}, 500);
							setTimeout(function(){
								setTimeout(function(){
									$(element).addClass('animated ' + animation);
									$(element).removeClass('hideforanimation');
								}, (index*delay));	
							}, 500);
                            
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	// -----------------------------------------------------
	// ------------------    OPEN HOURS   ------------------
	// -----------------------------------------------------
	$('.td_openhours').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('li');

		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) {
							setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));	
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	// -----------------------------------------------------
	// -----------------    MY HISTORY    ------------------
	// -----------------------------------------------------
	$('.td_myhistory').each(function(index, element) {
        var expand = $(element);
		var etitle = expand.children('.history_head');
		var econtent = expand.children('.history_content');
		
		econtent.children().css({opacity:0});
		
		etitle.on('click', function(e){
			e.preventDefault();
			if(!expand.hasClass('open')){
				expand.addClass('open');
				econtent.slideDown(500);
				econtent.children().delay(300).animate({opacity:1});
			}else{
				expand.removeClass('open');
				econtent.children().animate({opacity:0});
				econtent.delay(300).slideUp(500);		
			};
			return false;
		})
    });
	// animation
	$('.td_myhistory_wrap').each(function(index, element) {
        var wrap = $(this);
		var child = wrap.find('.td_myhistory');
		var animation = wrap.data('animation');
		var delay = wrap.data('delay');
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				wrap.waypoint({
					handler: function(e){
						child.each(function(i, el) {
							setTimeout(function(){
								$(el).addClass('animated ' + animation);
								$(el).removeClass('hideforanimation');
							}, (i*delay));
						});
					},
					offset:'90%'
				})
			}
		}
    });
	
	// -----------------------------------------------------
	// ----------------    MODAL POPUP    ------------------
	// -----------------------------------------------------
	jQuery('.modal_box a.modal_button').each(function(index, element) {
		jQuery(this).magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			overflowY: 'auto',
			closeBtnInside: true,
			closeOnBgClick: true,
			midClick: true,
			removalDelay: 300,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			callbacks: {
				beforeOpen: function() {
				   this.st.mainClass = this.st.el.attr('data-effect');
				}
			},	
		});
	});

	
	// -----------------------------------------------------
	// -----------------    MINI BOXES    ------------------
	// -----------------------------------------------------
	tdMiniboxes(); $(window).resize(function(e) {tdMiniboxes();});
	function tdMiniboxes(){
		
		var el = $('.td_miniboxes');
		if(el.length){
			el.each(function(index, element) {
        	
				var child = $(element).children('.td_minibox');
				child.find('.minibox_icon').css({opacity:0.08});
				
				child.each(function(i, el) {
					var bgcolor = $(el).data('bgcolor');
					var mcon =  $(el).data('icon');
					$(el).css({backgroundColor:bgcolor});
					
					if(mcon == 'light'){$(el).find('.minibox_icon').css({opacity:0.2});}
				});
				child.css({height:'auto'});
				// Get an array of all element heights
				
				var W = $(window).width();
				if(W > 960){
					var elementHeights = child.map(function() {return $(this).outerHeight();}).get();
				
					// Math.max takes a variable number of arguments
					// `apply` is equivalent to passing each height as an argument
					var maxHeight = Math.max.apply(null, elementHeights);
					
					// Set each height to the max height
					child.css({height:maxHeight+'px'});	
				}
			});		
		}
	}
	
	// animation
	$('.td_miniboxes').each(function(index, element) {
    	var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.td_minibox');
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
							setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
						});						
					},
					offset:'90%'
				})
			}
		}
    });
	
	
	// -----------------------------------------------------
	// --------------    PRICING ANIMATION    --------------
	// -----------------------------------------------------
	$('.td_pricing_wrap').each(function(index, element) {
    	var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.find('.pr_column');
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
							setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
						});						
					},
					offset:'90%'
				})
			}
		}
    });
	
	
	
	
	// -----------------------------------------------------
	// -----------------    HALF BOXES    ------------------
	// -----------------------------------------------------
	tdHalfboxes(); $(window).resize(function(e) {tdHalfboxes();});
	function tdHalfboxes(){
		var el = $('.td_half_boxes');
		if(el){
			el.each(function(index, element) {
        	
				var h_media = $(element).children('.half_media');
				var h_content = $(element).children('.half_content');
				var cH = h_content.outerHeight(true);
				
				h_media.css({height:'auto'});
				
				var W = $(window).width();
				if(W > 960){
					h_media.css({height:cH});	
				}
			});		
		}
		
	}
	
	// -----------------------------------------------------
	// ------------------    COUNTDOWN    ------------------
	// -----------------------------------------------------
	
	$(".td_countdown").each(function(i, el) {
		var td_date = $(el).data('date');
        $(el).countdown({
			date: td_date,
			dayText: '',
			daySingularText: '',
			hourText: '',
			hourSingularText: '',
			minText: '',
			minSingularText: '',
			secText: '',
			secSingularText: '',
			template: '<div class="td_day time_wrap"><span class="time">%d</span><span class="text">days</span></div><div class="td_hour time_wrap"><span class="time">%h</span><span class="text">hours</span></div><div class="td_minute time_wrap"><span class="time">%i</span><span class="text">minutes</span></div><div class="td_second time_wrap"><span class="time">%s</span><span class="text">seconds</span></div>'
		});
		
    });
	
	
	// -----------------------------------------------------
	// ------------------    YTPLAYER    -------------------
	// -----------------------------------------------------
	$('.td_overlay_video').each(function(index, element) {
		var player = $(this).find('.ytvideo');
        
		
		
		var voiceTrigger = $(this).find('a.voice');

		
		player.each(function(index, element) {
            $(this).YTPlayer();
        });
		

		voiceTrigger.on('click', function(e) {
            e.preventDefault();
			
			if( $(this).hasClass("unmute") ) {				
				$(this).removeClass("unmute").addClass("mute")														
				player.unmuteYTPVolume();
				
			} else {
				
				$(this).removeClass("mute").addClass("unmute")
				player.muteYTPVolume();							
			};
			return false;
        });
    });
	
	
	// -----------------------------------------------------
	// ----------------    POPUP VIDEO    ------------------
	// -----------------------------------------------------
	jQuery('.td_popupvideo a').each(function(index, element) {
		jQuery(this).magnificPopup({
			type: 'iframe',
			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
						'<div class="mfp-close"></div>'+
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					  '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
				
				patterns: {
					youtube: {
						index: 'youtube.com/', 
						id: 'v=', 
						src: 'http://www.youtube.com/embed/%id%?autoplay=1' 
					},
					
					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: 'http://player.vimeo.com/video/%id%?autoplay=1'
					},
					
					gmaps: {
						index: '//maps.google.',
						src: '%id%&output=embed'
					},
					
					dailymotion: {
						index: 'dailymotion.com',
						id: function(url) {        
							var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
							if (m !== null) {
								if(m[4] !== undefined) {
								  
									return m[4];
								}
								return m[2];
							}
							return null;
						},
						src: 'http://www.dailymotion.com/embed/video/%id%'
					}
				
				},
				srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
			}
		});
	});

	
	// -----------------------------------------------------
	// ----------------    HTML5 VIDEO    ------------------
	// -----------------------------------------------------
	$('.td_video_selfhosted').each(function(index, element) {
        var videoplayer = $(this).find('video');
		var volume = $(this).find('a.voice');
		
		volume.on('click', function(event) {
			
			if( $(this).hasClass("unmute") ) {
								
				videoplayer.prop('muted', false);
				$(this).removeClass("unmute").addClass("mute");
		
			} else {
								
				videoplayer.prop('muted', true);
				$(this).removeClass("mute").addClass("unmute");
				
			}
			event.preventDefault();
			return false;
		}); 
    });
	
	// -----------------------------------------------------  FITVIDS	
	if(jQuery().fitVids) {jQuery(".td_video_embedded").fitVids();}
	  
	
	// -----------------------------------------------------
	// ---------------    OVERLAY VIDEO    -----------------
	// -----------------------------------------------------
	function overlay_video(){
		$('.td_video_selfhosted_overlay').each(function(index, element) {
			var wH = $(this).outerHeight();
			var wW = $(this).outerWidth();
			var vH = $(this).find('video').outerHeight();
			var vW = $(this).find('video').outerWidth();
			var dif = (vH - wH) / 2;
			var did = (vW - wW) / 2
			var videoplayer = $(this).find('video');
			if(vH > wH){
				videoplayer.css({top:-dif});	
			}else{
				videoplayer.css({left:-did});	
			}
		});	
	}
	overlay_video(); $(window).resize(function(e) { overlay_video(); });
	
	
	
	// -----------------------------------------------------
	// --------------    CLIENTS CAROUSEL    ---------------
	// -----------------------------------------------------
	jQuery('.td_clients_carousel').each(function(index, element) {
        var clients = jQuery(this);
		var autoplay = clients.data('autoplay');
		var trig = '';
		if(autoplay == 'on'){trig = true}else{trig = false}
		
		clients.owlCarousel({
			items : 6,
			slideBy:1,
			margin:50,
			responsiveClass:true,	
			responsive:{
				0:{
					items:2,
				},
				480:{
					items:3,
				},
				768:{
					items:4,
				},
				980:{
					items:5,
				},
				1200:{
					items:6,
				}
			},
			autoplay:trig,
			smartSpeed:500,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			loop:true,
			dots:false,
			nav:false,
		});
		clients.parent().find('span.ocprev').on('click',function(){clients.trigger('prev.owl'); return false;});
		clients.parent().find('span.ocnext').on('click',function(){clients.trigger('next.owl'); return false;});
		
		// animation
		var animation = clients.data('animation');
		var delay = clients.data('delay');
		var child = clients.find('.carousel-item');
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				clients.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}

    });
	
	
	// -----------------------------------------------------
	// ----------------    CLIENTS LIST    -----------------
	// -----------------------------------------------------

	$('.td_clients_list').each(function(index, element) {

        var list = $(this);
		var opacity = list.data('transparency');
		var color = list.data('color');
		var ul = list.find('ul'); 
		var li = list.find('ul li'); 
		var child = list.find('ul li a');
		var isOK = isHexaColor(color);
		var temp = list.data('temp');
		
		if(temp === 'b' || temp === 'c' || temp === 'd'){
			if(isOK === true){
				
				var rgba = convertHex(color,opacity);
				if(color.length < 7){rgba = color};
				
				if(temp === 'b'){
					child.css({background:rgba});	
				}
				if(temp === 'c' || temp === 'd'){
					li.css({borderColor:rgba});
				}
				if(temp === 'd'){
					ul.css({borderColor:rgba});
				}
				
			}else{
				alert('Please, use valid HEX color');
			}	
		}
		
		
		var animation = list.data('animation');
		var delay = list.data('delay');
		
		// animation
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				list.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
		
    });
	
	
	// -----------------------------------------------------
	// -----------------    SMOOTH SCROLL    ---------------
	// -----------------------------------------------------
	/*niceScrollInit();
	
	function niceScrollInit() {
	
		var smoothScroll    = $('body').data('smoothscrolling') !== undefined,
			root            = document.documentElement;
	
		//if (smoothScroll && !Modernizr.touch && !is_mobile_ie && !is_OSX) {
	
			var $window = $(window);		//Window object
			var cscroll = $('.customscroll');
			
	
			var scrollTime = 0.6;			//Scroll time
			var scrollDistance = 400;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
				
			$window.on("mousewheel DOMMouseScroll", function(event){
						
				var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
				var scrollTop = $window.scrollTop();
				var finalScroll = scrollTop - parseInt(delta*scrollDistance, 10);
					
				
				//cscroll.is(':hover')
				
				if($('.customscroll:hover').length == 0 && $('.time-picker ul:hover').length == 0){
					
					event.preventDefault();	
					
					TweenLite.to($window, scrollTime, {
						scrollTo : { y: finalScroll, autoKill:true },
							ease: Power1.easeOut,
							autoKill: true,
							overwrite: 5							
					});		
				}
			});
			
			
			
		//}
	
	}*/
	
	// -----------------------------------------------------
	// -------------------    CAFE MENU    -----------------
	// -----------------------------------------------------
	$('.td_cafe_menu').each(function(index, element) {
		var wrap = $(this);
		var skin = wrap.data('tip-skin');
		var pos = wrap.data('tip-pos');
		var animation = wrap.data('animation');
		var delay = wrap.data('delay');
		var child = wrap.find('li');
		
        $('.td_cafe_menu .menu_alert, .td_cafe_menu .menu_offer, .td_cafe_menu .menu_recom').each(function(index, element) {
			var alertbox = $(this);
			
			alertbox.themedotip({
				fade: true,
				gravity: pos, //"n", "s", "e", "w", "nw", "ne", "sw", "se" 
				html: true,
				opacity: 1,
				offset: 10,
				trigger: 'hover', // "hover", "click", "open"
				skin: skin	// "dark", "light"
			});
		});
		
		// animation	
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				wrap.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	

	
	// -----------------------------------------------------
	// ----------------    WORK HIGHLIGHT    ---------------
	// -----------------------------------------------------
	
	jQuery('.td_workhighlight').each(function(index, element) {
        var highlight = jQuery(this);
		var carousel = highlight.find('.whl_items');
		var autoplay = carousel.data('autoplay');
		var trig = '';
		if(autoplay == 'on'){trig = true}else{trig = false}
		
		carousel.owlCarousel({
			items : 1,
			slideBy:1,
			responsiveClass:true,
			responsive:{
				650:{
					margin:0,
				},
				768:{
					margin:-400,
				},
				800:{
					margin:-450,
				},
				900:{
					margin:-500,
				},
				1000:{
					margin:-550,
				},
				1200:{
					margin:-600,
				}
			},
			autoplay:trig,
			smartSpeed:1000,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			loop:true,
			dots:false,
			nav:false,
		});
		carousel.parent().find('span.ocprev').on('click',function(){carousel.trigger('prev.owl'); return false;});
		carousel.parent().find('span.ocnext').on('click',function(){carousel.trigger('next.owl'); return false;});
		
		// animation
		var animation = highlight.data('animation');
		var delay = highlight.data('delay');
		var child = highlight.find('.item_holder');
		var cnav = highlight.find('.td_cnav');
		
		var dd = Math.floor(child.length / 1.5);
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
				cnav.addClass('hideforanimation');
						
				highlight.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });
						
						setTimeout(function(){
							cnav.addClass('animated fadeInUp');
							cnav.removeClass('hideforanimation');	
						}, (delay * dd));
						
					},
					offset:'90%'
				})
			}
		}
		
		// lightbox
		highlight.each(function(index, element) {
			jQuery(this).magnificPopup({
				delegate: 'a.zoomer',
				type: 'image',
				overflowY: 'auto',
				fixedContentPos: false,
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true,
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				},
				gallery: {
					enabled: false
				},
				zoom: {
					enabled: true,
					duration: 300, // don't foget to change the duration also in CSS
					opener: function(element) {
						return element.parent().parent().find('img');
					}
				}
			});
		});
		
    });
	
	



	// -----------------------------------------------------
	// ------------------    INFO TAB    -------------------
	// -----------------------------------------------------
	jQuery('.td_info_tab_a').each(function(index, element) {
        
		var infotabs = $(this); 
		var play  =  infotabs.data('autoplay');
		var speed;
		if(play == 'on'){speed = 5000}else{speed = 0}
		
		jQuery(this).easytabs({
			animate: true,
			animationSpeed: 400,
			updateHash: false,
			cycle: speed
		});
		
		// animation
		var animation = infotabs.data('animation');
		var delay = infotabs.data('delay');
		var child = infotabs.find('.etabs li');
		var content = infotabs.find('.tabcontent');
		
		var dd = Math.floor(child.length / 1.5);
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
				content.addClass('hideforanimation');
						
				infotabs.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });
						
						setTimeout(function(){
							content.addClass('animated fadeInUp');
							content.removeClass('hideforanimation');
						}, (delay * dd));
						
					},
					offset:'90%'
				})
			}
		}
		
    });
	
	// -----------------------------------------------------
	// -----------------    BROCHURES    -------------------
	// -----------------------------------------------------
	$('.td_brochures').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.children('li');
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, (index*delay));
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	// -----------------------------------------------------
	// --------------    ANIMATED BLOCK    -----------------
	// -----------------------------------------------------
	$('.td_animated').each(function(index, element) {
        var container = $(this);
		var animation = container.data('animation');
		var delay = container.data('delay');
		var child = container.children('.td_animated_in');
		
		if(typeof(animation) !== 'undefined'){
			if(animation !== 'off' && animation !== ''){
				
				// this class helps to hide element till animation starts
				child.addClass('hideforanimation');
						
				container.waypoint({
					handler: function(e){
						child.each(function(index, element) { 
                            setTimeout(function(){
								$(element).addClass('animated ' + animation);
								$(element).removeClass('hideforanimation');
							}, delay);
                        });						
					},
					offset:'90%'
				})
			}
		}
    });
	
	// -----------------------------------------------------
	// ----------------    GOOGLE MAP    -------------------
	// -----------------------------------------------------
	
	if(jQuery().gmap3){
		$(".td_gmap").gmap3({
			map:{
				options:{
					zoom:14,
					center:[40.7568604,-73.989603],
					scrollwheel: false,
				}
			},
			marker:{
				values:[
				  {address:"New York Times Building, NY, USA", data:"Times Building", options:{icon: "img/marker.png"}}
				],
				options:{
				  draggable: false
				},
				events:{
				  mouseover: function(marker, event, context){
					var map = $(this).gmap3("get"),
					  infowindow = $(this).gmap3({get:{name:"infowindow"}});
					if (infowindow){
					  infowindow.open(map, marker);
					  infowindow.setContent(context.data);
					} else {
					  $(this).gmap3({
						infowindow:{
						  anchor:marker, 
						  options:{content: context.data}
						}
					  });
					}
				  },
				  mouseout: function(){
					var infowindow = $(this).gmap3({get:{name:"infowindow"}});
					if (infowindow){
					  infowindow.close();
					}
				  }
				}
			}
		});	
	}
	
	
	
	// -----------------------------------------------------
	// -----------------    HEX to RGBA    -----------------
	// -----------------------------------------------------
	function convertHex(hex,opacity){
		hex = hex.replace('#','');
		var r = parseInt(hex.substring(0,2), 16);
		var g = parseInt(hex.substring(2,4), 16);
		var b = parseInt(hex.substring(4,6), 16);
	
		var result = 'rgba('+r+','+g+','+b+','+opacity+')';
		return result;
	}
	
	// -----------------------------------------------------
	// ----------------    HEX validation   ----------------
	// -----------------------------------------------------
	function isHexaColor(color){
		var re = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
		return re.test(color);
	}

	
	// -----------------------------------------------------
	// ----------------    COLOR CHANGE    -----------------
	// -----------------------------------------------------
	
	$('.td_colorchange_box').each(function(index, element) {
        var tdt 	=   $(this);
		var idname  =	tdt.attr('id');
		var tdtTrans =	tdt.data('transparency');
		var rate 	 = 	"";
		if(tdtTrans <= 1){rate = tdtTrans}else{rate = 1}
		tdt.css({opacity:rate});
		colorTransition(tdt);
    });	
	
});





(function findDuplicateIds() {
    var ids = {};
    var all = document.all || document.getElementsByTagName("*");
    for (var i = 0, l = all.length; i < l; i++) {
        var id = all[i].id;
        if (id) {
            if (ids[id]) {
                alert("You are dublicating id: '" + id + "'. \n Dublicating id may lead to a big mess.");
            } else {
                ids[id] = 1;
            }
        }
    }
})();
