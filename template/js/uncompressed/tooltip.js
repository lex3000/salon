// changed version

(function($) {
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing
    };

    function isElementInDOM(ele) {
        while (ele = ele.parentNode) {
            if (ele == document) return true
        }
        return false
    };

    function ThemedoTooltip(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle()
    };
    ThemedoTooltip.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                $tip.find('.tdtip-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'themedotip';
                $tip.remove().css({
                    top: 0,
                    left: 0,
					opacity: 0,
                    display: 'block'
                })
				
				// customization
				if(1==1){
					$tip.appendTo($('.td_contentwrap'));
					//$tip.prependTo(document.body);
				}else{
					$tip.appendTo(this.$element);
				}
				
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                var tp;
				
				if(1){
					switch (gravity.charAt(0)) {
						case 'n':
							tp = {
								top: pos.top + pos.height + this.options.offset,
								left: pos.left + pos.width / 2 - actualWidth / 2
							};
							break;
						case 's':
							tp = {
								top: pos.top - actualHeight - this.options.offset,
								left: pos.left + pos.width / 2 - actualWidth / 2
							};
							break;
						case 'e':
							tp = {
								top: pos.top + pos.height / 2 - actualHeight / 2,
								left: pos.left - actualWidth - this.options.offset
							};
							break;
						case 'w':
							tp = {
								top: pos.top + pos.height / 2 - actualHeight / 2,
								left: pos.left + pos.width + this.options.offset
							};
							break
					}
					if (gravity.length == 2) {
						if (gravity.charAt(1) == 'w') {
							tp.left = pos.left + pos.width / 2 - 15
						} else {
							tp.left = pos.left + pos.width / 2 - actualWidth + 15
						}
					}
					
				}else{ // customization
					switch (gravity.charAt(0)) {
						case 'n':
							tp = {
								top: pos.top + pos.height + this.options.offset,
								left: pos.left + pos.width / 2 - actualWidth / 2
							};
							break;
						case 's':
							tp = {
								top:  - actualHeight - this.options.offset,
								left: (pos.width - actualWidth) / 2
							};
							break;
						case 'e':
							tp = {
								top: pos.top + pos.height / 2 - actualHeight / 2,
								left: pos.left - actualWidth - this.options.offset
							};
							break;
						case 'w':
							tp = {
								top: pos.top + pos.height / 2 - actualHeight / 2,
								left: pos.left + pos.width + this.options.offset
							};
							break
					}
					if (gravity.length == 2) {
						if (gravity.charAt(1) == 'w') {
							tp.left = pos.left + pos.width / 2 - 15
						} else {
							tp.left = pos.left + pos.width / 2 - actualWidth + 15
						}
					}
				}
				
				// skin customization
				var td_skin = this.options.skin;
				
                $tip.css(tp).addClass('themedotip-' + gravity + ' ' + td_skin);
                $tip.find('.themedotip-arrow')[0].className = 'themedotip-arrow themedotip-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]))
                }
                switch (gravity.charAt(0)) {
                    case 'n':
                        if (this.options.fade) {
                            $tip.stop().css({
                                opacity: 0,
                                display: 'block',
                                marginTop: 20
                            }).animate({
                                opacity: this.options.opacity,
                                marginTop: 0
                            })
                        } else {
                            $tip.css({
                                display: 'block',
                                opacity: this.options.opacity
                            })
                        }
                        break;
                    case 's':
                        if (this.options.fade) {
                            $tip.stop().css({
                                opacity: 0,
                                display: 'block',
                                marginTop: -20
                            }).animate({
                                opacity: this.options.opacity,
                                marginTop: 0
                            })
                        } else {
                            $tip.css({
                                display: 'block',
                                opacity: this.options.opacity
                            })
                        }
                        break;
                    case 'e':
                        if (this.options.fade) {
                            $tip.stop().css({
                                opacity: 0,
                                display: 'block',
                                marginLeft: -20
                            }).animate({
                                opacity: this.options.opacity,
                                marginLeft: 0
                            })
                        } else {
                            $tip.css({
                                display: 'block',
                                opacity: this.options.opacity
                            })
                        }
                        break;
                    case 'w':
                        if (this.options.fade) {
                            $tip.stop().css({
                                opacity: 0,
                                display: 'block',
                                marginLeft: 20
                            }).animate({
                                opacity: this.options.opacity,
                                marginLeft: 0
                            })
                        } else {
                            $tip.css({
                                display: 'block',
                                opacity: this.options.opacity
                            })
                        }
                        break;
                    default:
                        if (this.options.fade) {
                            $tip.stop().css({
                                opacity: 0,
                                display: 'block',
                            }).animate({
                                opacity: this.options.opacity
                            })
                        } else {
                            $tip.css({
                                display: 'block',
                                opacity: this.options.opacity
                            })
                        }
                        break
                }
				
            }
        },
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() {
                    $(this).remove()
                })
            } else {
                this.tip().remove()
            }
        },
        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title')
            }
        },
        getTitle: function() {
            var title, $e = this.$element,
                o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title)
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0])
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback
        },
        tip: function() {
            if (!this.$tip ) {
                this.$tip = $('<div class="themedotip"></div>').html('<div class="themedotip-arrow"></div><div class="tdtip-inner"></div>');
                this.$tip.data('themedotip-pointee', this.$element[0])
            }
            return this.$tip
        },
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null
            }
        },
        enable: function() {
            this.enabled = true
        },
        disable: function() {
            this.enabled = false
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        }
    };
    $.fn.themedotip = function(options) {
        if (options === true) {
            return this.data('themedotip')
        } else if (typeof options == 'string') {
            var themedotip = this.data('themedotip');
            if (themedotip) themedotip[options]();
            return this
        }
        options = $.extend({}, $.fn.themedotip.defaults, options);

        function get(ele) {
            var themedotip = $.data(ele, 'themedotip');
            if (!themedotip) {
                themedotip = new ThemedoTooltip(ele, $.fn.themedotip.elementOptions(ele, options));
                $.data(ele, 'themedotip', themedotip)
            }
            return themedotip
        }

        function enter() {
            var themedotip = get(this);
            themedotip.hoverState = 'in';
            if (options.delayIn == 0) {
                themedotip.show()
            } else {
                themedotip.fixTitle();
                setTimeout(function() {
                    if (themedotip.hoverState == 'in') themedotip.show()
                }, options.delayIn)
            }
        };

        function leave() {
            var themedotip = get(this);
            themedotip.hoverState = 'out';
            if (options.delayOut == 0) {
				themedotip.hide();
            } else {
                setTimeout(function() {
                    if (themedotip.hoverState == 'out') themedotip.hide()
                }, options.delayOut)
            }
        };
        if (!options.live) this.each(function() {
            get(this)
        });
        if (options.trigger != 'manual' || options.trigger != 'click' || options.trigger != 'open') {
            var binder = options.live ? 'live' : 'bind',
                eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave)
        }
		if (options.trigger == 'click') {
            
            this.on('click', function(e){
				e.preventDefault();
				var themedotip = get(this);
				var dd = themedotip.tip().hasClass('opened');
				
				if (!dd){
					themedotip.show();
					$(window).resize(function(e) {
						setTimeout(function(){
							themedotip.show();	
						}, 250)
					});
					themedotip.tip().addClass('opened');
				}else{
					themedotip.hide();
					themedotip.tip().removeClass('opened');	
				}
			});
        }
		if (options.trigger == 'open') {
			var themedotip = get(this);
			themedotip.show();
			$(window).resize(function(e) {
                setTimeout(function(e){
					themedotip.show();	
				}, 250)
            });
			
			
		}
		
        return this
    };
    $.fn.themedotip.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover',
		skin: 'dark'
    };
    $.fn.themedotip.revalidate = function() {
        $('.themedotip').each(function() {
            var pointee = $.data(this, 'themedotip-pointee');
            if (!pointee || !isElementInDOM(pointee)) {
                $(this).remove()
            }
        })
    };
    $.fn.themedotip.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options
    };
    $.fn.themedotip.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n'
    };
    $.fn.themedotip.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w'
    };
    $.fn.themedotip.autoBounds = function(margin, prefer) {
        return function() {
            var dir = {
                    ns: prefer[0],
                    ew: (prefer.length > 1 ? prefer[1] : false)
                },
                boundTop = $(document).scrollTop() + margin,
                boundLeft = $(document).scrollLeft() + margin,
                $this = $(this);
            if ($this.offset().top < boundTop) dir.ns = 'n';
            if ($this.offset().left < boundLeft) dir.ew = 'w';
            if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
            if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';
            return dir.ns + (dir.ew ? dir.ew : '')
        }
    }
})(jQuery);