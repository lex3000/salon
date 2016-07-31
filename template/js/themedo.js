/*
 * copyright (c) 2015 Themedo
 * Author: Themedo
 * This file is made for CURRENT TEMPLATES
*/


jQuery(document).ready(function($){

	"use strict";
	
	
	function getIOSVersion(e) {
		return e = e || navigator.userAgent, parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(e) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || !1
	}
		
	var phone, touch, ltie9, dh, ar, fonts, ieMobile, ua = navigator.userAgent,
    winLoc = window.location.toString(),
    is_webkit = ua.match(/webkit/i),
    is_firefox = ua.match(/gecko/i),
    is_newer_ie = ua.match(/msie (9|([1-9][0-9]))/i),
    is_older_ie = ua.match(/msie/i) && !is_newer_ie,
    is_ancient_ie = ua.match(/msie 6/i),
    is_ie = is_ancient_ie || is_older_ie || is_newer_ie,
    is_mobile_ie = -1 !== navigator.userAgent.indexOf("IEMobile"),
    is_mobile = ua.match(/mobile/i),
    is_OSX = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? !0 : !1,
    iOS = getIOSVersion(ua),
    nua = navigator.userAgent,
    is_android = -1 !== nua.indexOf("Mozilla/5.0") && -1 !== nua.indexOf("Android ") && -1 !== nua.indexOf("AppleWebKit") && -1 === nua.indexOf("Chrome"),
    isAndroid = ua.indexOf("android") > -1,
    useTransform = !0,
    use2DTransform = ua.match(/msie 9/i) || winLoc.match(/transform\=2d/i),
    transform, prefixes = {
        webkit: "webkitTransform",
        firefox: "MozTransform",
        ie: "msTransform",
        w3c: "transform"
    };
	

	var H 	= 	$( window ).height();
	var W 	= 	$( window ).width();
	
	var	topbarHeight 		= 		$('.td_topbar').outerHeight(true);
	var	topbarSticky        =       $('.td_topbar').data('sticky');
	
	var scrollOffset = -1;
	addOffset(); $(window).resize(function(e) {addOffset();});
	function addOffset(){
		var W 	= 	jQuery( window ).width();
		
		if(W > 979){
			if(topbarSticky == 'on'){scrollOffset = topbarHeight;}
		}else{
			scrollOffset = -1;
		}
	}
	
	
	// smooth scrool
	$(".td_nav_bullets ul li a[href^='#'], .td_todown a").on('click', function(evn){
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
	var aChildren = $(".td_nav_bullets ul > li").find('a:first'); // find the a children of the list items
	var aArray = []; // create the empty aArray
	for (var i=0; i < aChildren.length; i++) {
		var aChild = aChildren[i];
		var ahref = $(aChild).attr('href');
		aArray.push(ahref);
	} // this for loop fills the aArray with attribute href values
	linkHighlight();
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
				/*if((windowPos+scrollOffset) < headerHeight){
					$("a[href='" + theID + "']").closest('li').removeClass("is-active");
				}*/	
			}
			
		}
	}
	
	// -----------------------------------------------------
	// -----------------    NAVIGATION    ------------------
	// -----------------------------------------------------
	
	// sticky menu
	tdSticky(); $(window).resize(function(e) {tdSticky();});
	function tdSticky(){
		var topStiky = $(".td_topbar").data('sticky');
		var W 	= 	jQuery( window ).width();
		if(topStiky == 'on'){
			if(W > 979){
				$('.td_topbar').stick_in_parent({
					parent: ".td_contentwrap"
				});	
			}else{
				$(".td_topbar").trigger("sticky_kit:detach");
			}	
		}
		
	}
	
	
	// submenu for horizontal nav
	$('nav.td_nav ul.td_nav').superfish({
		delay:       200,                            // one second delay on mouseout
		animation:   {opacity:'show'},  // fade-in and slide-down animation
		speed:       'fast',                          // faster animation speed
		autoArrows:  false,
	});
	
	sinxlogo(); 
	$(window).resize(function(e) {sinxlogo();}); 
	$(window).load(function(e) {sinxlogo();});
	
	function sinxlogo(){
		"use strict";
		var logo 	= 	$('.td_topbar .td_logo img');
		var menu 	= 	$('.td_topbar ul.td_nav > li > a');
		
		
		var header		=   $('.td_topbar_in');
		var logo		=   $('.td_logo a');
		var menu		=   $('ul.td_nav > li > a');
		var toggle		=   $('.td_topbar_in .td_mextra');
		var trigger		=   $('.td_topbar_in .td_mobile_trigger');

		// vertical position fixing
		var headerH  	= 	header.outerHeight();
		var logoH    	= 	logo.outerHeight(true);
		var menuH    	= 	menu.height();
		var toggleH  	= 	toggle.children('a').outerHeight(true);
		var offset   	= 	(logoH - menuH) / 2;
		var offset2   	= 	(logoH - toggleH) / 2;
		
		
		//logo.css({marginTop:offset});
		menu.css({paddingTop:offset, paddingBottom:offset});
		toggle.css({paddingTop:offset2});
		trigger.css({paddingTop:offset2});
	}
	
	
	
	// -----------------------------------------------------
	// ----------------    MOBILE MENU    ------------------
	// -----------------------------------------------------
	var navTrigger = jQuery('.td_mobile_trigger a');
	navTrigger.on('click', function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('opened')){
			jQuery(this).addClass('opened');	
			jQuery('.nav_mobile').slideDown();
			// hidden box
			$('.td_topbar .td_mextra a').removeClass('opened');
			$('.td_topbar .td_hidden_box').fadeOut(300).removeClass('opened');
		}else{
			jQuery(this).removeClass('opened');	
			jQuery('.nav_mobile').slideUp();
		}
	});
	
	jQuery(window).resize(function(e) {
        if(jQuery(window).width() > 979){
			jQuery('.nav_mobile').slideUp();
			jQuery('.td_mobile_trigger a').removeClass('opened');
		}
    });
	
	jQuery('.nav_mobile ul li').each(function(index, element) {
		var ghgh = jQuery(this).children('ul');
		if(ghgh.length){
			
			var test = jQuery(this).children('i');
			if(!test.length){
				jQuery(this).append('<i class="xcon-angle-right"></i>');	
			}
			
			jQuery(this).children('i').on('click', function(e) {
			   e.preventDefault();
			   if(!jQuery(this).parent('li').hasClass('opened')){
					jQuery(this).parent('li').addClass('opened');
					jQuery(this).parent('li').children('ul').slideDown();
					jQuery(this).removeClass('xcon-angle-right').addClass('xcon-angle-left')
				}else{
					jQuery(this).parent('li').removeClass('opened');
					jQuery(this).parent('li').children('ul').slideUp();
					jQuery(this).removeClass('xcon-angle-left').addClass('xcon-angle-right')
				}
			});
		} 
	});
	
	
	// -----------------------------------------------------
	// -----------------    HIDDEN BOX    ------------------
	// -----------------------------------------------------
	
	// toggle
	$('.td_topbar .td_mextra a').on('click', function(e){
		var td_mextra 		= 	$(this);
		var td_box 			= 	$('.td_topbar .td_hidden_box');
		
		if(!td_mextra.hasClass('opened')){
			td_mextra.addClass('opened');
			td_box.fadeIn(300).addClass('opened');
			//mobile nav
			jQuery('.td_mobile_trigger a').removeClass('opened');	
			jQuery('.nav_mobile').slideUp();
		}else{
			td_mextra.removeClass('opened');
			td_box.fadeOut(300).removeClass('opened');
		}
		return false;
	});
	
	// hide when clicked on page
	/*jQuery(document).mousedown(function (e) {
		var container = jQuery('.td_hidden_box');
		if (container.has(e.target).length === 0) {
			if(($('.td_topbar .td_mextra a').hasClass('opened'))){
				$('.td_topbar .td_mextra a').removeClass('opened');
				container.fadeOut(300).removeClass('opened');	
			}	
		}
		return false;
	});*/
	
	// hide when scrolled
	jQuery(document).on('scroll', function(e){
		if(($('.td_topbar .td_mextra a').hasClass('opened'))){
			$('.td_topbar .td_mextra a').removeClass('opened');
			$('.td_hidden_box').fadeOut(300).removeClass('opened');	
		}
	});
	
	
	
	// social tooltip
	var td_head_social 		= 	$('.td_topbar .td_social');
	sl(td_head_social);
	
	function sl(el){
		"use strict";
		el.each(function(index, element) {
			var sl 			= 	$(this);
			var slChild 	= 	sl.find('li a');
			var tippos 		= 	sl.data('tooltip-pos');
			
			slChild.themedotip({
				fade: true,
				gravity: tippos,
				html: true,
				opacity: 1,
				offset: 10,
				trigger: 'hover',
				skin: 'dark'	
			});		
		}); 
	}
	
	
	// -----------------------------------------------------
	// -----------------    HERO HEADER   ------------------
	// -----------------------------------------------------
	
	if(W > 768){heroheader();}
	
	$(window).resize(function(e) {if(W > 768){heroheader();}}); 
	$(window).load(function(e) { if(W > 768){heroheader();} tdIntro();});
	
	function heroheader(){
		"use strict";
		var H 				= 	$( window ).height();
		var heroheader 		= 	$('.td_heroheader');
		var topbar 			= 	$('.td_topbar');
		var topbarH 		= 	topbar.outerHeight(true);
		var offset 			= 	H - topbarH;
		
		heroheader.css({height:offset});
	}
	
	function tdIntro(){
		var todown				=   $('.td_heroheader .td_todown');
		var todownspanA			=   $('.td_heroheader .td_todown span.td_a');
		var todownspanB			=   $('.td_heroheader .td_todown span.td_b');
		var intro_bg			=   $('.td_intro_in');
		var intro_title			=   $('.td_intro_in h3');
		var intro_image			=   $('.td_intro_in .td_black_one > img');
		var intro_button			=   $('.td_intro_in a.td_btn');
		var intro_separator		=   $('.td_intro_separator');
		var intro_line			=   intro_separator.children('.line');
		var intro_butterfly		=   intro_separator.children('.butterfly');
		
		$('.td_intro').waypoint({
			handler: function(e){
				intro_butterfly.delay(1000).fadeIn(500);
				setTimeout(function(){intro_bg.addClass('animated');}, 700);
				setTimeout(function(){intro_title.addClass('animated');}, 900);
				setTimeout(function(){intro_image.addClass('animated');}, 1200);
				setTimeout(function(){intro_button.addClass('animated');}, 2000);
				setTimeout(function(){todown.addClass('animated');}, 100);
				setTimeout(function(){todownspanA.addClass('animated');}, 450);
				setTimeout(function(){todownspanB.addClass('animated');}, 350);
				
				intro_line.each(function(index, element) {
					var container 		= 	$(this);
					var dot 			= 	container.find('span.dot');
					var liner 			= 	container.find('span.liner');
					
					setTimeout(function(){
						container.addClass('animated');
						liner.delay(100).animate({width:100+'%'}, 1000, 'easeInOutExpo');
						dot.each(function(index, element) { 
							setTimeout(function(){
								$(element).fadeIn(1000);
							}, (index*500));
						});
					}, 1000);
				});					
			},
			offset:'70%'
		});
	}
	
	
	//setTimeout(function(){}, 1000);
	
	/*$('.td_social_list').each(function(index, element) {
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
    });*/
	
	
	// -----------------------------------------------------
	// ------------------    PARALLAX    -------------------
	// -----------------------------------------------------
	
	doPar(); 
	$(window).resize(function(e) {doPar();});
	function doPar(){
		$('.td_overlay_parallax').each(function(index, element) {
        
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
	$('.td_overlay_bgslide').each(function(index, element) {
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
	
	
	// -----------------------------------------------------
	// ------------------    BG SLIDE    -------------------
	// -----------------------------------------------------
	$('.td_overlay_color').each(function(index, element) {
        var tdt 	=   $(this);
		var tdtRate =	tdt.data('transparency');
		var tdtBg 	=	tdt.data('color');
		var rate 	= 	"";
		if(tdtRate <= 1){rate = tdtRate}else{rate = 1}
		
		tdt.css({opacity:rate, backgroundColor:tdtBg});
    });
	
	
	
	// -----------------------------------------------------
	// ---------------    SERVICE INTRO    -----------------
	// -----------------------------------------------------
	jQuery('.serviceIntro').easytabs({
		animate: true,
		animationSpeed: 400,
		updateHash: false,
	});
		
		
	// -----------------------------------------------------
	// --------------------    TABS    ---------------------
	// -----------------------------------------------------
	jQuery('.td_tabs').easytabs({
		animate: true,
		animationSpeed: 400,
		updateHash: false,
		//cycle: 6000
	});
	
	
	// -----------------------------------------------------
	// -----------------    TESTIMONIAL   ------------------
	// -----------------------------------------------------
	
	$('.testimonials').each(function(index, element) {
        var container = $(this);
		var owl = container.find('.carouselle');
		owl.owlCarousel({
			items : 1,
			margin:50,
			responsiveClass:true,
					
			autoplay:false,
			smartSpeed:500,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			loop:true,
			dots:false,
			nav:false,
			
		});
		container.find('span.td_left').on('click',function(){owl.trigger('prev.owl'); return false;});
		container.find('span.td_right').on('click',function(){owl.trigger('next.owl'); return false;});
	});
	
	// -----------------------------------------------------
	// ------------------    BLOG INTRO   ------------------
	// -----------------------------------------------------
	
	$('.td_blog_intro').each(function(index, element) {
        var container = $(this);
		var owl = container.find('.td_carousel');
		owl.owlCarousel({
			items : 1,
			margin:0,
			responsiveClass:true,
					
			autoplay:false,
			smartSpeed:500,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			loop:true,
			dots:false,
			nav:false,
			
		});
		container.find('span.td_left').on('click',function(){owl.trigger('prev.owl'); return false;});
		container.find('span.td_right').on('click',function(){owl.trigger('next.owl'); return false;});
	});
	
	
	// -----------------------------------------------------
	// -------------------    GALLERY   --------------------
	// -----------------------------------------------------
	$(window).load(function(){
		
		$('.td_gallery_wrap').each(function(index, element) {
            var container = $(this), slideshow, rev,
				slide = container.find('.td_big_image'),
				thumbs = container.find('.td_thumb_image'),
				id = container.attr('id'),
			
				direction = container.data('direction'),
				reversing = container.data('reverse'),
				speed = container.data('speed'),
				autoplay = container.data('autoplay'),
				an = container.data('slide');
				
			if(autoplay == 'on'){ slideshow = true; }else{ slideshow = false; }
			if(reversing == 'on'){ rev = true; }else{ rev = false; }
			
			
			thumbs.flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: true,
				slideshow: false,
				prevText:'',
				nextText:'',
				itemWidth: 143,
				itemMargin: 0,
				asNavFor: '#' + id + ' .td_big_image'
			});
			
			slide.flexslider({
				animation: an,
				controlNav: false,
				touch: true,
				prevText:'',
				nextText:'',
				slideshowSpeed: speed,
				reverse: rev,
				direction: 'horizontal',
				animationLoop: true,
				pauseOnAction: true, // default setting
				slideshow: slideshow,
				sync: '#' + id + ' .td_thumb_image',
				after: function(slider) {
							/* auto-restart player if paused after action */
							if (!slider.playing) {
							  slider.play();
							}
					   },		
			});
        });
	});
	
	
	// -----------------------------------------------------
	// ---------------    GALLERY GRID   -------------------
	// -----------------------------------------------------
	
	td_gallery();
	$(window).resize(function(e) {td_gallery();});
	$(window).load(function(e) {td_gallery();});
	// masonry
	function td_gallery(){
		if(jQuery().isotope) {
			// Needed variables
			var list = $('.td_gallery_grid .td_gallery_list');	
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
	
	$('.td_gallery_grid').each(function(index, element) {
		
		var container = $(this);
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
		
		if(temp === 'b' || temp === 'c' || temp === 'd'  || temp === 'e'){
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
				if(temp === 'e'){
					child.css({background:rgba});	
				}
				
			}else{
				alert('Please, use valid HEX color');
			}	
		}

		var animation = list.data('animation');
		var delay = list.data('delay');
		
    });
	
	
	
	// -----------------------------------------------------
	// ----------------    CONTACT FORM    -----------------
	// -----------------------------------------------------
	jQuery(".td_contact_submit").on('click', function(){
		var receiver 	= jQuery(".contact_form #receiver").data('email');
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
			jQuery.post("modal/contact.php",{ xx_receiver: receiver, xx_name: name, xx_email: email, xx_message:message, xx_subject: subject}, function(data) {
				
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
	jQuery('a.td_booking.popup').each(function(index, element) {
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
						var receiver 	= jQuery(".book_online_form #receiver").data('email');
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
							jQuery.post("modal/book.php",{xx_receiver:receiver, xx_name: name, xx_email: email, xx_date: date, xx_time: time, xx_message:message, xx_contact: contact}, function(data) {
								
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
							dateFormat = jQuery(this).data( 'date-format' ) ? jQuery(this).data( 'date-format' ) : 'mm/dd/yy';
							
						jQuery(this).children('#reservation-date').datepicker({
							dateFormat: dateFormat,
							minDate: -0,
							firstDay: firstDay
						});
					});	
					
					
					jQuery('.td-time-picker').each(function(index, element) {
						
						var tdStart 	= 	$(this).data('start');
						var tdEnd		= 	$(this).data('end');
						var tdStep 		= 	$(this).data('step');
						
						$(this).find('#reservation-time').timePicker({
							startTime: tdStart,
							endTime: tdEnd,
							show24Hours: true,
							separator: '.',
							step:tdStep	
						});
                    });
					
					
				}, //ajaxContentAdded ended here
			},	
		});
	});
	
	
	// -----------------------------------------------------
	// ----------------    ADDRESS POPUP    ----------------
	// -----------------------------------------------------
	jQuery('.td_buttons a.td_location').each(function(index, element) {
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
			},	
		});
	});
		
		
	// -----------------------------------------------------
	// --------------    WORKING SCHEDULE    ---------------
	// -----------------------------------------------------
	jQuery('.td_buttons a.td_openhours').each(function(index, element) {
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
				}
			},	
		});
	});
	
	
	// -----------------------------------------------------
	// ----------------    RANDOM IMAGES   -----------------
	// -----------------------------------------------------
	$('.random_img').each(function(index, element) {
		$(this).owlCarousel({
			items :1,
			margin:0,
			slideBy:1,
			responsiveClass:true,						
			autoplay:true,
			smartSpeed:500,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			loop:true,
			dots:false,
			nav:false,
			
		});
		
		// Custom navigation
		jQuery(this).parent().find('span.ocprev').on('click',function(){
			jQuery(this).parent().parent().find('.random_img').trigger('prev.owl');
		});
		jQuery(this).parent().find('span.ocnext').on('click',function(){
			jQuery(this).parent().parent().find('.random_img').trigger('next.owl');
		});		
	
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
	
	
	// -----------------------------------------------------
	// -------------------    TOGGLE    --------------------
	// -----------------------------------------------------
	$('.td_toggle').each(function(index, element) {
        var expand = $(element);
		var etitle = expand.children('.tog_head');
		var econtent = expand.children('.tog_content');
		
		econtent.children().css({opacity:0});
		
		etitle.bind('click', function(e){
			e.preventDefault();
			if(!expand.hasClass('open')){
				expand.addClass('open');
				econtent.slideDown(500);
				econtent.children().delay(300).animate({opacity:1});
			}else{
				expand.removeClass('open');
				econtent.children().animate({opacity:0});
				econtent.delay(300).slideUp(500);		
			}
		})
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
	// -----------------    EXPANDABLE    ------------------
	// -----------------------------------------------------
	$('.td_expandable').each(function(index, element) {
        var expand = $(element);
		var etitle = expand.children('.etitle');
		var econtent = expand.children('.econtent');
		
		econtent.children().css({opacity:0});
		
		etitle.bind('click', function(e){
			e.preventDefault();
			if(!expand.hasClass('open')){
				expand.addClass('open');
				econtent.slideDown(500);
				econtent.children().delay(300).animate({opacity:1});
			}else{
				expand.removeClass('open');
				econtent.children().animate({opacity:0});
				econtent.delay(300).slideUp(500);		
			}
		})
    });
	
	
	// -----------------------------------------------------
	// ---------------    IMAGE COMPORISON    --------------
	// -----------------------------------------------------
	$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
    $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.5, orientation: 'vertical'});
	
	
	
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
	// -------------------    COUNTER    -------------------
	// -----------------------------------------------------	
	
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
			},
			offset:'90%'	
		})
    });
	
	
	
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
	// ----------------    TOTOP BUTTON    -----------------
	// -----------------------------------------------------
	jQuery("a[href='#totop']").on('click', function() {
		jQuery("html, body").animate({ scrollTop: 0 }, 1400, 'easeInOutExpo');
		return false;
	});
	
	$(window).load(function(e) {tdTop();});
	
	
	
	// -----------------------------------------------------
	// ---------------    FIXED SIDEBAR    -----------------
	// -----------------------------------------------------
	
	var sidebarSticky 	= 	$('.td_sidebar').data('sticky');
	if(sidebarSticky === 'on'){$(window).on('resize load', function(e){setTimeout(function() { fixedSidebar();}, 10);});}


	// -----------------------------------------------------
	// -----------------    SMOOTH SCROLL    ---------------
	// -----------------------------------------------------
	if (!is_mobile_ie && !is_OSX) {niceScrollInit();}
	
	
	
	
});


function niceScrollInit() {
	"use strict";
	var smoothScroll    = $('body').data('smoothscrolling') !== undefined,
		root            = document.documentElement;

	
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

}



function fixedSidebar(){
	"use strict";
	var content 	= 	$('.td_sidebar').parent().children('.td-col-9');
	var sidebar 	= 	$('.td_sidebar');
	var offset;
	
	var navH 		= 	$(".td_topbar").outerHeight(true);
	var topStiky 	= 	$(".td_topbar").data('sticky');
	
	// check sticky menu
	if(topStiky === 'on'){
		offset = 30 + navH;	
	}else{
		offset = 30;
	}
	
	
	
	if(sidebar.length != '' || sidebar.length != 0){
		var sidebarIn 	= 	sidebar.children('.td_sidebar_in');
		var offTop 		= 	sidebarIn.offset().top;
		var sideHeight 	= 	sidebarIn.children('.forheight').outerHeight(true);
		var contHeight 	= 	content.outerHeight(true);
		var previousScroll = 0;
		
		var W = $(window).width();
		$(window).resize(function(e) {W = $(window).width();});
		
		
		
		if(W > 979){

			var sideBottom 	= 	offTop + sideHeight;
		
			var winHeight 	= 	$(window).height();
			var sideWidth	=	sidebar.width();
			
			if(sideHeight < contHeight){
				sidebar.css({height:contHeight});	
			}else{
				sidebar.css({height:"auto"});	
			}
			
			var sideWrapHeight = sidebar.outerHeight();
			sidebar.css({height:sideWrapHeight});
			sidebarIn.css({position:'static', top:"auto", bottom:"auto", width:sideWidth});
			
			
					
			$(window).on('scroll', function(e){
						
				var currentScroll = jQuery(this).scrollTop();
				var bottomView 	= 	currentScroll + winHeight;
				var contBottom 	= 	contHeight + offTop;
				var extraH 		= 	currentScroll + sideHeight + offset;
				
				
				console.log(contBottom + ' --- ' + extraH);
				
				if(W > 979){
					// scroll down
					if((sideHeight+offset) < contHeight){
	
						if((sideHeight+offset) < winHeight){
							if(offTop < (currentScroll+offset)){
								sidebarIn.css({position:'fixed', top:offset, bottom:"auto", width:sideWidth});
							}
							if(offTop > (currentScroll+offset)){
								sidebarIn.css({position:'static', top:"auto", bottom:"auto", width:sideWidth});	
							}
							if(contBottom < extraH){
								sidebarIn.css({position:'absolute', top:"auto", bottom:"0px", width:sideWidth});	
							}
							if(contBottom < extraH){
								sidebarIn.css({position:'absolute', top:"auto", bottom:"0px", width:sideWidth});	
							}
						}else{
							console.log('windowH small than sideH');
							if(sideBottom < bottomView){
								sidebarIn.css({position:'fixed', top:"auto", bottom:"0px", width:sideWidth});
							}
							if(sideBottom > bottomView){
								sidebarIn.css({position:'static', top:"auto", bottom:"auto", width:sideWidth});	
							}
							if(contBottom < bottomView){
								sidebarIn.css({position:'absolute', top:"auto", bottom:"0px", width:sideWidth});	
							}	
						}
					}
				}else{
					sidebar.css({height:'auto'});
					sidebarIn.attr( 'style', '' );	
				}
			});
			
		}else{
			sidebar.css({height:'auto'});
			sidebarIn.attr( 'style', '' );			
		}	
	}
}






function tdTop(){
	"use strict";
	var totop			=   $('.footer .td_totop');
	var totopspanA		=   $('.footer .td_totop span.td_a');
	var totopspanB		=   $('.footer .td_totop span.td_b');
	$('.footer').waypoint({
		handler: function(e){
			setTimeout(function(){totop.addClass('animated');}, 100);
			setTimeout(function(){totopspanA.addClass('animated');}, 400);	
			setTimeout(function(){totopspanB.addClass('animated');}, 500);					
		},
		offset:'105%'
	});
}


// -----------------------------------------------------
// -----------------    HEX to RGBA    -----------------
// -----------------------------------------------------
function convertHex(hex,opacity){
	"use strict";
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
	"use strict";
	var re = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	return re.test(color);
}


// -----------------------------------------------------
// ----------------    ID dublicating   ----------------
// -----------------------------------------------------
(function findDuplicateIds() {
	"use strict";
    var ids = {};
    var all = document.all || document.getElementsByTagName("*");
    for (var i = 0, l = all.length; i < l; i++) {
        var id = all[i].id;
        if (id) {
            if (ids[id]) {
                alert("You are dublicating id: '" + id + "' \n Dublicating id may lead to a big mess.");
            } else {
                ids[id] = 1;
            }
        }
    }
})();