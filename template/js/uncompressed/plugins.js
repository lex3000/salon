/*

 01. Sticky navigation
 02. Flexslider
 03. Superfish
 04. Esy Tabs
 05. Owl Carousel
 06. Magnific Popup
 07. Placeholders
 08. Datepicker (ui)
 09. Isotope
 10. Accordion
 02. Nicescroll
*/
// timepicker
(function(a) {
    function g(a) {
        a.setFullYear(2001), a.setMonth(0), a.setDate(0);
        return a
    }

    function f(a, b) {
        if (a) {
            var c = a.split(b.separator),
                d = parseFloat(c[0]),
                e = parseFloat(c[1]);
            b.show24Hours || (d === 12 && a.indexOf("AM") !== -1 ? d = 0 : d !== 12 && a.indexOf("PM") !== -1 && (d += 12));
            var f = new Date(0, 0, 0, d, e, 0);
            return g(f)
        }
        return null
    }

    function e(a, b) {
        return typeof a == "object" ? g(a) : f(a, b)
    }

    function d(a) {
        return (a < 10 ? "0" : "") + a
    }

    function c(a, b) {
        var c = a.getHours(),
            e = b.show24Hours ? c : (c + 11) % 12 + 1,
            f = a.getMinutes();
        return d(e) + b.separator + d(f) + (b.show24Hours ? "" : c < 12 ? " AM" : " PM")
    }

    function b(b, c, d, e) {
        b.value = a(c).text(), a(b).change(), a.browser.msie || b.focus(), d.hide()
    }
    a.fn.timePicker = function(b) {
        var c = a.extend({}, a.fn.timePicker.defaults, b);
        return this.each(function() {
            a.timePicker(this, c)
        })
    }, a.timePicker = function(b, c) {
        var d = a(b)[0];
        return d.timePicker || (d.timePicker = new jQuery._timePicker(d, c))
    }, a.timePicker.version = "0.3", a._timePicker = function(d, h) {
        var i = !1,
            j = !1,
            k = e(h.startTime, h),
            l = e(h.endTime, h),
            m = "selected",
            n = "li." + m;
        a(d).attr("autocomplete", "OFF");
        var o = [],
            p = new Date(k);
        while (p <= l) o[o.length] = c(p, h), p = new Date(p.setMinutes(p.getMinutes() + h.step));
        var q = a('<div class="time-picker' + (h.show24Hours ? "" : " time-picker-12hours") + '"></div>'),
            r = a("<ul></ul>");
        for (var s = 0; s < o.length; s++) r.append("<li>" + o[s] + "</li>");
        q.append(r), q.appendTo("body").hide(), q.mouseover(function() {
            i = !0
        }).mouseout(function() {
            i = !1
        }), a("li", r).mouseover(function() {
            j || (a(n, q).removeClass(m), a(this).addClass(m))
        }).mousedown(function() {
            i = !0
        }).click(function() {
            b(d, this, q, h), i = !1
        });
        var t = function() {
            if (q.is(":visible")) return !1;
            a("li", q).removeClass(m);
            var b = a(d).offset();
            q.css({
                top: b.top + d.offsetHeight,
                left: b.left
            }), q.show();
            var e = d.value ? f(d.value, h) : k,
                i = k.getHours() * 60 + k.getMinutes(),
                j = e.getHours() * 60 + e.getMinutes() - i,
                n = Math.round(j / h.step),
                o = g(new Date(0, 0, 0, 0, n * h.step + i, 0));
            o = k < o && o <= l ? o : k;
            var p = a("li:contains(" + c(o, h) + ")", q);
            p.length && (p.addClass(m), q[0].scrollTop = p[0].offsetTop);
            return !0
        };
        a(d).focus(t).click(t), a(d).blur(function() {
            i || q.hide()
        });
        var u = a.browser.opera || a.browser.mozilla ? "keypress" : "keydown";
        a(d)[u](function(c) {
            var e;
            j = !0;
            var f = q[0].scrollTop;
            switch (c.keyCode) {
                case 38:
                    if (t()) return !1;
                    e = a(n, r);
                    var g = e.prev().addClass(m)[0];
                    g ? (e.removeClass(m), g.offsetTop < f && (q[0].scrollTop = f - g.offsetHeight)) : (e.removeClass(m), g = a("li:last", r).addClass(m)[0], q[0].scrollTop = g.offsetTop - g.offsetHeight);

                    return !1;
                case 40:
                    if (t()) return !1;
                    e = a(n, r);
                    var i = e.next().addClass(m)[0];
                    i ? (e.removeClass(m), i.offsetTop + i.offsetHeight > f + q[0].offsetHeight && (q[0].scrollTop = f + i.offsetHeight)) : (e.removeClass(m), i = a("li:first", r).addClass(m)[0], q[0].scrollTop = 0);
                    return !1;
                case 13:
                    if (q.is(":visible")) {
                        var k = a(n, r)[0];
                        b(d, k, q, h)
                    }
                    return !1;
                case 27:
                    q.hide();
                    return !1
            }
            return !0
        }), a(d).keyup(function(a) {
            j = !1
        }), this.getTime = function() {
            return f(d.value, h)
        }, this.setTime = function(b) {
            d.value = c(e(b, h), h), a(d).change()
        }
    }, a.fn.timePicker.defaults = {
        step: 30,
        startTime: new Date(0, 0, 0, 0, 0, 0),
        endTime: new Date(0, 0, 0, 23, 30, 0),
        separator: ":",
        show24Hours: !0
    }
})(jQuery)




// countdown jCountdown
! function(e) {
    e.fn.countdown = function(t) {
        var a = 36e5,
            n = 31557600,
            r = 2629800,
            o = 604800,
            s = 86400,
            i = 3600,
            l = 60,
            d = 1,
            c = /%y|%m|%w|%d|%h|%i|%s/g,
            u = /\d/g,
            m = function(t, a) {
                var n = t.toString().match(u),
                    r = "";
                return e.each(n, function(e, t) {
                    t = Number(t), r += "" + a.digits[t] || "" + t
                }), r
            },
            h = function(t) {
                var a = t.template,
                    n = (e("<div>"), t.dom.$time.addClass(t.timeWrapClass)),
                    r = e("<" + t.textWrapElement + ">").addClass(t.textWrapClass),
                    o = t.timeSeparator,
                    s = t.yearsLeft,
                    i = t.monthsLeft,
                    l = t.weeksLeft,
                    d = t.daysLeft,
                    u = t.hrsLeft,
                    h = t.minsLeft,
                    f = t.secLeft,
                    p = !1,
                    g = !1,
                    T = !1,
                    x = !1,
                    v = !1,
                    y = !1,
                    w = function(e, a, s) {
                        var i = n.clone().html(e + t.spaceCharacter).html();
                        return i += r.clone().html(a + t.spaceCharacter).html(), s && (i += r.clone().html(t.spaceCharacter + o + t.spaceCharacter).html()), i
                    };
                return t.omitZero && (t.yearsAndMonths && (t.yearsLeft || (p = !0), t.monthsLeft || (g = !0)), t.weeks && (t.yearsAndMonths && g && !t.weeksLeft || !t.yearsAndMonths && !t.weeksLeft) && (T = !0), T && !d && (x = !0), x && !u && (v = !0), v && !h && (y = !0)), t.leadingZero && (10 > s && (s = "0" + s), 10 > i && (i = "0" + i), 10 > l && (l = "0" + l), 10 > d && (d = "0" + d), 10 > u && (u = "0" + u), 10 > h && (h = "0" + h), 10 > f && (f = "0" + f)), s = m(s, t), i = m(i, t), l = m(l, t), d = m(d, t), u = m(u, t), h = m(h, t), f = m(f, t), t.yearsAndMonths && (t.omitZero && p || (a = a.replace("%y", w(s, 1 == s && t.yearSingularText ? t.yearSingularText : t.yearText, !0))), a = !t.omitZero || !p && i || !p && !g ? a.replace("%m", w(i, 1 == i && t.monthSingularText ? t.monthSingularText : t.monthText, !0)) : a.replace("%m", "")), a = t.weeks && !T ? a.replace("%w", w(l, 1 == l && t.weekSingularText ? t.weekSingularText : t.weekText, !0)) : a.replace("%w", ""), a = x ? a.replace("%d", "") : a.replace("%d", w(d, 1 == d && t.daySingularText ? t.daySingularText : t.dayText, !0)), a = v ? a.replace("%h", "") : a.replace("%h", w(u, 1 == u && t.hourSingularText ? t.hourSingularText : t.hourText, !0)), a = y ? a.replace("%i", "") : a.replace("%i", w(h, 1 == h && t.minSingularText ? t.minSingularText : t.minText, !0)), a = a.replace("%s", w(f, 1 == f && t.secSingularText ? t.secSingularText : t.secText)), a = a.replace(c, "")
            },
            f = function(t) {
                var a = e("<div>"),
                    n = e("<" + t.timeWrapElement + ">").addClass(t.timeWrapClass),
                    r = e("<" + t.textWrapElement + ">").addClass(t.textWrapClass),
                    o = t.timeSeparator,
                    s = t.yearsLeft,
                    i = t.monthsLeft,
                    l = t.weeksLeft,
                    d = t.daysLeft,
                    c = t.hrsLeft,
                    u = t.minsLeft,
                    f = t.secLeft,
                    p = t.template,
                    g = (!!t.template, !1),
                    T = !1,
                    x = !1,
                    v = !1,
                    y = !1,
                    w = !1,
                    j = [],
                    L = function(e) {
                        j.push(function() {
                            a.append(n.clone().html(e + t.spaceCharacter))
                        })
                    },
                    C = function(e) {
                        j.push(function() {
                            a.append(r.clone().html(e + t.spaceCharacter))
                        })
                    },
                    S = function() {
                        j.push(function() {
                            a.append(r.clone().html(t.spaceCharacter + o + t.spaceCharacter))
                        })
                    };
                return t.template ? h(t) : (t.omitZero && (t.yearsAndMonths && (t.yearsLeft || (g = !0), t.monthsLeft || (T = !0)), t.weeks && (t.yearsAndMonths && T && !t.weeksLeft || !t.yearsAndMonths && !t.weeksLeft) && (x = !0), x && !d && (v = !0), v && !c && (y = !0), y && !u && (w = !0)), t.leadingZero && (10 > s && (s = "0" + s), 10 > i && (i = "0" + i), 10 > l && (l = "0" + l), 10 > d && (d = "0" + d), 10 > c && (c = "0" + c), 10 > u && (u = "0" + u), 10 > f && (f = "0" + f)), s = m(s, t), i = m(i, t), l = m(l, t), d = m(d, t), c = m(c, t), u = m(u, t), f = m(f, t), t.yearsAndMonths && (t.omitZero && g || (L(s), C(1 == s && t.yearSingularText ? t.yearSingularText : t.yearText), S()), (!t.omitZero || !g && i || !g && !T) && (L(i), C(1 == i && t.monthSingularText ? t.monthSingularText : t.monthText), S())), t.weeks && !x && (L(l), C(1 == l && t.weekSingularText ? t.weekSingularText : t.weekText), S()), v || (L(d), C(1 == d && t.daySingularText ? t.daySingularText : t.dayText), S()), y || (L(c), C(1 == c && t.hourSingularText ? t.hourSingularText : t.hourText), S()), w || (L(u), C(1 == u && t.minSingularText ? t.minSingularText : t.minText), S()), L(f), C(t.secText), t.isRTL === !0 && j.reverse(), e.each(j, function(e, t) {
                    t()
                }), p = a.html())
            },
            p = function(e) {
                var t = new Date,
                    a = e.data("jcdData");
                return a ? (null !== a.offset && (t = g(a.offset)), t.setMilliseconds(0), t) : new Date
            },
            g = function(e) {
                var t, n, r, o = new Date;
                return null !== e && (t = e * a, r = o.getTime() - -o.getTimezoneOffset() / 60 * a + t, n = o.setTime(r)), new Date(n)
            },
            T = function() {
                var e, t, a, c, u, m = this,
                    h = 0,
                    g = 0,
                    T = 0,
                    x = 0,
                    v = 0,
                    y = 0,
                    w = 0,
                    j = "",
                    L = function(e) {
                        var t;
                        return t = Math.floor(u / e), u -= t * e, t
                    },
                    C = m.data("jcdData");
                return C ? (e = C.htmlTemplate, t = p(m), a = null !== C.serverDiff ? new Date(C.serverDiff + C.clientdateNow.getTime()) : C.dateObj, a.setMilliseconds(0), c = "down" === C.direction ? a.getTime() - t.getTime() : t.getTime() - a.getTime(), u = Math.round(c / 1e3), x = L(s), v = L(i), y = L(l), w = L(d), C.yearsAndMonths && (u += x * s, h = L(n), g = L(r), x = L(s)), C.weeks && (u += x * s, T = L(o), x = L(s)), (C.hoursOnly || C.minsOnly || C.secsOnly) && (C.yearsAndMonths && (u += h * n, u += g * r, h = g = 0), C.weeks && (u += T * o, T = 0)), C.hoursOnly && (u += x * s, u += v * i, v = L(i)), C.minsOnly && (u += x * s, x = 0, u += v * i, v = 0, u += y * l, y = L(l)), C.secsOnly && (u += x * s, x = 0, u += v * i, v = 0, u += y * l, y = 0, u += w, w = L(d)), C.yearsLeft = h, C.monthsLeft = g, C.weeksLeft = T, C.daysLeft = x, C.hrsLeft = v, C.minsLeft = y, C.secLeft = w, m.data("jcdData", C), "down" === C.direction && (a > t || C.minus) || "up" === C.direction && (t > a || C.minus) ? j = f(C) : (C.yearsLeft = C.monthsLeft = C.weeksLeft = C.daysLeft = C.hrsLeft = C.minsLeft = C.secLeft = 0, j = f(C), C.hasCompleted = !0), m.html(j).triggerMulti("change.jcdevt,countChange", [C]), void(C.hasCompleted && (m.triggerMulti("complete.jcdevt,countComplete"), clearInterval(C.timer)))) : !1
            },
            x = {
                init: function(t) {
                    var a, n, r = e.extend({}, e.fn.countdown.defaults, t);
                    return this.each(function() {
                        var o, s = e(this),
                            i = {};
                        return s.data("jcdData") && (s.countdown("changeSettings", t, !0), r = s.data("jcdData")), null === r.date && null === r.dataAttr ? (e.error("No Date passed to jCountdown. date option is required."), !0) : (n = r.date ? r.date : s.data(r.dataAttr), a = new Date(n), "Invalid Date" === a.toString() && e.error("Invalid Date passed to jCountdown: " + n), r.onStart && s.on("start.jcdevt", r.onStart), r.onChange && s.on("change.jcdevt", r.onChange), r.onComplete && s.on("complete.jcdevt", r.onComplete), r.onPause && s.on("pause.jcdevt", r.onPause), r.onResume && s.on("resume.jcdevt", r.onResume), r.onLocaleChange && s.on("locale.jcdevt", r.onLocaleChange), i = e.extend({}, r), i.dom = {}, i.dom.$time = e("<" + i.timeWrapElement + ">").addClass(i.timeWrapClass), i.dom.$text = e("<" + i.textWrapElement + ">").addClass(i.textWrapClass), i.clientdateNow = new Date, i.clientdateNow.setMilliseconds(0), i.originalHTML = s.html(), i.dateObj = new Date(n), i.dateObj.setMilliseconds(0), i.hasCompleted = !1, i.timer = 0, i.yearsLeft = i.monthsLeft = i.weeksLeft = i.daysLeft = i.hrsLeft = i.minsLeft = i.secLeft = 0, i.difference = null, o = e.proxy(T, s), i.timer = setInterval(o, i.updateTime), s.data("jcdData", i).triggerMulti("start.jcdevt,countStart", [i]), void o())
                    })
                },
                changeSettings: function(t, a) {
                    return this.each(function() {
                        var n, r, o = e(this),
                            s = e.proxy(T, o);
                        return o.data("jcdData") ? (n = e.extend({}, o.data("jcdData"), t), t.hasOwnProperty("date") && (r = new Date(t.date), "Invalid Date" === r.toString() && e.error("Invalid Date passed to jCountdown: " + t.date)), n.completed = !1, n.dateObj = new Date(t.date), clearInterval(n.timer), o.off(".jcdevt").data("jcdData", n), a || (n.onChange && o.on("change.jcdevt", n.onChange), n.onComplete && o.on("complete.jcdevt", n.onComplete), n.onPause && o.on("pause.jcdevt", n.onPause), n.onResume && o.on("resume.jcdevt", n.onResume), n.timer = setInterval(s, n.updateTime), o.data("jcdData", n), s()), void(n = null)) : !0
                    })
                },
                resume: function() {
                    return this.each(function() {
                        var t = e(this),
                            a = t.data("jcdData"),
                            n = e.proxy(T, t);
                        if (!a) return !0;
                        if (t.data("jcdData", a).triggerMulti("resume.jcdevt,countResume", [a]), !a.hasCompleted) {
                            if (a.timer = setInterval(n, a.updateTime), a.stopwatch && "up" === a.direction) {
                                var r = p(t).getTime() - a.pausedAt.getTime(),
                                    o = new Date;
                                o.setTime(a.dateObj.getTime() + r), a.dateObj = o
                            }
                            n()
                        }
                    })
                },
                pause: function() {
                    return this.each(function() {
                        var t = e(this),
                            a = t.data("jcdData");
                        return a ? (a.stopwatch && (a.pausedAt = p(t)), clearInterval(a.timer), void t.data("jcdData", a).triggerMulti("pause.jcdevt,countPause", [a])) : !0
                    })
                },
                complete: function() {
                    return this.each(function() {
                        var t = e(this),
                            a = t.data("jcdData");
                        return a ? (clearInterval(a.timer), a.hasCompleted = !0, void t.data("jcdData", a).triggerMulti("complete.jcdevt,countComplete", [a])) : !0
                    })
                },
                destroy: function() {
                    return this.each(function() {
                        var t = e(this),
                            a = t.data("jcdData");
                        return a ? (clearInterval(a.timer), void t.off(".jcdevt").removeData("jcdData").html(a.originalHTML)) : !0
                    })
                },
                getSettings: function(t) {
                    var a = e(this),
                        n = a.data("jcdData");
                    return t && n ? n.hasOwnProperty(t) ? n[t] : void 0 : n
                },
                changeLocale: function(t) {
                    var a = e(this),
                        n = a.data("jcdData");
                    return e.fn.countdown.locale[t] ? (e.extend(n, e.fn.countdown.locale[t]), a.data("jcdData", n).triggerMulti("locale.jcdevt,localeChange", [n]), !0) : (e.error("Locale '" + t + "' does not exist"), !1)
                }
            };
        return x[t] ? x[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist in the jCountdown Plugin") : x.init.apply(this, arguments)
    }, e.fn.countdown.defaults = {
        date: null,
        dataAttr: null,
        updateTime: 1e3,
        yearText: "years",
        monthText: "months",
        weekText: "weeks",
        dayText: "days",
        hourText: "hours",
        minText: "mins",
        secText: "sec",
        yearSingularText: "year",
        monthSingularText: "month",
        weekSingularText: "week",
        daySingularText: "day",
        hourSingularText: "hour",
        minSingularText: "min",
        secSingularText: "sec",
        digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        timeWrapElement: "span",
        textWrapElement: "span",
        timeWrapClass: "",
        textWrapClass: "cd-time",
        timeSeparator: "",
        isRTL: !1,
        minus: !1,
        onStart: null,
        onChange: null,
        onComplete: null,
        onResume: null,
        onPause: null,
        onLocaleChange: null,
        leadingZero: !1,
        offset: null,
        serverDiff: null,
        spaceCharacter: " ",
        hoursOnly: !1,
        minsOnly: !1,
        secsOnly: !1,
        weeks: !1,
        hours: !1,
        yearsAndMonths: !1,
        direction: "down",
        stopwatch: !1,
        omitZero: !1,
        template: null
    }, e.fn.countdown.locale = [], e.fn.triggerMulti = function(t, a) {
        var n = t.split(",");
        return this.each(function() {
            for (var t = e(this), r = 0; r < n.length; r++) t.trigger(n[r], a)
        })
    }
}(jQuery);




// image comparison. twentytwenty
! function(t) {
    t.fn.twentytwenty = function(e) {
        var e = t.extend({
            default_offset_pct: .5,
            orientation: "horizontal"
        }, e);
        return this.each(function() {
            var n = e.default_offset_pct,
                i = t(this),
                a = e.orientation,
                s = "vertical" === a ? "down" : "left",
                d = "vertical" === a ? "up" : "right";
            i.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"), i.append("<div class='twentytwenty-overlay'></div>");
            var r = i.find("img:first"),
                w = i.find("img:last");
            i.append("<div class='twentytwenty-handle'></div>");
            var c = i.find(".twentytwenty-handle");
            c.append("<span class='twentytwenty-" + s + "-arrow'></span>"), c.append("<span class='twentytwenty-" + d + "-arrow'></span>"), i.addClass("twentytwenty-container"), r.addClass("twentytwenty-before"), w.addClass("twentytwenty-after");
            var o = i.find(".twentytwenty-overlay"),
                f = i.data("before"),
                l = i.data("after");
            o.append("<div class='twentytwenty-before-label'>" + f + "</div>"), o.append("<div class='twentytwenty-after-label'>" + l + "</div>");
            var v = function(t) {
                    var e = r.width(),
                        n = r.height();
                    return {
                        w: e + "px",
                        h: n + "px",
                        cw: t * e + "px",
                        ch: t * n + "px"
                    }
                },
                p = function(t) {
                    "vertical" === a ? r.css("clip", "rect(0," + t.w + "," + t.ch + ",0)") : r.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"), i.css("height", t.h)
                },
                y = function(t) {
                    var e = v(t);
                    c.css("vertical" === a ? "top" : "left", "vertical" === a ? e.ch : e.cw), p(e)
                };
            t(window).on("resize.twentytwenty", function() {
                y(n)
            });
            var h = 0,
                u = 0;
            c.on("movestart", function(t) {
                (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) && "vertical" !== a ? t.preventDefault() : (t.distX < t.distY && t.distX < -t.distY || t.distX > t.distY && t.distX > -t.distY) && "vertical" === a && t.preventDefault(), i.addClass("active"), h = i.offset().left, offsetY = i.offset().top, u = r.width(), imgHeight = r.height()
            }), c.on("moveend", function() {
                i.removeClass("active")
            }), c.on("move", function(t) {
                i.hasClass("active") && (n = "vertical" === a ? (t.pageY - offsetY) / imgHeight : (t.pageX - h) / u, 0 > n && (n = 0), n > 1 && (n = 1), y(n))
            }), i.find("img").on("mousedown", function(t) {
                t.preventDefault()
            }), t(window).trigger("resize.twentytwenty")
        })
    }
}(jQuery);




// jquery-simple-text-rotator.js
! function(t) {
    var a = {
        animation: "dissolve",
        separator: ",",
        speed: 2e3
    };
    t.fx.step.textShadowBlur = function(a) {
        t(a.elem).prop("textShadowBlur", a.now).css({
            textShadow: "0 0 " + Math.floor(a.now) + "px black"
        })
    }, t.fn.textrotator = function(e) {
        var n = t.extend({}, a, e);
        return this.each(function() {
            var a = t(this),
                e = [];
            t.each(a.text().split(n.separator), function(t, a) {
                e.push(a)
            }), a.text(e[0]);
            var s = function() {
                switch (n.animation) {
                    case "dissolve":
                        a.animate({
                            textShadowBlur: 20,
                            opacity: 0
                        }, 500, function() {
                            o = t.inArray(a.text(), e), o + 1 == e.length && (o = -1), a.text(e[o + 1]).animate({
                                textShadowBlur: 0,
                                opacity: 1
                            }, 500)
                        });
                        break;
                    case "maya":
                        a.find(".back").length > 0 && a.html(a.find(".back").html());
                        var s = a.text(),
                            o = t.inArray(s, e);
                        o + 1 == e.length && (o = -1), a.html(""), t("<span class='front'>" + s + "</span>").appendTo(a), t("<span class='back'>" + e[o + 1] + "</span>").appendTo(a), a.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("maya").show();
                        break;
                    case "fade":
                        a.fadeOut(n.speed, function() {
                            o = t.inArray(a.text(), e), o + 1 == e.length && (o = -1), a.text(e[o + 1]).fadeIn(n.speed)
                        })
                }
            };
            setInterval(s, n.speed)
        })
    }
}(window.jQuery);




//countTo js
! function(t) {
    function e(t, e) {
        return t.toFixed(e.decimals)
    }
    t.fn.countTo = function(e) {
        return e = e || {}, t(this).each(function() {
            function a() {
                s += l, c++, n(s), "function" == typeof o.onUpdate && o.onUpdate.call(f, s), c >= r && (i.removeData("countTo"), clearInterval(d.interval), s = o.to, "function" == typeof o.onComplete && o.onComplete.call(f, s))
            }

            function n(t) {
                var e = o.formatter.call(f, t, o);
                i.text(e)
            }
            var o = t.extend({}, t.fn.countTo.defaults, {
                    from: t(this).data("from"),
                    to: t(this).data("to"),
                    speed: t(this).data("speed"),
                    refreshInterval: t(this).data("refresh-interval"),
                    decimals: t(this).data("decimals")
                }, e),
                r = Math.ceil(o.speed / o.refreshInterval),
                l = (o.to - o.from) / r,
                f = this,
                i = t(this),
                c = 0,
                s = o.from,
                d = i.data("countTo") || {};
            i.data("countTo", d), d.interval && clearInterval(d.interval), d.interval = setInterval(a, o.refreshInterval), n(s)
        })
    }, t.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: e,
        onUpdate: null,
        onComplete: null
    }
}(jQuery);




//jquery.easing.1.3.js
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, a, c, b, d) {
        return jQuery.easing[jQuery.easing.def](e, a, c, b, d)
    },
    easeInQuad: function(e, a, c, b, d) {
        return b * (a /= d) * a + c
    },
    easeOutQuad: function(e, a, c, b, d) {
        return -b * (a /= d) * (a - 2) + c
    },
    easeInOutQuad: function(e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a + c;
        return -b / 2 * (--a * (a - 2) - 1) + c
    },
    easeInCubic: function(e, a, c, b, d) {
        return b * (a /= d) * a * a + c
    },
    easeOutCubic: function(e, a, c, b, d) {
        return b * ((a = a / d - 1) * a * a + 1) + c
    },
    easeInOutCubic: function(e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b /
            2 * a * a * a + c;
        return b / 2 * ((a -= 2) * a * a + 2) + c
    },
    easeInQuart: function(e, a, c, b, d) {
        return b * (a /= d) * a * a * a + c
    },
    easeOutQuart: function(e, a, c, b, d) {
        return -b * ((a = a / d - 1) * a * a * a - 1) + c
    },
    easeInOutQuart: function(e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a * a * a + c;
        return -b / 2 * ((a -= 2) * a * a * a - 2) + c
    },
    easeInQuint: function(e, a, c, b, d) {
        return b * (a /= d) * a * a * a * a + c
    },

    easeOutQuint: function(e, a, c, b, d) {
        return b * ((a = a / d - 1) * a * a * a * a + 1) + c
    },
    easeInOutQuint: function(e, a, c, b, d) {
        if ((a /= d / 2) < 1) return b / 2 * a * a * a * a * a + c;
        return b / 2 * ((a -= 2) * a * a * a * a + 2) + c
    },
    easeInSine: function(e,
        a, c, b, d) {
        return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
    },
    easeOutSine: function(e, a, c, b, d) {
        return b * Math.sin(a / d * (Math.PI / 2)) + c
    },
    easeInOutSine: function(e, a, c, b, d) {
        return -b / 2 * (Math.cos(Math.PI * a / d) - 1) + c
    },
    easeInExpo: function(e, a, c, b, d) {
        return a == 0 ? c : b * Math.pow(2, 10 * (a / d - 1)) + c
    },
    easeOutExpo: function(e, a, c, b, d) {
        return a == d ? c + b : b * (-Math.pow(2, -10 * a / d) + 1) + c
    },
    easeInOutExpo: function(e, a, c, b, d) {
        if (a == 0) return c;
        if (a == d) return c + b;
        if ((a /= d / 2) < 1) return b / 2 * Math.pow(2, 10 * (a - 1)) + c;
        return b / 2 * (-Math.pow(2, -10 * --a) + 2) + c
    },
    easeInCirc: function(e, a, c, b, d) {
        return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c
    },
    easeOutCirc: function(e, a, c, b, d) {
        return b * Math.sqrt(1 - (a = a / d - 1) * a) + c
    },
    easeInOutCirc: function(e, a, c, b, d) {
        if ((a /= d / 2) < 1) return -b / 2 * (Math.sqrt(1 - a * a) - 1) + c;
        return b / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + c
    },
    easeInElastic: function(e, a, c, b, d) {
        e = 1.70158;
        var f = 0,
            g = b;
        if (a == 0) return c;
        if ((a /= d) == 1) return c + b;
        f || (f = d * 0.3);
        if (g < Math.abs(b)) {
            g = b;
            e = f / 4
        } else e = f / (2 * Math.PI) * Math.asin(b / g);
        return -(g * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / f)) + c
    },
    easeOutElastic: function(e,
        a, c, b, d) {
        e = 1.70158;
        var f = 0,
            g = b;
        if (a == 0) return c;
        if ((a /= d) == 1) return c + b;
        f || (f = d * 0.3);
        if (g < Math.abs(b)) {
            g = b;
            e = f / 4
        } else e = f / (2 * Math.PI) * Math.asin(b / g);
        return g * Math.pow(2, -10 * a) * Math.sin((a * d - e) * 2 * Math.PI / f) + b + c
    },
    easeInOutElastic: function(e, a, c, b, d) {
        e = 1.70158;
        var f = 0,
            g = b;
        if (a == 0) return c;
        if ((a /= d / 2) == 2) return c + b;
        f || (f = d * 0.3 * 1.5);
        if (g < Math.abs(b)) {
            g = b;
            e = f / 4
        } else e = f / (2 * Math.PI) * Math.asin(b / g);
        if (a < 1) return -0.5 * g * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - e) * 2 * Math.PI / f) + c;
        return g * Math.pow(2, -10 * (a -= 1)) * Math.sin((a *
            d - e) * 2 * Math.PI / f) * 0.5 + b + c
    },
    easeInBack: function(e, a, c, b, d, f) {
        if (f == undefined) f = 1.70158;
        return b * (a /= d) * a * ((f + 1) * a - f) + c
    },
    easeOutBack: function(e, a, c, b, d, f) {
        if (f == undefined) f = 1.70158;
        return b * ((a = a / d - 1) * a * ((f + 1) * a + f) + 1) + c
    },
    easeInOutBack: function(e, a, c, b, d, f) {
        if (f == undefined) f = 1.70158;
        if ((a /= d / 2) < 1) return b / 2 * a * a * (((f *= 1.525) + 1) * a - f) + c;
        return b / 2 * ((a -= 2) * a * (((f *= 1.525) + 1) * a + f) + 2) + c
    },
    easeInBounce: function(e, a, c, b, d) {
        return b - jQuery.easing.easeOutBounce(e, d - a, 0, b, d) + c
    },
    easeOutBounce: function(e, a, c, b, d) {
        return (a /=
            d) < 1 / 2.75 ? b * 7.5625 * a * a + c : a < 2 / 2.75 ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c : a < 2.5 / 2.75 ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c
    },
    easeInOutBounce: function(e, a, c, b, d) {
        if (a < d / 2) return jQuery.easing.easeInBounce(e, a * 2, 0, b, d) * 0.5 + c;
        return jQuery.easing.easeOutBounce(e, a * 2 - d, 0, b, d) * 0.5 + b * 0.5 + c
    }
});




// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);




/**
 * jquery.snow - jQuery Snow Effect Plugin
 *
 * Available under MIT licence
 *
 * @version 1 (21. Jan 2012)
 * @author Ivan Lazarevic
 * @requires jQuery
 * @see http://workshop.rs
 *
 * @params minSize - min size of snowflake, 10 by default
 * @params maxSize - max size of snowflake, 20 by default
 * @params newOn - frequency in ms of appearing of new snowflake, 500 by default
 * @params flakeColor - color of snowflake, #FFFFFF by default
 * @example $.fn.snow({ maxSize: 200, newOn: 1000 });
 */
(function($) {
    $.fn.snow = function(options) {
        var $flake = $('<div id="flake" />').css({
                'position': 'absolute',
                'top': '-50px'
            }).html('&#10052;'),
            documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                minSize: 10,
                maxSize: 20,
                newOn: 500,
                flakeColor: "#FFFFFF"
            },
            options = $.extend({}, defaults, options);
        var interval = setInterval(function() {
            var startPositionLeft = Math.random() * documentWidth - 100,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 200,
                durationFall = documentHeight * 10 + Math.random() * 5000;
            $flake.clone().appendTo('.td_header_snow').css({
                left: startPositionLeft,
                opacity: startOpacity,
                'font-size': sizeFlake,
                color: options.flakeColor
            }).animate({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.2
            }, durationFall, 'linear', function() {
                $(this).remove()
            });
        }, options.newOn);
    };
})(jQuery);




/*
 xx)-----------------------------------------------------------------
/*! image-scale v1.3.2 | ©2012-2013 Nicolas BADIA | Licensed under the MIT license */
! function(e) {
    e.fn.imageScale = function(a) {
        return this.each(function() {
            var b = e(this),
                c = b.data("imageScale");
            if (!c) {
                b.css("opacity", 0);
                var g = b[0].complete,
                    f = e.extend({}, e.fn.imageScale.defaults, "object" == typeof a && a),
                    h = function() {
                        b.data("imageScale", c = new l(this, f));
                        f.rescaleOnResize && e(window).resize(function(a) {
                            c.scheduleScale()
                        });
                        c.scale(!0);
                        var a = f.callback;
                        "function" === typeof a ? a(b, c) : a && "object" === typeof a && a.target[a.action].apply(a.target, [b, c])
                    };
                g ? h.apply(b[0]) : b.load(h)
            } else if ("string" == typeof a) c[a]()
        })
    };
    e.fn.imageScale.defaults = {
        scale: "best-fill",
        align: "center",
        parent: null,
        hideParentOverflow: !0,
        fadeInDuration: 0,
        rescaleOnResize: !0,
        callback: null,
        debug: 0
    };
    var l = function(a, b) {
        this.options = b;
        this.element = a;
        this.$element = e(a);
        this.elementWidth = a.naturalWidth || a.width;
        this.elementHeight = a.naturalHeight || a.height;
        this.$parent = b.parent ? b.parent : e(e(a).parent()[0])
    };
    e.fn.imageScale.Constructor = l;
    l.prototype = {
        NONE: "none",
        FILL: "fill",
        BEST_FILL: "best-fill",
        BEST_FIT: "best-fit",
        BEST_FIT_DOWN_ONLY: "best-fit-down",
        ALIGN_LEFT: "left",
        ALIGN_RIGHT: "right",
        ALIGN_CENTER: "center",
        ALIGN_TOP: "top",
        ALIGN_BOTTOM: "bottom",
        ALIGN_TOP_LEFT: "top-left",
        ALIGN_TOP_RIGHT: "top-right",
        ALIGN_BOTTOM_LEFT: "bottom-left",
        ALIGN_BOTTOM_RIGHT: "bottom-right",
        constructor: l,
        scale: function(a) {
            if (!this._isDestroyed) {
                var b = this.options,
                    c = this.$parent,
                    g = this.$element;
                a && (b.hideParentOverflow && c.css({
                    overflow: "hidden"
                }), g.css({
                    opacity: 1
                }));
                this._didScheduleScale = !1;
                if (!b.rescaleOnResize || this._needUpdate()) {
                    var f = c.outerWidth(),
                        h = c.outerHeight(),
                        e = c.innerWidth(),
                        c = c.innerHeight(),
                        e = f - e,
                        c = h - c,
                        k = g.attr("data-scale"),
                        d = g.attr("data-align"),
                        k = k ? k : b.scale,
                        l = d ? d : b.align,
                        d = b.fadeInDuration;
                    if (k) {
                        this._cacheDestWidth === f && this._cacheDestHeight === h && 2 < b.debug && console.log("imageScale - DEBUG NOTICE: The parent size hasn't changed: dest width: '" + f + "' - dest height: '" + h + "'.");
                        var m = this.elementWidth,
                            n = this.elementHeight;
                        f && h && m && n ? (this._cacheDestWidth = f, this._cacheDestHeight = h, b = this._innerFrameForSize(k, l, m, n, f, h), e && (b.x -= e / 2), c && (b.y -= c / 2), g.css({
                            position: "absolute",
                            top: b.y + "px",
                            left: b.x + "px",
                            width: b.width + "px",
                            height: b.height + "px",
                            "max-width": "none"
                        }), a && d && (g.css({
                            display: "none"
                        }), g.fadeIn(d))) : 0 < b.debug && console.error("imageScale - DEBUG ERROR: The dimensions are incorrect: source width: '" + m + "' - source height: '" + n + "' - dest width: '" + f + "' - dest height: '" + h + "'.")
                    } else 2 < b.debug && console.log("imageScale - DEBUG NOTICE: The scale property is null.")
                }
            }
        },
        destroy: function() {
            this._isDestroyed = !0;
            this.$element.removeData("imageScale")
        },
        _innerFrameForSize: function(a,
            b, c, g, f, h) {
            var e, k, d;
            d = {
                x: 0,
                y: 0,
                width: f,
                height: h
            };
            if (a === this.FILL) return d;
            e = f / c;
            k = h / g;
            switch (a) {
                case this.BEST_FILL:
                    a = e > k ? e : k;
                    break;
                case this.BEST_FIT:
                    a = e < k ? e : k;
                    break;
                case this.NONE:
                    a = 1;
                    break;
                default:
                    a !== this.BEST_FIT_DOWN_ONLY && 1 < this.options.debug && console.warn("imageScale - DEBUG WARNING: The scale '" + a + "' was not understood."), a = c > f || g > h ? e < k ? e : k : 1
            }
            c *= a;
            g *= a;
            d.width = Math.round(c);
            d.height = Math.round(g);
            switch (b) {
                case this.ALIGN_LEFT:
                    d.x = 0;
                    d.y = h / 2 - g / 2;
                    break;
                case this.ALIGN_RIGHT:
                    d.x = f - c;
                    d.y = h /
                        2 - g / 2;
                    break;
                case this.ALIGN_TOP:
                    d.x = f / 2 - c / 2;
                    d.y = 0;
                    break;
                case this.ALIGN_BOTTOM:
                    d.x = f / 2 - c / 2;
                    d.y = h - g;
                    break;
                case this.ALIGN_TOP_LEFT:
                    d.x = 0;
                    d.y = 0;
                    break;
                case this.ALIGN_TOP_RIGHT:
                    d.x = f - c;
                    d.y = 0;
                    break;
                case this.ALIGN_BOTTOM_LEFT:
                    d.x = 0;
                    d.y = h - g;
                    break;
                case this.ALIGN_BOTTOM_RIGHT:
                    d.x = f - c;
                    d.y = h - g;
                    break;
                default:
                    b !== this.ALIGN_CENTER && 1 < this.options.debug && console.warn("imageScale - DEBUG WARNING: The align '" + b + "' was not understood."), d.x = f / 2 - c / 2, d.y = h / 2 - g / 2
            }
            return d
        },
        _needUpdate: function() {
            var a = e(window).height() +
                " " + e(window).width();
            return this._lastWindowSize !== a ? (this._lastWindowSize = a, !0) : !1
        },
        scheduleScale: function() {
            if (!this._didScheduleScale)
                if (window.requestAnimationFrame) {
                    var a = this;
                    this._didScheduleScale = !0;
                    requestAnimationFrame(function() {
                        a.scale()
                    })
                } else this.scale()
        },
        _cacheDestWidth: null,
        _cacheDestHeight: null,
        _lastWindowSize: null,
        _didScheduleScale: null
    }
}(window.jQuery);




/*
 xx)-----------------------------------------------------------------
 Sticky-kit v1.1.1 | WTFPL | Leaf Corcoran 2014 | http://leafo.net
*/
(function() {
    var k, e;
    k = this.jQuery || window.jQuery;
    e = k(window);
    k.fn.stick_in_parent = function(d) {
        var v, y, n, p, h, C, s, G, q, H;
        null == d && (d = {});
        s = d.sticky_class;
        y = d.inner_scrolling;
        C = d.recalc_every;
        h = d.parent;
        p = d.offset_top;
        n = d.spacer;
        v = d.bottoming;
        null == p && (p = 0);
        null == h && (h = void 0);
        null == y && (y = !0);
        null == s && (s = "is_stuck");
        null == v && (v = !0);
        G = function(a, d, q, z, D, t, r, E) {
            var u, F, m, A, c, f, B, w, x, g, b;
            if (!a.data("sticky_kit")) {
                a.data("sticky_kit", !0);
                f = a.parent();
                null != h && (f = f.closest(h));
                if (!f.length) throw "failed to find stick parent";
                u = m = !1;
                (g = null != n ? n && a.closest(n) : k("<div />")) && g.css("position", a.css("position"));
                B = function() {
                    var c, e, l;
                    if (!E && (c = parseInt(f.css("border-top-width"), 10), e = parseInt(f.css("padding-top"), 10), d = parseInt(f.css("padding-bottom"), 10), q = f.offset().top + c + e, z = f.height(), m && (u = m = !1, null == n && (a.insertAfter(g), g.detach()), a.css({
                            position: "",
                            top: "",
                            width: "",
                            bottom: ""
                        }).removeClass(s), l = !0), D = a.offset().top - parseInt(a.css("margin-top"), 10) - p, t = a.outerHeight(!0), r = a.css("float"), g && g.css({
                            width: a.outerWidth(!0),
                            height: t,
                            display: a.css("display"),
                            "vertical-align": a.css("vertical-align"),
                            "float": r
                        }), l)) return b()
                };
                B();
                if (t !== z) return A = void 0, c = p, x = C, b = function() {
                        var b, k, l, h;
                        if (!E && (null != x && (--x, 0 >= x && (x = C, B())), l = e.scrollTop(), null != A && (k = l - A), A = l, m ? (v && (h = l + t + c > z + q, u && !h && (u = !1, a.css({
                                    position: "fixed",
                                    bottom: "",
                                    top: c
                                }).trigger("sticky_kit:unbottom"))), l < D && (m = !1, c = p, null == n && ("left" !== r && "right" !== r || a.insertAfter(g), g.detach()), b = {
                                    position: "",
                                    width: "",
                                    top: ""
                                }, a.css(b).removeClass(s).trigger("sticky_kit:unstick")),
                                y && (b = e.height(), t + p > b && !u && (c -= k, c = Math.max(b - t, c), c = Math.min(p, c), m && a.css({
                                    top: c + "px"
                                })))) : l > D && (m = !0, b = {
                                position: "fixed",
                                top: c
                            }, b.width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", a.css(b).addClass(s), null == n && (a.after(g), "left" !== r && "right" !== r || g.append(a)), a.trigger("sticky_kit:stick")), m && v && (null == h && (h = l + t + c > z + q), !u && h))) return u = !0, "static" === f.css("position") && f.css({
                            position: "relative"
                        }), a.css({
                            position: "absolute",
                            bottom: d,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")
                    },
                    w = function() {
                        B();
                        return b()
                    }, F = function() {
                        E = !0;
                        e.off("touchmove", b);
                        e.off("scroll", b);
                        e.off("resize", w);
                        k(document.body).off("sticky_kit:recalc", w);
                        a.off("sticky_kit:detach", F);
                        a.removeData("sticky_kit");
                        a.css({
                            position: "",
                            bottom: "",
                            top: "",
                            width: ""
                        });
                        f.position("position", "");
                        if (m) return null == n && ("left" !== r && "right" !== r || a.insertAfter(g), g.remove()), a.removeClass(s)
                    }, e.on("touchmove", b), e.on("scroll", b), e.on("resize", w), k(document.body).on("sticky_kit:recalc", w), a.on("sticky_kit:detach", F), setTimeout(b,
                        0)
            }
        };
        q = 0;
        for (H = this.length; q < H; q++) d = this[q], G(k(d));
        return this
    }
}).call(this);




/* xx)--------------------------------------------------------------
/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Scroll smooth to any element in your DOM.
 *
 * copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/17
 **/
$.scrollTo = $.fn.scrollTo = function(o, t, n) {
    return this instanceof $ ? (n = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: "swing",
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, n), this.each(function() {
        var a = $(this);
        a.stop().animate({
            scrollLeft: isNaN(Number(o)) ? $(t).offset().left + n.gap.x : o,
            scrollTop: isNaN(Number(t)) ? $(t).offset().top + n.gap.y : t
        }, n.animation)
    })) : $.fn.scrollTo.apply($("html, body"), arguments)
};




/* xx)--------------------------------------------------------------
 * jQuery Superfish Menu Plugin
 * copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

(function(e, t) {
    "use strict";
    var n = function() {
        var n = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            },
            r = function() {
                var n = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                if (n) {
                    e(t).load(function() {
                        e("body").children().on("click", e.noop)
                    })
                }
                return n
            }(),
            i = function() {
                var e = document.documentElement.style;
                return "behavior" in e && "fill" in e && /iemobile/i.test(navigator.userAgent)
            }(),
            s = function() {
                return !!t.PointerEvent
            }(),
            o = function(e, t) {
                var r = n.menuClass;
                if (t.cssArrows) {
                    r += " " + n.menuArrowClass
                }
                e.toggleClass(r)
            },
            u = function(t, r) {
                return t.find("li." + r.pathClass).slice(0, r.pathLevels).addClass(r.hoverClass + " " + n.bcClass).filter(function() {
                    return e(this).children(r.popUpSelector).hide().show().length
                }).removeClass(r.pathClass)
            },
            a = function(e) {
                e.children("a").toggleClass(n.anchorClass);
                e.toggleClass(n.anchorClass)
            },
            f = function(e) {
                var t = e.css("ms-touch-action");
                var n = e.css("touch-action");
                n = n || t;
                n = n === "pan-y" ? "auto" : "pan-y";
                e.css({
                    "ms-touch-action": n,
                    "touch-action": n
                })
            },
            l = function(t, n) {
                var o = "li:has(" + n.popUpSelector + ")";
                if (e.fn.hoverIntent && !n.disableHI) {
                    t.hoverIntent(h, p, o)
                } else {
                    t.on("mouseenter.superfish", o, h).on("mouseleave.superfish", o, p)
                }
                var u = "MSPointerDown.superfish";
                if (s) {
                    u = "pointerdown.superfish"
                }
                if (!r) {
                    u += " touchend.superfish"
                }
                if (i) {
                    u += " mousedown.superfish"
                }
                t.on("focusin.superfish", "li", h).on("focusout.superfish", "li", p).on(u, "a", n, c)
            },
            c = function(t) {
                var n = e(this),
                    r = n.siblings(t.data.popUpSelector);
                if (r.length > 0 && r.is(":hidden")) {
                    n.one("click.superfish", false);
                    if (t.type === "MSPointerDown" || t.type === "pointerdown") {
                        n.trigger("focus")
                    } else {
                        e.proxy(h, n.parent("li"))()
                    }
                }
            },
            h = function() {
                var t = e(this),
                    n = m(t);
                clearTimeout(n.sfTimer);
                t.siblings().superfish("hide").end().superfish("show")
            },
            p = function() {
                var t = e(this),
                    n = m(t);
                if (r) {
                    e.proxy(d, t, n)()
                } else {
                    clearTimeout(n.sfTimer);
                    n.sfTimer = setTimeout(e.proxy(d, t, n), n.delay)
                }
            },
            d = function(t) {
                t.retainPath = e.inArray(this[0], t.$path) > -1;
                this.superfish("hide");
                if (!this.parents("." + t.hoverClass).length) {
                    t.onIdle.call(v(this));
                    if (t.$path.length) {
                        e.proxy(h, t.$path)()
                    }
                }
            },
            v = function(e) {
                return e.closest("." + n.menuClass)
            },
            m = function(e) {
                return v(e).data("sf-options")
            };
        return {
            hide: function(t) {
                if (this.length) {
                    var n = this,
                        r = m(n);
                    if (!r) {
                        return this
                    }
                    var i = r.retainPath === true ? r.$path : "",
                        s = n.find("li." + r.hoverClass).add(this).not(i).removeClass(r.hoverClass).children(r.popUpSelector),
                        o = r.speedOut;
                    if (t) {
                        s.show();
                        o = 0
                    }
                    r.retainPath = false;
                    r.onBeforeHide.call(s);
                    s.stop(true, true).animate(r.animationOut, o, function() {
                        var t = e(this);
                        r.onHide.call(t)
                    })
                }
                return this
            },
            show: function() {
                var e = m(this);
                if (!e) {
                    return this
                }
                var t = this.addClass(e.hoverClass),
                    n = t.children(e.popUpSelector);
                e.onBeforeShow.call(n);
                n.stop(true, true).animate(e.animation, e.speed, function() {
                    e.onShow.call(n)
                });
                return this
            },
            destroy: function() {
                return this.each(function() {
                    var t = e(this),
                        r = t.data("sf-options"),
                        i;
                    if (!r) {
                        return false
                    }
                    i = t.find(r.popUpSelector).parent("li");
                    clearTimeout(r.sfTimer);
                    o(t, r);
                    a(i);
                    f(t);
                    t.off(".superfish").off(".hoverIntent");
                    i.children(r.popUpSelector).attr("style", function(e, t) {
                        return t.replace(/display[^;]+;?/g, "")
                    });
                    r.$path.removeClass(r.hoverClass + " " + n.bcClass).addClass(r.pathClass);
                    t.find("." + r.hoverClass).removeClass(r.hoverClass);
                    r.onDestroy.call(t);
                    t.removeData("sf-options")
                })
            },
            init: function(t) {
                return this.each(function() {
                    var r = e(this);
                    if (r.data("sf-options")) {
                        return false
                    }
                    var i = e.extend({}, e.fn.superfish.defaults, t),
                        s = r.find(i.popUpSelector).parent("li");
                    i.$path = u(r, i);
                    r.data("sf-options", i);
                    o(r, i);
                    a(s);
                    f(r);
                    l(r, i);
                    s.not("." + n.bcClass).superfish("hide", true);
                    i.onInit.call(this)
                })
            }
        }
    }();
    e.fn.superfish = function(t, r) {
        if (n[t]) {
            return n[t].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof t === "object" || !t) {
            return n.init.apply(this, arguments)
        } else {
            return e.error("Method " + t + " does not exist on jQuery.fn.superfish")
        }
    };
    e.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: true,
        disableHI: false,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop
    }
})(jQuery, window)




/* xx)--------------------------------------------------------------
 * rainyday.js v0.1.2 - https://github.com/maroslaw/rainyday.js
 * Copyright (c) 2014 Marek Brodziak
 * Licensed under the GPLv2 license
 */
function RainyDay(a, b) {
    if (this === window) return new RainyDay(a);
    this.img = a.image;
    var c = {
        opacity: 1,
        blur: 10,
        crop: [0, 0, this.img.naturalWidth, this.img.naturalHeight],
        enableSizeChange: !0,
        parentElement: document.getElementsByTagName("body")[0],
        fps: 30,
        fillStyle: "#8ED6FF",
        enableCollisions: !0,
        gravityThreshold: 3,
        gravityAngle: Math.PI / 2,
        gravityAngleVariance: 0,
        reflectionScaledownFactor: 5,
        reflectionDropMappingWidth: 200,
        reflectionDropMappingHeight: 200,
        width: this.img.clientWidth,
        height: this.img.clientHeight,
        position: "absolute",
        top: 0,
        left: 0
    };
    for (var d in c) "undefined" == typeof a[d] && (a[d] = c[d]);
    this.options = a, this.drops = [], this.canvas = b || this.prepareCanvas(), this.prepareBackground(), this.prepareGlass(), this.reflection = this.REFLECTION_MINIATURE, this.trail = this.TRAIL_DROPS, this.gravity = this.GRAVITY_NON_LINEAR, this.collision = this.COLLISION_SIMPLE, this.setRequestAnimFrame()
}

function Drop(a, b, c, d, e) {
    this.x = Math.floor(b), this.y = Math.floor(c), this.r = Math.random() * e + d, this.rainyday = a, this.context = a.context, this.reflection = a.reflected
}

function BlurStack() {
    this.r = 0, this.g = 0, this.b = 0, this.next = null
}

function CollisionMatrix(a, b, c) {
    this.resolution = c, this.xc = a, this.yc = b, this.matrix = new Array(a);
    for (var d = 0; a + 5 >= d; d++) {
        this.matrix[d] = new Array(b);
        for (var e = 0; b + 5 >= e; ++e) this.matrix[d][e] = new DropItem(null)
    }
}

function DropItem(a) {
    this.drop = a, this.next = null
}
RainyDay.prototype.prepareCanvas = function() {
    var a = document.createElement("canvas");
    return a.style.position = this.options.position, a.style.top = this.options.top, a.style.left = this.options.left, a.width = this.options.width, a.height = this.options.height, this.options.parentElement.appendChild(a), this.options.enableSizeChange && this.setResizeHandler(), a
}, RainyDay.prototype.setResizeHandler = function() {
    null !== window.onresize ? window.setInterval(this.checkSize.bind(this), 100) : (window.onresize = this.checkSize.bind(this), window.onorientationchange = this.checkSize.bind(this))
}, RainyDay.prototype.checkSize = function() {
    var a = this.img.clientWidth,
        b = this.img.clientHeight,
        c = this.img.offsetLeft,
        d = this.img.offsetTop,
        e = this.canvas.width,
        f = this.canvas.height,
        g = this.canvas.offsetLeft,
        h = this.canvas.offsetTop;
    (e !== a || f !== b) && (this.canvas.width = a, this.canvas.height = b, this.prepareBackground(), this.glass.width = this.canvas.width, this.glass.height = this.canvas.height, this.prepareReflections()), (g !== c || h !== d) && (this.canvas.offsetLeft = c, this.canvas.offsetTop = d)
}, RainyDay.prototype.animateDrops = function() {
    this.addDropCallback && this.addDropCallback();
    for (var a = this.drops.slice(), b = [], c = 0; c < a.length; ++c) a[c].animate() && b.push(a[c]);
    this.drops = b, window.requestAnimFrame(this.animateDrops.bind(this))
}, RainyDay.prototype.setRequestAnimFrame = function() {
    var a = this.options.fps;
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(b) {
            window.setTimeout(b, 1e3 / a)
        }
    }()
}, RainyDay.prototype.prepareReflections = function() {
    this.reflected = document.createElement("canvas"), this.reflected.width = this.canvas.width / this.options.reflectionScaledownFactor, this.reflected.height = this.canvas.height / this.options.reflectionScaledownFactor;
    var a = this.reflected.getContext("2d");
    a.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.reflected.width, this.reflected.height)
}, RainyDay.prototype.prepareGlass = function() {
    this.glass = document.createElement("canvas"), this.glass.width = this.canvas.width, this.glass.height = this.canvas.height, this.context = this.glass.getContext("2d")
}, RainyDay.prototype.rain = function(a, b) {
    if (this.reflection !== this.REFLECTION_NONE && this.prepareReflections(), this.animateDrops(), this.presets = a, this.PRIVATE_GRAVITY_FORCE_FACTOR_Y = .001 * this.options.fps / 25, this.PRIVATE_GRAVITY_FORCE_FACTOR_X = .001 * (Math.PI / 2 - this.options.gravityAngle) * this.options.fps / 50, this.options.enableCollisions) {
        for (var c = 0, d = 0; d < a.length; d++) a[d][0] + a[d][1] > c && (c = Math.floor(a[d][0] + a[d][1]));
        if (c > 0) {
            var e = Math.ceil(this.canvas.width / c),
                f = Math.ceil(this.canvas.height / c);
            this.matrix = new CollisionMatrix(e, f, c)
        } else this.options.enableCollisions = !1
    }
    for (var d = 0; d < a.length; d++) a[d][3] || (a[d][3] = -1);
    var g = 0;
    this.addDropCallback = function() {
        var c = (new Date).getTime();
        if (!(b > c - g)) {
            g = c;
            var d = this.canvas.getContext("2d");
            d.clearRect(0, 0, this.canvas.width, this.canvas.height), d.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
            for (var e, f = 0; f < a.length; f++)
                if (a[f][2] > 1 || -1 === a[f][3]) {
                    if (0 !== a[f][3]) {
                        a[f][3]--;
                        for (var h = 0; h < a[f][2]; ++h) this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, a[f][0], a[f][1]))
                    }
                } else if (Math.random() < a[f][2]) {
                e = a[f];
                break
            }
            e && this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, e[0], e[1])), d.save(), d.globalAlpha = this.opacity, d.drawImage(this.glass, 0, 0, this.canvas.width, this.canvas.height), d.restore()
        }
    }.bind(this)
}, RainyDay.prototype.putDrop = function(a) {
    a.draw(), this.gravity && a.r > this.options.gravityThreshold && (this.options.enableCollisions && this.matrix.update(a), this.drops.push(a))
}, RainyDay.prototype.clearDrop = function(a, b) {
    var c = a.clear(b);
    if (c) {
        var d = this.drops.indexOf(a);
        d >= 0 && this.drops.splice(d, 1)
    }
    return c
}, Drop.prototype.draw = function() {
    this.context.save(), this.context.beginPath();
    var a = this.r;
    if (this.r = .95 * this.r, this.r < 3) this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, !0), this.context.closePath();
    else if (this.colliding || this.yspeed > 2) {
        if (this.colliding) {
            var b = this.colliding;
            this.r = 1.001 * (this.r > b.r ? this.r : b.r), this.x += b.x - this.x, this.colliding = null
        }
        var c = 1 + .1 * this.yspeed;
        this.context.moveTo(this.x - this.r / c, this.y), this.context.bezierCurveTo(this.x - this.r, this.y - 2 * this.r, this.x + this.r, this.y - 2 * this.r, this.x + this.r / c, this.y), this.context.bezierCurveTo(this.x + this.r, this.y + c * this.r, this.x - this.r, this.y + c * this.r, this.x - this.r / c, this.y)
    } else this.context.arc(this.x, this.y, .9 * this.r, 0, 2 * Math.PI, !0), this.context.closePath();
    this.context.clip(), this.r = a, this.rainyday.reflection && this.rainyday.reflection(this), this.context.restore()
}, Drop.prototype.clear = function(a) {
    return this.context.clearRect(this.x - this.r - 1, this.y - this.r - 2, 2 * this.r + 2, 2 * this.r + 2), a ? (this.terminate = !0, !0) : this.y - this.r > this.rainyday.h || this.x - this.r > this.rainyday.w || this.x + this.r < 0 ? !0 : !1
}, Drop.prototype.animate = function() {
    if (this.terminate) return !1;
    var a = this.rainyday.gravity(this);
    if (!a && this.rainyday.trail && this.rainyday.trail(this), this.rainyday.options.enableCollisions) {
        var b = this.rainyday.matrix.update(this, a);
        b && this.rainyday.collision(this, b)
    }
    return !a || this.terminate
}, RainyDay.prototype.TRAIL_NONE = function() {}, RainyDay.prototype.TRAIL_DROPS = function(a) {
    (!a.trailY || a.y - a.trailY >= 100 * Math.random() * a.r) && (a.trailY = a.y, this.putDrop(new Drop(this, a.x + (2 * Math.random() - 1) * Math.random(), a.y - a.r - 5, Math.ceil(a.r / 5), 0)))
}, RainyDay.prototype.TRAIL_SMUDGE = function(a) {
    var b = a.y - a.r - 3,
        c = a.x - a.r / 2 + 2 * Math.random();
    0 > b || 0 > c || this.context.drawImage(this.clearbackground, c, b, a.r, 2, c, b, a.r, 2)
}, RainyDay.prototype.GRAVITY_NONE = function() {
    return !0
}, RainyDay.prototype.GRAVITY_LINEAR = function(a) {
    return this.clearDrop(a) ? !0 : (a.yspeed ? (a.yspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(a.r), a.xspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(a.r)) : (a.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y, a.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X), a.y += a.yspeed, a.draw(), !1)
}, RainyDay.prototype.GRAVITY_NON_LINEAR = function(a) {
    return this.clearDrop(a) ? !0 : (a.collided ? (a.collided = !1, a.seed = Math.floor(a.r * Math.random() * this.options.fps), a.skipping = !1, a.slowing = !1) : (!a.seed || a.seed < 0) && (a.seed = Math.floor(a.r * Math.random() * this.options.fps), a.skipping = a.skipping === !1 ? !0 : !1, a.slowing = !0), a.seed--, a.yspeed ? a.slowing ? (a.yspeed /= 1.1, a.xspeed /= 1.1, a.yspeed < this.PRIVATE_GRAVITY_FORCE_FACTOR_Y && (a.slowing = !1)) : a.skipping ? (a.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y, a.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X) : (a.yspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(a.r), a.xspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(a.r)) : (a.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y, a.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X), 0 !== this.options.gravityAngleVariance && (a.xspeed += (2 * Math.random() - 1) * a.yspeed * this.options.gravityAngleVariance), a.y += a.yspeed, a.x += a.xspeed, a.draw(), !1)
}, RainyDay.prototype.positiveMin = function(a, b) {
    var c = 0;
    return c = b > a ? 0 >= a ? b : a : 0 >= b ? a : b, 0 >= c ? 1 : c
}, RainyDay.prototype.REFLECTION_NONE = function() {
    this.context.fillStyle = this.options.fillStyle, this.context.fill()
}, RainyDay.prototype.REFLECTION_MINIATURE = function(a) {
    var b = Math.max((a.x - this.options.reflectionDropMappingWidth) / this.options.reflectionScaledownFactor, 0),
        c = Math.max((a.y - this.options.reflectionDropMappingHeight) / this.options.reflectionScaledownFactor, 0),
        d = this.positiveMin(2 * this.options.reflectionDropMappingWidth / this.options.reflectionScaledownFactor, this.reflected.width - b),
        e = this.positiveMin(2 * this.options.reflectionDropMappingHeight / this.options.reflectionScaledownFactor, this.reflected.height - c),
        f = Math.max(a.x - 1.1 * a.r, 0),
        g = Math.max(a.y - 1.1 * a.r, 0);
    this.context.drawImage(this.reflected, b, c, d, e, f, g, 2 * a.r, 2 * a.r)
}, RainyDay.prototype.COLLISION_SIMPLE = function(a, b) {
    for (var c, d = b; null != d;) {
        var e = d.drop;
        if (Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2)) < a.r + e.r) {
            c = e;
            break
        }
        d = d.next
    }
    if (c) {
        var f, g;
        a.y > c.y ? (f = a, g = c) : (f = c, g = a), this.clearDrop(g), this.clearDrop(f, !0), this.matrix.remove(f), g.draw(), g.colliding = f, g.collided = !0
    }
}, RainyDay.prototype.prepareBackground = function() {
    this.background = document.createElement("canvas"), this.background.width = this.canvas.width, this.background.height = this.canvas.height, this.clearbackground = document.createElement("canvas"), this.clearbackground.width = this.canvas.width, this.clearbackground.height = this.canvas.height;
    var a = this.background.getContext("2d");
    a.clearRect(0, 0, this.canvas.width, this.canvas.height), a.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height), a = this.clearbackground.getContext("2d"), a.clearRect(0, 0, this.canvas.width, this.canvas.height), a.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height), !isNaN(this.options.blur) && this.options.blur >= 1 && this.stackBlurCanvasRGB(this.canvas.width, this.canvas.height, this.options.blur)
}, RainyDay.prototype.stackBlurCanvasRGB = function(a, b, c) {
    var d = [
            [0, 9],
            [1, 11],
            [2, 12],
            [3, 13],
            [5, 14],
            [7, 15],
            [11, 16],
            [15, 17],
            [22, 18],
            [31, 19],
            [45, 20],
            [63, 21],
            [90, 22],
            [127, 23],
            [181, 24]
        ],
        e = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    c |= 0;
    var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z = this.background.getContext("2d"),
        A = z.getImageData(0, 0, a, b),
        B = A.data,
        C = c + 1,
        D = C * (C + 1) / 2,
        E = new BlurStack,
        F = new BlurStack,
        G = E;
    for (h = 1; 2 * c + 1 > h; h++) G = G.next = new BlurStack, h === C && (F = G);
    G.next = E;
    var H = null,
        I = null;
    l = k = 0;
    for (var J, K = e[c], L = 0; L < d.length; ++L)
        if (c <= d[L][0]) {
            J = d[L - 1][1];
            break
        }
    for (g = 0; b > g; g++) {
        for (s = t = u = m = n = o = 0, p = C * (v = B[k]), q = C * (w = B[k + 1]), r = C * (x = B[k + 2]), m += D * v, n += D * w, o += D * x, G = E, h = 0; C > h; h++) G.r = v, G.g = w, G.b = x, G = G.next;
        for (h = 1; C > h; h++) i = k + ((h > a - 1 ? a - 1 : h) << 2), m += (G.r = v = B[i]) * (y = C - h), n += (G.g = w = B[i + 1]) * y, o += (G.b = x = B[i + 2]) * y, s += v, t += w, u += x, G = G.next;
        for (H = E, I = F, f = 0; a > f; f++) B[k] = m * K >> J, B[k + 1] = n * K >> J, B[k + 2] = o * K >> J, m -= p, n -= q, o -= r, p -= H.r, q -= H.g, r -= H.b, i = l + ((i = f + c + 1) < a - 1 ? i : a - 1) << 2, s += H.r = B[i], t += H.g = B[i + 1], u += H.b = B[i + 2], m += s, n += t, o += u, H = H.next, p += v = I.r, q += w = I.g, r += x = I.b, s -= v, t -= w, u -= x, I = I.next, k += 4;
        l += a
    }
    for (f = 0; a > f; f++) {
        for (t = u = s = n = o = m = 0, k = f << 2, p = C * (v = B[k]), q = C * (w = B[k + 1]), r = C * (x = B[k + 2]), m += D * v, n += D * w, o += D * x, G = E, h = 0; C > h; h++) G.r = v, G.g = w, G.b = x, G = G.next;
        for (j = a, h = 1; C > h; h++) k = j + f << 2, m += (G.r = v = B[k]) * (y = C - h), n += (G.g = w = B[k + 1]) * y, o += (G.b = x = B[k + 2]) * y, s += v, t += w, u += x, G = G.next, b - 1 > h && (j += a);
        for (k = f, H = E, I = F, g = 0; b > g; g++) i = k << 2, B[i] = m * K >> J, B[i + 1] = n * K >> J, B[i + 2] = o * K >> J, m -= p, n -= q, o -= r, p -= H.r, q -= H.g, r -= H.b, i = f + ((i = g + C) < b - 1 ? i : b - 1) * a << 2, m += s += H.r = B[i], n += t += H.g = B[i + 1], o += u += H.b = B[i + 2], H = H.next, p += v = I.r, q += w = I.g, r += x = I.b, s -= v, t -= w, u -= x, I = I.next, k += a
    }
    z.putImageData(A, 0, 0)
}, CollisionMatrix.prototype.update = function(a, b) {
    if (a.gid) {
        if (!this.matrix[a.gmx] || !this.matrix[a.gmx][a.gmy]) return null;
        if (this.matrix[a.gmx][a.gmy].remove(a), b) return null;
        if (a.gmx = Math.floor(a.x / this.resolution), a.gmy = Math.floor(a.y / this.resolution), !this.matrix[a.gmx] || !this.matrix[a.gmx][a.gmy]) return null;
        this.matrix[a.gmx][a.gmy].add(a);
        var c = this.collisions(a);
        if (c && null != c.next) return c.next
    } else {
        if (a.gid = Math.random().toString(36).substr(2, 9), a.gmx = Math.floor(a.x / this.resolution), a.gmy = Math.floor(a.y / this.resolution), !this.matrix[a.gmx] || !this.matrix[a.gmx][a.gmy]) return null;
        this.matrix[a.gmx][a.gmy].add(a)
    }
    return null
}, CollisionMatrix.prototype.collisions = function(a) {
    var b = new DropItem(null),
        c = b;
    return b = this.addAll(b, a.gmx - 1, a.gmy + 1), b = this.addAll(b, a.gmx, a.gmy + 1), b = this.addAll(b, a.gmx + 1, a.gmy + 1), c
}, CollisionMatrix.prototype.addAll = function(a, b, c) {
    if (b > 0 && c > 0 && b < this.xc && c < this.yc)
        for (var d = this.matrix[b][c]; null != d.next;) d = d.next, a.next = new DropItem(d.drop), a = a.next;
    return a
}, CollisionMatrix.prototype.remove = function(a) {
    this.matrix[a.gmx][a.gmy].remove(a)
}, DropItem.prototype.add = function(a) {
    for (var b = this; null != b.next;) b = b.next;
    b.next = new DropItem(a)
}, DropItem.prototype.remove = function(a) {
    for (var b = this, c = null; null != b.next;) c = b, b = b.next, b.drop.gid === a.gid && (c.next = b.next)
};




/*
 xx)-----------------------------------------------------------------
/* jquery.nicescroll 3.2.0 InuYaksa*2013 MIT http://areaaperta.com/nicescroll */
(function(e) {
    var y = !1,
        D = !1,
        J = 5E3,
        K = 2E3,
        x = 0,
        L = function() {
            var e = document.getElementsByTagName("script"),
                e = e[e.length - 1].src.split("?")[0];
            return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : ""
        }();
    Array.prototype.forEach || (Array.prototype.forEach = function(e, c) {
        for (var h = 0, l = this.length; h < l; ++h) e.call(c, this[h], h, this)
    });
    var v = window.requestAnimationFrame || !1,
        w = window.cancelAnimationFrame || !1;
    ["ms", "moz", "webkit", "o"].forEach(function(e) {
        v || (v = window[e + "RequestAnimationFrame"]);
        w || (w =
            window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"])
    });
    var z = window.MutationObserver || window.WebKitMutationObserver || !1,
        F = {
            zindex: "auto",
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorcolor: "#424242",
            cursorwidth: "5px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 60,
            mousescrollstep: 24,
            touchbehavior: !1,
            hwacceleration: !0,
            usetransition: !0,
            boxzoom: !1,
            dblclickzoom: !0,
            gesturezoom: !0,
            grabcursorenabled: !0,
            autohidemode: !0,
            background: "",
            iframeautoresize: !0,
            cursorminheight: 32,
            preservenativescrolling: !0,
            railoffset: !1,
            bouncescroll: !0,
            spacebarenabled: !0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: !0,
            horizrailenabled: !0,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: !0,
            enablemousewheel: !0,
            enablekeyboard: !0,
            smoothscroll: !0,
            sensitiverail: !0,
            enablemouselockapi: !0,
            cursorfixedheight: !1,
            directionlockdeadzone: 6,
            hidecursordelay: 400,
            nativeparentscrolling: !0,
            enablescrollonselection: !0,
            overflowx: !0,
            overflowy: !0,
            cursordragspeed: 0.3,
            rtlmode: !1,
            cursordragontouch: !1
        },
        E = !1,
        M = function() {
            if (E) return E;
            var e = document.createElement("DIV"),
                c = {
                    haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
                };
            c.isopera = "opera" in window;
            c.isopera12 = c.isopera && "getUserMedia" in navigator;
            c.isie = "all" in document && "attachEvent" in e && !c.isopera;
            c.isieold = c.isie && !("msInterpolationMode" in e.style);
            c.isie7 = c.isie && !c.isieold && (!("documentMode" in document) || 7 == document.documentMode);
            c.isie8 = c.isie && "documentMode" in document &&
                8 == document.documentMode;
            c.isie9 = c.isie && "performance" in window && 9 <= document.documentMode;
            c.isie10 = c.isie && "performance" in window && 10 <= document.documentMode;
            c.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
            c.isie9mobile && (c.isie9 = !1);
            c.isie7mobile = !c.isie9mobile && c.isie7 && /iemobile/i.test(navigator.userAgent);
            c.ismozilla = "MozAppearance" in e.style;
            c.iswebkit = "WebkitAppearance" in e.style;
            c.ischrome = "chrome" in window;
            c.ischrome22 = c.ischrome && c.haspointerlock;
            c.ischrome26 = c.ischrome && "transition" in
                e.style;
            c.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
            c.hasmstouch = window.navigator.msPointerEnabled || !1;
            c.ismac = /^mac$/i.test(navigator.platform);
            c.isios = c.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);
            c.isios4 = c.isios && !("seal" in Object);
            c.isandroid = /android/i.test(navigator.userAgent);
            c.trstyle = !1;
            c.hastransform = !1;
            c.hastranslate3d = !1;
            c.transitionstyle = !1;
            c.hastransition = !1;
            c.transitionend = !1;
            for (var h = ["transform", "msTransform", "webkitTransform", "MozTransform",
                    "OTransform"
                ], l = 0; l < h.length; l++)
                if ("undefined" != typeof e.style[h[l]]) {
                    c.trstyle = h[l];
                    break
                }
            c.hastransform = !1 != c.trstyle;
            c.hastransform && (e.style[c.trstyle] = "translate3d(1px,2px,3px)", c.hastranslate3d = /translate3d/.test(e.style[c.trstyle]));
            c.transitionstyle = !1;
            c.prefixstyle = "";
            c.transitionend = !1;
            for (var h = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), n = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "), t = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "),
                    l = 0; l < h.length; l++)
                if (h[l] in e.style) {
                    c.transitionstyle = h[l];
                    c.prefixstyle = n[l];
                    c.transitionend = t[l];
                    break
                }
            c.ischrome26 && (c.prefixstyle = n[1]);
            c.hastransition = c.transitionstyle;
            a: {
                h = ["-moz-grab", "-webkit-grab", "grab"];
                if (c.ischrome && !c.ischrome22 || c.isie) h = [];
                for (l = 0; l < h.length; l++)
                    if (n = h[l], e.style.cursor = n, e.style.cursor == n) {
                        h = n;
                        break a
                    }
                h = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
            }
            c.cursorgrabvalue = h;
            c.hasmousecapture = "setCapture" in e;
            c.hasMutationObserver = !1 !== z;
            return E =
                c
        },
        N = function(k, c) {
            function h() {
                var d = b.win;
                if ("zIndex" in d) return d.zIndex();
                for (; 0 < d.length && 9 != d[0].nodeType;) {
                    var c = d.css("zIndex");
                    if (!isNaN(c) && 0 != c) return parseInt(c);
                    d = d.parent()
                }
                return !1
            }

            function l(d, c, g) {
                c = d.css(c);
                d = parseFloat(c);
                return isNaN(d) ? (d = u[c] || 0, g = 3 == d ? g ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1, b.isie8 && d && (d += 1), g ? d : 0) : d
            }

            function n(d, c, g, e) {
                b._bind(d, c, function(b) {
                    b = b ? b : window.event;
                    var e = {
                        original: b,
                        target: b.target || b.srcElement,
                        type: "wheel",
                        deltaMode: "MozMousePixelScroll" == b.type ? 0 : 1,
                        deltaX: 0,
                        deltaZ: 0,
                        preventDefault: function() {
                            b.preventDefault ? b.preventDefault() : b.returnValue = !1;
                            return !1
                        },
                        stopImmediatePropagation: function() {
                            b.stopImmediatePropagation ? b.stopImmediatePropagation() : b.cancelBubble = !0
                        }
                    };
                    "mousewheel" == c ? (e.deltaY = -0.025 * b.wheelDelta, b.wheelDeltaX && (e.deltaX = -0.025 * b.wheelDeltaX)) : e.deltaY = b.detail;
                    return g.call(d, e)
                }, e)
            }

            function t(d, c, g) {
                var e, f;
                0 == d.deltaMode ? (e = -Math.floor(d.deltaX * (b.opt.mousescrollstep / 54)), f = -Math.floor(d.deltaY *
                    (b.opt.mousescrollstep / 54))) : 1 == d.deltaMode && (e = -Math.floor(d.deltaX * b.opt.mousescrollstep), f = -Math.floor(d.deltaY * b.opt.mousescrollstep));
                c && (0 == e && f) && (e = f, f = 0);
                e && (b.scrollmom && b.scrollmom.stop(), b.lastdeltax += e, b.debounced("mousewheelx", function() {
                    var d = b.lastdeltax;
                    b.lastdeltax = 0;
                    b.rail.drag || b.doScrollLeftBy(d)
                }, 120));
                if (f) {
                    if (b.opt.nativeparentscrolling && g && !b.ispage && !b.zoomactive)
                        if (0 > f) {
                            if (b.getScrollTop() >= b.page.maxh) return !0
                        } else if (0 >= b.getScrollTop()) return !0;
                    b.scrollmom && b.scrollmom.stop();
                    b.lastdeltay += f;
                    b.debounced("mousewheely", function() {
                        var d = b.lastdeltay;
                        b.lastdeltay = 0;
                        b.rail.drag || b.doScrollBy(d)
                    }, 120)
                }
                d.stopImmediatePropagation();
                return d.preventDefault()
            }
            var b = this;
            this.version = "3.4.0";
            this.name = "nicescroll";
            this.me = c;
            this.opt = {
                doc: e("body"),
                win: !1
            };
            e.extend(this.opt, F);
            this.opt.snapbackspeed = 80;
            if (k)
                for (var q in b.opt) "undefined" != typeof k[q] && (b.opt[q] = k[q]);
            this.iddoc = (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
            this.ispage = /BODY|HTML/.test(b.opt.win ? b.opt.win[0].nodeName :
                this.doc[0].nodeName);
            this.haswrapper = !1 !== b.opt.win;
            this.win = b.opt.win || (this.ispage ? e(window) : this.doc);
            this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;
            this.body = e("body");
            this.iframe = this.isfixed = this.viewport = !1;
            this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
            this.istextarea = "TEXTAREA" == this.win[0].nodeName;
            this.forcescreen = !1;
            this.canshowonmouseevent = "scroll" != b.opt.autohidemode;
            this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel =
                this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
            this.scroll = {
                x: 0,
                y: 0
            };
            this.scrollratio = {
                x: 0,
                y: 0
            };
            this.cursorheight = 20;
            this.scrollvaluemax = 0;
            this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.checkrtlmode = !1;
            do this.id = "ascrail" + K++; while (document.getElementById(this.id));
            this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor =
                this.rail = !1;
            this.visibility = !0;
            this.hidden = this.locked = !1;
            this.cursoractive = !0;
            this.overflowx = b.opt.overflowx;
            this.overflowy = b.opt.overflowy;
            this.nativescrollingarea = !1;
            this.checkarea = 0;
            this.events = [];
            this.saved = {};
            this.delaylist = {};
            this.synclist = {};
            this.lastdeltay = this.lastdeltax = 0;
            this.detected = M();
            var f = e.extend({}, this.detected);
            this.ishwscroll = (this.canhwscroll = f.hastransform && b.opt.hwacceleration) && b.haswrapper;
            this.istouchcapable = !1;
            f.cantouch && (f.ischrome && !f.isios && !f.isandroid) && (this.istouchcapable = !0, f.cantouch = !1);
            f.cantouch && (f.ismozilla && !f.isios) && (this.istouchcapable = !0, f.cantouch = !1);
            b.opt.enablemouselockapi || (f.hasmousecapture = !1, f.haspointerlock = !1);
            this.delayed = function(d, c, g, e) {
                var f = b.delaylist[d],
                    h = (new Date).getTime();
                if (!e && f && f.tt) return !1;
                f && f.tt && clearTimeout(f.tt);
                if (f && f.last + g > h && !f.tt) b.delaylist[d] = {
                    last: h + g,
                    tt: setTimeout(function() {
                        b.delaylist[d].tt = 0;
                        c.call()
                    }, g)
                };
                else if (!f || !f.tt) b.delaylist[d] = {
                    last: h,
                    tt: 0
                }, setTimeout(function() {
                    c.call()
                }, 0)
            };
            this.debounced = function(d,
                c, g) {
                var f = b.delaylist[d];
                (new Date).getTime();
                b.delaylist[d] = c;
                f || setTimeout(function() {
                    var c = b.delaylist[d];
                    b.delaylist[d] = !1;
                    c.call()
                }, g)
            };
            this.synched = function(d, c) {
                b.synclist[d] = c;
                (function() {
                    b.onsync || (v(function() {
                        b.onsync = !1;
                        for (d in b.synclist) {
                            var c = b.synclist[d];
                            c && c.call(b);
                            b.synclist[d] = !1
                        }
                    }), b.onsync = !0)
                })();
                return d
            };
            this.unsynched = function(d) {
                b.synclist[d] && (b.synclist[d] = !1)
            };
            this.css = function(d, c) {
                for (var g in c) b.saved.css.push([d, g, d.css(g)]), d.css(g, c[g])
            };
            this.scrollTop = function(d) {
                return "undefined" ==
                    typeof d ? b.getScrollTop() : b.setScrollTop(d)
            };
            this.scrollLeft = function(d) {
                return "undefined" == typeof d ? b.getScrollLeft() : b.setScrollLeft(d)
            };
            BezierClass = function(b, c, g, f, e, h, l) {
                this.st = b;
                this.ed = c;
                this.spd = g;
                this.p1 = f || 0;
                this.p2 = e || 1;
                this.p3 = h || 0;
                this.p4 = l || 1;
                this.ts = (new Date).getTime();
                this.df = this.ed - this.st
            };
            BezierClass.prototype = {
                B2: function(b) {
                    return 3 * b * b * (1 - b)
                },
                B3: function(b) {
                    return 3 * b * (1 - b) * (1 - b)
                },
                B4: function(b) {
                    return (1 - b) * (1 - b) * (1 - b)
                },
                getNow: function() {
                    var b = 1 - ((new Date).getTime() - this.ts) /
                        this.spd,
                        c = this.B2(b) + this.B3(b) + this.B4(b);
                    return 0 > b ? this.ed : this.st + Math.round(this.df * c)
                },
                update: function(b, c) {
                    this.st = this.getNow();
                    this.ed = b;
                    this.spd = c;
                    this.ts = (new Date).getTime();
                    this.df = this.ed - this.st;
                    return this
                }
            };
            if (this.ishwscroll) {
                this.doc.translate = {
                    x: 0,
                    y: 0,
                    tx: "0px",
                    ty: "0px"
                };
                f.hastranslate3d && f.isios && this.doc.css("-webkit-backface-visibility", "hidden");
                var r = function() {
                    var d = b.doc.css(f.trstyle);
                    return d && "matrix" == d.substr(0, 6) ? d.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) :
                        !1
                };
                this.getScrollTop = function(d) {
                    if (!d) {
                        if (d = r()) return 16 == d.length ? -d[13] : -d[5];
                        if (b.timerscroll && b.timerscroll.bz) return b.timerscroll.bz.getNow()
                    }
                    return b.doc.translate.y
                };
                this.getScrollLeft = function(d) {
                    if (!d) {
                        if (d = r()) return 16 == d.length ? -d[12] : -d[4];
                        if (b.timerscroll && b.timerscroll.bh) return b.timerscroll.bh.getNow()
                    }
                    return b.doc.translate.x
                };
                this.notifyScrollEvent = document.createEvent ? function(b) {
                        var c = document.createEvent("UIEvents");
                        c.initUIEvent("scroll", !1, !0, window, 1);
                        b.dispatchEvent(c)
                    } :
                    document.fireEvent ? function(b) {
                        var c = document.createEventObject();
                        b.fireEvent("onscroll");
                        c.cancelBubble = !0
                    } : function(b, c) {};
                f.hastranslate3d && b.opt.enabletranslate3d ? (this.setScrollTop = function(d, c) {
                    b.doc.translate.y = d;
                    b.doc.translate.ty = -1 * d + "px";
                    b.doc.css(f.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");
                    c || b.notifyScrollEvent(b.win[0])
                }, this.setScrollLeft = function(d, c) {
                    b.doc.translate.x = d;
                    b.doc.translate.tx = -1 * d + "px";
                    b.doc.css(f.trstyle, "translate3d(" + b.doc.translate.tx +
                        "," + b.doc.translate.ty + ",0px)");
                    c || b.notifyScrollEvent(b.win[0])
                }) : (this.setScrollTop = function(d, c) {
                    b.doc.translate.y = d;
                    b.doc.translate.ty = -1 * d + "px";
                    b.doc.css(f.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");
                    c || b.notifyScrollEvent(b.win[0])
                }, this.setScrollLeft = function(d, c) {
                    b.doc.translate.x = d;
                    b.doc.translate.tx = -1 * d + "px";
                    b.doc.css(f.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");
                    c || b.notifyScrollEvent(b.win[0])
                })
            } else this.getScrollTop = function() {
                    return b.docscroll.scrollTop()
                },
                this.setScrollTop = function(d) {
                    return b.docscroll.scrollTop(d)
                }, this.getScrollLeft = function() {
                    return b.docscroll.scrollLeft()
                }, this.setScrollLeft = function(d) {
                    return b.docscroll.scrollLeft(d)
                };
            this.getTarget = function(b) {
                return !b ? !1 : b.target ? b.target : b.srcElement ? b.srcElement : !1
            };
            this.hasParent = function(b, c) {
                if (!b) return !1;
                for (var g = b.target || b.srcElement || b || !1; g && g.id != c;) g = g.parentNode || !1;
                return !1 !== g
            };
            var u = {
                thin: 1,
                medium: 3,
                thick: 5
            };
            this.getOffset = function() {
                if (b.isfixed) return {
                    top: parseFloat(b.win.css("top")),
                    left: parseFloat(b.win.css("left"))
                };
                if (!b.viewport) return b.win.offset();
                var d = b.win.offset(),
                    c = b.viewport.offset();
                return {
                    top: d.top - c.top + b.viewport.scrollTop(),
                    left: d.left - c.left + b.viewport.scrollLeft()
                }
            };
            this.updateScrollBar = function(d) {
                if (b.ishwscroll) b.rail.css({
                    height: b.win.innerHeight()
                }), b.railh && b.railh.css({
                    width: b.win.innerWidth()
                });
                else {
                    var c = b.getOffset(),
                        g = c.top,
                        f = c.left,
                        g = g + l(b.win, "border-top-width", !0);
                    b.win.outerWidth();
                    b.win.innerWidth();
                    var f = f + (b.rail.align ? b.win.outerWidth() -
                            l(b.win, "border-right-width") - b.rail.width : l(b.win, "border-left-width")),
                        e = b.opt.railoffset;
                    e && (e.top && (g += e.top), b.rail.align && e.left && (f += e.left));
                    b.locked || b.rail.css({
                        top: g,
                        left: f,
                        height: d ? d.h : b.win.innerHeight()
                    });
                    b.zoom && b.zoom.css({
                        top: g + 1,
                        left: 1 == b.rail.align ? f - 20 : f + b.rail.width + 4
                    });
                    b.railh && !b.locked && (g = c.top, f = c.left, d = b.railh.align ? g + l(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : g + l(b.win, "border-top-width", !0), f += l(b.win, "border-left-width"), b.railh.css({
                        top: d,
                        left: f,
                        width: b.railh.width
                    }))
                }
            };
            this.doRailClick = function(d, c, g) {
                var f;
                b.locked || (b.cancelEvent(d), c ? (c = g ? b.doScrollLeft : b.doScrollTop, f = g ? (d.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (d.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, c(f)) : (c = g ? b.doScrollLeftBy : b.doScrollBy, f = g ? b.scroll.x : b.scroll.y, d = g ? d.pageX - b.railh.offset().left : d.pageY - b.rail.offset().top, g = g ? b.view.w : b.view.h, f >= d ? c(g) : c(-g)))
            };
            b.hasanimationframe = v;
            b.hascancelanimationframe = w;
            b.hasanimationframe ? b.hascancelanimationframe ||
                (w = function() {
                    b.cancelAnimationFrame = !0
                }) : (v = function(b) {
                    return setTimeout(b, 15 - Math.floor(+new Date / 1E3) % 16)
                }, w = clearInterval);
            this.init = function() {
                b.saved.css = [];
                if (f.isie7mobile) return !0;
                f.hasmstouch && b.css(b.ispage ? e("html") : b.win, {
                    "-ms-touch-action": "none"
                });
                b.zindex = "auto";
                b.zindex = !b.ispage && "auto" == b.opt.zindex ? h() || "auto" : b.opt.zindex;
                !b.ispage && "auto" != b.zindex && b.zindex > x && (x = b.zindex);
                b.isie && (0 == b.zindex && "auto" == b.opt.zindex) && (b.zindex = "auto");
                if (!b.ispage || !f.cantouch && !f.isieold &&
                    !f.isie9mobile) {
                    var d = b.docscroll;
                    b.ispage && (d = b.haswrapper ? b.win : b.doc);
                    f.isie9mobile || b.css(d, {
                        "overflow-y": "hidden"
                    });
                    b.ispage && f.isie7 && ("BODY" == b.doc[0].nodeName ? b.css(e("html"), {
                        "overflow-y": "hidden"
                    }) : "HTML" == b.doc[0].nodeName && b.css(e("body"), {
                        "overflow-y": "hidden"
                    }));
                    f.isios && (!b.ispage && !b.haswrapper) && b.css(e("body"), {
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var c = e(document.createElement("div"));
                    c.css({
                        position: "relative",
                        top: 0,
                        "float": "right",
                        width: b.opt.cursorwidth,
                        height: "0px",
                        "background-color": b.opt.cursorcolor,
                        border: b.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": b.opt.cursorborderradius,
                        "-moz-border-radius": b.opt.cursorborderradius,
                        "border-radius": b.opt.cursorborderradius
                    });
                    c.hborder = parseFloat(c.outerHeight() - c.innerHeight());
                    b.cursor = c;
                    var g = e(document.createElement("div"));
                    g.attr("id", b.id);
                    g.addClass("nicescroll-rails");
                    var l, k, n = ["left", "right"],
                        G;
                    for (G in n) k = n[G], (l = b.opt.railpadding[k]) ? g.css("padding-" + k, l + "px") : b.opt.railpadding[k] = 0;
                    g.append(c);
                    g.width = Math.max(parseFloat(b.opt.cursorwidth),
                        c.outerWidth()) + b.opt.railpadding.left + b.opt.railpadding.right;
                    g.css({
                        width: g.width + "px",
                        zIndex: b.zindex,
                        background: b.opt.background,
                        cursor: "default"
                    });
                    g.visibility = !0;
                    g.scrollable = !0;
                    g.align = "left" == b.opt.railalign ? 0 : 1;
                    b.rail = g;
                    c = b.rail.drag = !1;
                    b.opt.boxzoom && (!b.ispage && !f.isieold) && (c = document.createElement("div"), b.bind(c, "click", b.doZoom), b.zoom = e(c), b.zoom.css({
                            cursor: "pointer",
                            "z-index": b.zindex,
                            backgroundImage: "url(" + L + "zoomico.png)",
                            height: 18,
                            width: 18,
                            backgroundPosition: "0px 0px"
                        }), b.opt.dblclickzoom &&
                        b.bind(b.win, "dblclick", b.doZoom), f.cantouch && b.opt.gesturezoom && (b.ongesturezoom = function(d) {
                            1.5 < d.scale && b.doZoomIn(d);
                            0.8 > d.scale && b.doZoomOut(d);
                            return b.cancelEvent(d)
                        }, b.bind(b.win, "gestureend", b.ongesturezoom)));
                    b.railh = !1;
                    if (b.opt.horizrailenabled) {
                        b.css(d, {
                            "overflow-x": "hidden"
                        });
                        c = e(document.createElement("div"));
                        c.css({
                            position: "relative",
                            top: 0,
                            height: b.opt.cursorwidth,
                            width: "0px",
                            "background-color": b.opt.cursorcolor,
                            border: b.opt.cursorborder,
                            "background-clip": "padding-box",
                            "-webkit-border-radius": b.opt.cursorborderradius,
                            "-moz-border-radius": b.opt.cursorborderradius,
                            "border-radius": b.opt.cursorborderradius
                        });
                        c.wborder = parseFloat(c.outerWidth() - c.innerWidth());
                        b.cursorh = c;
                        var m = e(document.createElement("div"));
                        m.attr("id", b.id + "-hr");
                        m.addClass("nicescroll-rails");
                        m.height = Math.max(parseFloat(b.opt.cursorwidth), c.outerHeight());
                        m.css({
                            height: m.height + "px",
                            zIndex: b.zindex,
                            background: b.opt.background
                        });
                        m.append(c);
                        m.visibility = !0;
                        m.scrollable = !0;
                        m.align = "top" == b.opt.railvalign ? 0 : 1;
                        b.railh = m;
                        b.railh.drag = !1
                    }
                    b.ispage ?
                        (g.css({
                            position: "fixed",
                            top: "0px",
                            height: "100%"
                        }), g.align ? g.css({
                            right: "0px"
                        }) : g.css({
                            left: "0px"
                        }), b.body.append(g), b.railh && (m.css({
                            position: "fixed",
                            left: "0px",
                            width: "100%"
                        }), m.align ? m.css({
                            bottom: "0px"
                        }) : m.css({
                            top: "0px"
                        }), b.body.append(m))) : (b.ishwscroll ? ("static" == b.win.css("position") && b.css(b.win, {
                                position: "relative"
                            }), d = "HTML" == b.win[0].nodeName ? b.body : b.win, b.zoom && (b.zoom.css({
                                position: "absolute",
                                top: 1,
                                right: 0,
                                "margin-right": g.width + 4
                            }), d.append(b.zoom)), g.css({
                                position: "absolute",
                                top: 0
                            }),
                            g.align ? g.css({
                                right: 0
                            }) : g.css({
                                left: 0
                            }), d.append(g), m && (m.css({
                                position: "absolute",
                                left: 0,
                                bottom: 0
                            }), m.align ? m.css({
                                bottom: 0
                            }) : m.css({
                                top: 0
                            }), d.append(m))) : (b.isfixed = "fixed" == b.win.css("position"), d = b.isfixed ? "fixed" : "absolute", b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, !1 == /relative|absolute/.test(b.viewport.css("position")) && b.css(b.viewport, {
                                position: "relative"
                            })), g.css({
                                position: d
                            }), b.zoom && b.zoom.css({
                                position: d
                            }), b.updateScrollBar(), b.body.append(g), b.zoom &&
                            b.body.append(b.zoom), b.railh && (m.css({
                                position: d
                            }), b.body.append(m))), f.isios && b.css(b.win, {
                            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                            "-webkit-touch-callout": "none"
                        }), f.isie && b.opt.disableoutline && b.win.attr("hideFocus", "true"), f.iswebkit && b.opt.disableoutline && b.win.css({
                            outline: "none"
                        }));
                    !1 === b.opt.autohidemode ? (b.autohidedom = !1, b.rail.css({
                        opacity: b.opt.cursoropacitymax
                    }), b.railh && b.railh.css({
                        opacity: b.opt.cursoropacitymax
                    })) : !0 === b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), f.isie8 &&
                        (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), b.railh && f.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == b.opt.autohidemode ? (b.autohidedom = e().add(b.cursor), b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == b.opt.autohidemode && (b.autohidedom = !1, b.hide(), b.locked = !1);
                    if (f.isie9mobile) b.scrollmom = new H(b), b.onmangotouch =
                        function(d) {
                            d = b.getScrollTop();
                            var c = b.getScrollLeft();
                            if (d == b.scrollmom.lastscrolly && c == b.scrollmom.lastscrollx) return !0;
                            var g = d - b.mangotouch.sy,
                                f = c - b.mangotouch.sx;
                            if (0 != Math.round(Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2)))) {
                                var p = 0 > g ? -1 : 1,
                                    e = 0 > f ? -1 : 1,
                                    h = +new Date;
                                b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy);
                                80 < h - b.mangotouch.tm || b.mangotouch.dry != p || b.mangotouch.drx != e ? (b.scrollmom.stop(), b.scrollmom.reset(c, d), b.mangotouch.sy = d, b.mangotouch.ly = d, b.mangotouch.sx = c, b.mangotouch.lx = c, b.mangotouch.dry =
                                    p, b.mangotouch.drx = e, b.mangotouch.tm = h) : (b.scrollmom.stop(), b.scrollmom.update(b.mangotouch.sx - f, b.mangotouch.sy - g), b.mangotouch.tm = h, g = Math.max(Math.abs(b.mangotouch.ly - d), Math.abs(b.mangotouch.lx - c)), b.mangotouch.ly = d, b.mangotouch.lx = c, 2 < g && (b.mangotouch.lazy = setTimeout(function() {
                                    b.mangotouch.lazy = !1;
                                    b.mangotouch.dry = 0;
                                    b.mangotouch.drx = 0;
                                    b.mangotouch.tm = 0;
                                    b.scrollmom.doMomentum(30)
                                }, 100)))
                            }
                        }, g = b.getScrollTop(), m = b.getScrollLeft(), b.mangotouch = {
                            sy: g,
                            ly: g,
                            dry: 0,
                            sx: m,
                            lx: m,
                            drx: 0,
                            lazy: !1,
                            tm: 0
                        }, b.bind(b.docscroll,
                            "scroll", b.onmangotouch);
                    else {
                        if (f.cantouch || b.istouchcapable || b.opt.touchbehavior || f.hasmstouch) {
                            b.scrollmom = new H(b);
                            b.ontouchstart = function(d) {
                                if (d.pointerType && 2 != d.pointerType) return !1;
                                if (!b.locked) {
                                    if (f.hasmstouch)
                                        for (var c = d.target ? d.target : !1; c;) {
                                            var g = e(c).getNiceScroll();
                                            if (0 < g.length && g[0].me == b.me) break;
                                            if (0 < g.length) return !1;
                                            if ("DIV" == c.nodeName && c.id == b.id) break;
                                            c = c.parentNode ? c.parentNode : !1
                                        }
                                    b.cancelScroll();
                                    if ((c = b.getTarget(d)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return b.stopPropagation(d);
                                    !("clientX" in d) && "changedTouches" in d && (d.clientX = d.changedTouches[0].clientX, d.clientY = d.changedTouches[0].clientY);
                                    b.forcescreen && (g = d, d = {
                                        original: d.original ? d.original : d
                                    }, d.clientX = g.screenX, d.clientY = g.screenY);
                                    b.rail.drag = {
                                        x: d.clientX,
                                        y: d.clientY,
                                        sx: b.scroll.x,
                                        sy: b.scroll.y,
                                        st: b.getScrollTop(),
                                        sl: b.getScrollLeft(),
                                        pt: 2,
                                        dl: !1
                                    };
                                    if (b.ispage || !b.opt.directionlockdeadzone) b.rail.drag.dl = "f";
                                    else {
                                        var g = e(window).width(),
                                            p = e(window).height(),
                                            h = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                                            l = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                                            p = Math.max(0, l - p),
                                            g = Math.max(0, h - g);
                                        b.rail.drag.ck = !b.rail.scrollable && b.railh.scrollable ? 0 < p ? "v" : !1 : b.rail.scrollable && !b.railh.scrollable ? 0 < g ? "h" : !1 : !1;
                                        b.rail.drag.ck || (b.rail.drag.dl = "f")
                                    }
                                    b.opt.touchbehavior && (b.isiframe && f.isie) && (g = b.win.position(), b.rail.drag.x += g.left, b.rail.drag.y += g.top);
                                    b.hasmoving = !1;
                                    b.lastmouseup = !1;
                                    b.scrollmom.reset(d.clientX, d.clientY);
                                    if (!f.cantouch && !this.istouchcapable && !f.hasmstouch) {
                                        if (!c ||
                                            !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !b.ispage && f.hasmousecapture && c.setCapture(), b.cancelEvent(d);
                                        /SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type")) && (pc = {
                                            tg: c,
                                            click: !1
                                        }, b.preventclick = pc)
                                    }
                                }
                            };
                            b.ontouchend = function(d) {
                                if (d.pointerType && 2 != d.pointerType) return !1;
                                if (b.rail.drag && 2 == b.rail.drag.pt && (b.scrollmom.doMomentum(), b.rail.drag = !1, b.hasmoving && (b.hasmoving = !1, b.lastmouseup = !0, b.hideCursor(), f.hasmousecapture && document.releaseCapture(), !f.cantouch))) return b.cancelEvent(d)
                            };
                            var q = b.opt.touchbehavior &&
                                b.isiframe && !f.hasmousecapture;
                            b.ontouchmove = function(d, c) {
                                if (d.pointerType && 2 != d.pointerType) return !1;
                                if (b.rail.drag && 2 == b.rail.drag.pt) {
                                    if (f.cantouch && "undefined" == typeof d.original) return !0;
                                    b.hasmoving = !0;
                                    b.preventclick && !b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick || !1, b.preventclick.tg.onclick = b.onpreventclick);
                                    d = e.extend({
                                        original: d
                                    }, d);
                                    "changedTouches" in d && (d.clientX = d.changedTouches[0].clientX, d.clientY = d.changedTouches[0].clientY);
                                    if (b.forcescreen) {
                                        var g = d;
                                        d = {
                                            original: d.original ?
                                                d.original : d
                                        };
                                        d.clientX = g.screenX;
                                        d.clientY = g.screenY
                                    }
                                    g = ofy = 0;
                                    if (q && !c) {
                                        var p = b.win.position(),
                                            g = -p.left;
                                        ofy = -p.top
                                    }
                                    var h = d.clientY + ofy,
                                        p = h - b.rail.drag.y,
                                        l = d.clientX + g,
                                        k = l - b.rail.drag.x,
                                        s = b.rail.drag.st - p;
                                    b.ishwscroll && b.opt.bouncescroll ? 0 > s ? s = Math.round(s / 2) : s > b.page.maxh && (s = b.page.maxh + Math.round((s - b.page.maxh) / 2)) : (0 > s && (h = s = 0), s > b.page.maxh && (s = b.page.maxh, h = 0));
                                    if (b.railh && b.railh.scrollable) {
                                        var m = b.rail.drag.sl - k;
                                        b.ishwscroll && b.opt.bouncescroll ? 0 > m ? m = Math.round(m / 2) : m > b.page.maxw && (m = b.page.maxw +
                                            Math.round((m - b.page.maxw) / 2)) : (0 > m && (l = m = 0), m > b.page.maxw && (m = b.page.maxw, l = 0))
                                    }
                                    g = !1;
                                    if (b.rail.drag.dl) g = !0, "v" == b.rail.drag.dl ? m = b.rail.drag.sl : "h" == b.rail.drag.dl && (s = b.rail.drag.st);
                                    else {
                                        var p = Math.abs(p),
                                            k = Math.abs(k),
                                            n = b.opt.directionlockdeadzone;
                                        if ("v" == b.rail.drag.ck) {
                                            if (p > n && k <= 0.3 * p) return b.rail.drag = !1, !0;
                                            k > n && (b.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()))
                                        } else if ("h" == b.rail.drag.ck) {
                                            if (k > n && p <= 0.3 * az) return b.rail.drag = !1, !0;
                                            p > n && (b.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()))
                                        }
                                    }
                                    b.synched("touchmove",
                                        function() {
                                            b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.prepareTransition(0), b.rail.scrollable && b.setScrollTop(s), b.scrollmom.update(l, h), b.railh && b.railh.scrollable ? (b.setScrollLeft(m), b.showCursor(s, m)) : b.showCursor(s), f.isie10 && document.selection.clear())
                                        });
                                    f.ischrome && b.istouchcapable && (g = !1);
                                    if (g) return b.cancelEvent(d)
                                }
                            }
                        }
                        b.onmousedown = function(d, c) {
                            if (!(b.rail.drag && 1 != b.rail.drag.pt)) {
                                if (b.locked) return b.cancelEvent(d);
                                b.cancelScroll();
                                b.rail.drag = {
                                    x: d.clientX,
                                    y: d.clientY,
                                    sx: b.scroll.x,
                                    sy: b.scroll.y,
                                    pt: 1,
                                    hr: !!c
                                };
                                var g = b.getTarget(d);
                                !b.ispage && f.hasmousecapture && g.setCapture();
                                b.isiframe && !f.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, {
                                    "pointer-events": "none"
                                }));
                                return b.cancelEvent(d)
                            }
                        };
                        b.onmouseup = function(d) {
                            if (b.rail.drag && (f.hasmousecapture && document.releaseCapture(), b.isiframe && !f.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), 1 == b.rail.drag.pt)) return b.rail.drag = !1, b.cancelEvent(d)
                        };
                        b.onmousemove = function(d) {
                            if (b.rail.drag &&
                                1 == b.rail.drag.pt) {
                                if (f.ischrome && 0 == d.which) return b.onmouseup(d);
                                b.cursorfreezed = !0;
                                if (b.rail.drag.hr) {
                                    b.scroll.x = b.rail.drag.sx + (d.clientX - b.rail.drag.x);
                                    0 > b.scroll.x && (b.scroll.x = 0);
                                    var c = b.scrollvaluemaxw;
                                    b.scroll.x > c && (b.scroll.x = c)
                                } else b.scroll.y = b.rail.drag.sy + (d.clientY - b.rail.drag.y), 0 > b.scroll.y && (b.scroll.y = 0), c = b.scrollvaluemax, b.scroll.y > c && (b.scroll.y = c);
                                b.synched("mousemove", function() {
                                    b.rail.drag && 1 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.doScrollLeft(Math.round(b.scroll.x *
                                        b.scrollratio.x), b.opt.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), b.opt.cursordragspeed))
                                });
                                return b.cancelEvent(d)
                            }
                        };
                        if (f.cantouch || b.opt.touchbehavior) b.onpreventclick = function(d) {
                            if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = !1, b.cancelEvent(d)
                        }, b.bind(b.win, "mousedown", b.ontouchstart), b.onclick = f.isios ? !1 : function(d) {
                            return b.lastmouseup ? (b.lastmouseup = !1, b.cancelEvent(d)) : !0
                        }, b.opt.grabcursorenabled && f.cursorgrabvalue && (b.css(b.ispage ?
                            b.doc : b.win, {
                                cursor: f.cursorgrabvalue
                            }), b.css(b.rail, {
                            cursor: f.cursorgrabvalue
                        }));
                        else {
                            var r = function(d) {
                                if (b.selectiondrag) {
                                    if (d) {
                                        var c = b.win.outerHeight();
                                        d = d.pageY - b.selectiondrag.top;
                                        0 < d && d < c && (d = 0);
                                        d >= c && (d -= c);
                                        b.selectiondrag.df = d
                                    }
                                    0 != b.selectiondrag.df && (b.doScrollBy(2 * -Math.floor(b.selectiondrag.df / 6)), b.debounced("doselectionscroll", function() {
                                        r()
                                    }, 50))
                                }
                            };
                            b.hasTextSelected = "getSelection" in document ? function() {
                                return 0 < document.getSelection().rangeCount
                            } : "selection" in document ? function() {
                                return "None" !=
                                    document.selection.type
                            } : function() {
                                return !1
                            };
                            b.onselectionstart = function(d) {
                                b.ispage || (b.selectiondrag = b.win.offset())
                            };
                            b.onselectionend = function(d) {
                                b.selectiondrag = !1
                            };
                            b.onselectiondrag = function(d) {
                                b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function() {
                                    r(d)
                                }, 250)
                            }
                        }
                        f.hasmstouch && (b.css(b.rail, {
                            "-ms-touch-action": "none"
                        }), b.css(b.cursor, {
                            "-ms-touch-action": "none"
                        }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(document, "MSPointerUp", b.ontouchend), b.bind(document, "MSPointerMove",
                            b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(b) {
                            b.preventDefault()
                        }), b.bind(b.cursor, "contextmenu", function(b) {
                            b.preventDefault()
                        }));
                        this.istouchcapable && (b.bind(b.win, "touchstart", b.ontouchstart), b.bind(document, "touchend", b.ontouchend), b.bind(document, "touchcancel", b.ontouchend), b.bind(document, "touchmove", b.ontouchmove));
                        b.bind(b.cursor, "mousedown", b.onmousedown);
                        b.bind(b.cursor, "mouseup", b.onmouseup);
                        b.railh && (b.bind(b.cursorh, "mousedown", function(d) {
                            b.onmousedown(d, !0)
                        }), b.bind(b.cursorh,
                            "mouseup",
                            function(d) {
                                if (!(b.rail.drag && 2 == b.rail.drag.pt)) return b.rail.drag = !1, b.hasmoving = !1, b.hideCursor(), f.hasmousecapture && document.releaseCapture(), b.cancelEvent(d)
                            }));
                        if (b.opt.cursordragontouch || !f.cantouch && !b.opt.touchbehavior) b.rail.css({
                                cursor: "default"
                            }), b.railh && b.railh.css({
                                cursor: "default"
                            }), b.jqbind(b.rail, "mouseenter", function() {
                                b.canshowonmouseevent && b.showCursor();
                                b.rail.active = !0
                            }), b.jqbind(b.rail, "mouseleave", function() {
                                b.rail.active = !1;
                                b.rail.drag || b.hideCursor()
                            }), b.opt.sensitiverail &&
                            (b.bind(b.rail, "click", function(d) {
                                b.doRailClick(d, !1, !1)
                            }), b.bind(b.rail, "dblclick", function(d) {
                                b.doRailClick(d, !0, !1)
                            }), b.bind(b.cursor, "click", function(d) {
                                b.cancelEvent(d)
                            }), b.bind(b.cursor, "dblclick", function(d) {
                                b.cancelEvent(d)
                            })), b.railh && (b.jqbind(b.railh, "mouseenter", function() {
                                b.canshowonmouseevent && b.showCursor();
                                b.rail.active = !0
                            }), b.jqbind(b.railh, "mouseleave", function() {
                                b.rail.active = !1;
                                b.rail.drag || b.hideCursor()
                            }), b.opt.sensitiverail && (b.bind(b.railh, "click", function(d) {
                                b.doRailClick(d, !1, !0)
                            }), b.bind(b.railh, "dblclick", function(d) {
                                b.doRailClick(d, !0, !0)
                            }), b.bind(b.cursorh, "click", function(d) {
                                b.cancelEvent(d)
                            }), b.bind(b.cursorh, "dblclick", function(d) {
                                b.cancelEvent(d)
                            })));
                        !f.cantouch && !b.opt.touchbehavior ? (b.bind(f.hasmousecapture ? b.win : document, "mouseup", b.onmouseup), b.bind(document, "mousemove", b.onmousemove), b.onclick && b.bind(document, "click", b.onclick), !b.ispage && b.opt.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), b.bind(document, "mouseup", b.onselectionend),
                            b.bind(b.cursor, "mouseup", b.onselectionend), b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(document, "mousemove", b.onselectiondrag)), b.zoom && (b.jqbind(b.zoom, "mouseenter", function() {
                            b.canshowonmouseevent && b.showCursor();
                            b.rail.active = !0
                        }), b.jqbind(b.zoom, "mouseleave", function() {
                            b.rail.active = !1;
                            b.rail.drag || b.hideCursor()
                        }))) : (b.bind(f.hasmousecapture ? b.win : document, "mouseup", b.ontouchend), b.bind(document, "mousemove", b.ontouchmove), b.onclick && b.bind(document, "click", b.onclick), b.opt.cursordragontouch &&
                            (b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mousemove", b.onmousemove), b.cursorh && b.bind(b.cursorh, "mousedown", b.onmousedown), b.cursorh && b.bind(b.cursorh, "mousemove", b.onmousemove)));
                        b.opt.enablemousewheel && (b.isiframe || b.bind(f.isie && b.ispage ? document : b.docscroll, "mousewheel", b.onmousewheel), b.bind(b.rail, "mousewheel", b.onmousewheel), b.railh && b.bind(b.railh, "mousewheel", b.onmousewheelhr));
                        !b.ispage && (!f.cantouch && !/HTML|BODY/.test(b.win[0].nodeName)) && (b.win.attr("tabindex") || b.win.attr({
                                tabindex: J++
                            }),
                            b.jqbind(b.win, "focus", function(d) {
                                y = b.getTarget(d).id || !0;
                                b.hasfocus = !0;
                                b.canshowonmouseevent && b.noticeCursor()
                            }), b.jqbind(b.win, "blur", function(d) {
                                y = !1;
                                b.hasfocus = !1
                            }), b.jqbind(b.win, "mouseenter", function(d) {
                                D = b.getTarget(d).id || !0;
                                b.hasmousefocus = !0;
                                b.canshowonmouseevent && b.noticeCursor()
                            }), b.jqbind(b.win, "mouseleave", function() {
                                D = !1;
                                b.hasmousefocus = !1
                            }))
                    }
                    b.onkeypress = function(d) {
                        if (b.locked && 0 == b.page.maxh) return !0;
                        d = d ? d : window.e;
                        var c = b.getTarget(d);
                        if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) &&
                            (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp)) return !0;
                        if (b.hasfocus || b.hasmousefocus && !y || b.ispage && !y && !D) {
                            c = d.keyCode;
                            if (b.locked && 27 != c) return b.cancelEvent(d);
                            var g = d.ctrlKey || !1,
                                p = d.shiftKey || !1,
                                f = !1;
                            switch (c) {
                                case 38:
                                case 63233:
                                    b.doScrollBy(72);
                                    f = !0;
                                    break;
                                case 40:
                                case 63235:
                                    b.doScrollBy(-72);
                                    f = !0;
                                    break;
                                case 37:
                                case 63232:
                                    b.railh && (g ? b.doScrollLeft(0) : b.doScrollLeftBy(72), f = !0);
                                    break;
                                case 39:
                                case 63234:
                                    b.railh && (g ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72), f = !0);
                                    break;
                                case 33:
                                case 63276:
                                    b.doScrollBy(b.view.h);
                                    f = !0;
                                    break;
                                case 34:
                                case 63277:
                                    b.doScrollBy(-b.view.h);
                                    f = !0;
                                    break;
                                case 36:
                                case 63273:
                                    b.railh && g ? b.doScrollPos(0, 0) : b.doScrollTo(0);
                                    f = !0;
                                    break;
                                case 35:
                                case 63275:
                                    b.railh && g ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh);
                                    f = !0;
                                    break;
                                case 32:
                                    b.opt.spacebarenabled && (p ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h), f = !0);
                                    break;
                                case 27:
                                    b.zoomactive && (b.doZoom(), f = !0)
                            }
                            if (f) return b.cancelEvent(d)
                        }
                    };
                    b.opt.enablekeyboard && b.bind(document, f.isopera &&
                        !f.isopera12 ? "keypress" : "keydown", b.onkeypress);
                    b.bind(window, "resize", b.lazyResize);
                    b.bind(window, "orientationchange", b.lazyResize);
                    b.bind(window, "load", b.lazyResize);
                    if (f.ischrome && !b.ispage && !b.haswrapper) {
                        var t = b.win.attr("style"),
                            g = parseFloat(b.win.css("width")) + 1;
                        b.win.css("width", g);
                        b.synched("chromefix", function() {
                            b.win.attr("style", t)
                        })
                    }
                    b.onAttributeChange = function(d) {
                        b.lazyResize(250)
                    };
                    !b.ispage && !b.haswrapper && (!1 !== z ? (b.observer = new z(function(d) {
                        d.forEach(b.onAttributeChange)
                    }), b.observer.observe(b.win[0], {
                        childList: !0,
                        characterData: !1,
                        attributes: !0,
                        subtree: !1
                    }), b.observerremover = new z(function(d) {
                        d.forEach(function(d) {
                            if (0 < d.removedNodes.length)
                                for (var c in d.removedNodes)
                                    if (d.removedNodes[c] == b.win[0]) return b.remove()
                        })
                    }), b.observerremover.observe(b.win[0].parentNode, {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (b.bind(b.win, f.isie && !f.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), f.isie9 && b.win[0].attachEvent("onpropertychange", b.onAttributeChange), b.bind(b.win, "DOMNodeRemoved",
                        function(d) {
                            d.target == b.win[0] && b.remove()
                        })));
                    !b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom);
                    b.istextarea && b.bind(b.win, "mouseup", b.lazyResize);
                    b.checkrtlmode = !0;
                    b.lazyResize(30)
                }
                if ("IFRAME" == this.doc[0].nodeName) {
                    var I = function(d) {
                        b.iframexd = !1;
                        try {
                            var c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
                        } catch (g) {
                            b.iframexd = !0, c = !1
                        }
                        if (b.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                        b.forcescreen = !0;
                        b.isiframe &&
                            (b.iframe = {
                                doc: e(c),
                                html: b.doc.contents().find("html")[0],
                                body: b.doc.contents().find("body")[0]
                            }, b.getContentSize = function() {
                                return {
                                    w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
                                    h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight)
                                }
                            }, b.docscroll = e(b.iframe.body));
                        !f.isios && (b.opt.iframeautoresize && !b.isiframe) && (b.win.scrollTop(0), b.doc.height(""), d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight), b.doc.height(d));
                        b.lazyResize(30);
                        f.isie7 &&
                            b.css(e(b.iframe.html), {
                                "overflow-y": "hidden"
                            });
                        b.css(e(b.iframe.body), {
                            "overflow-y": "hidden"
                        });
                        "contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(c, "scroll", b.onscroll);
                        b.opt.enablemousewheel && b.bind(c, "mousewheel", b.onmousewheel);
                        b.opt.enablekeyboard && b.bind(c, f.isopera ? "keypress" : "keydown", b.onkeypress);
                        if (f.cantouch || b.opt.touchbehavior) b.bind(c, "mousedown", b.onmousedown), b.bind(c, "mousemove", function(d) {
                                b.onmousemove(d, !0)
                            }), b.opt.grabcursorenabled && f.cursorgrabvalue &&
                            b.css(e(c.body), {
                                cursor: f.cursorgrabvalue
                            });
                        b.bind(c, "mouseup", b.onmouseup);
                        b.zoom && (b.opt.dblclickzoom && b.bind(c, "dblclick", b.doZoom), b.ongesturezoom && b.bind(c, "gestureend", b.ongesturezoom))
                    };
                    this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                        I.call(b.doc[0], !1)
                    }, 500);
                    b.bind(this.doc, "load", I)
                }
            };
            this.showCursor = function(d, c) {
                b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0);
                if (b.rail) {
                    b.autohidedom && (b.autohidedom.stop().css({
                            opacity: b.opt.cursoropacitymax
                        }),
                        b.cursoractive = !0);
                    if (!b.rail.drag || 1 != b.rail.drag.pt) "undefined" != typeof d && !1 !== d && (b.scroll.y = Math.round(1 * d / b.scrollratio.y)), "undefined" != typeof c && (b.scroll.x = Math.round(1 * c / b.scrollratio.x));
                    b.cursor.css({
                        height: b.cursorheight,
                        top: b.scroll.y
                    });
                    b.cursorh && (!b.rail.align && b.rail.visibility ? b.cursorh.css({
                        width: b.cursorwidth,
                        left: b.scroll.x + b.rail.width
                    }) : b.cursorh.css({
                        width: b.cursorwidth,
                        left: b.scroll.x
                    }), b.cursoractive = !0);
                    b.zoom && b.zoom.stop().css({
                        opacity: b.opt.cursoropacitymax
                    })
                }
            };
            this.hideCursor =
                function(d) {
                    !b.cursortimeout && (b.rail && b.autohidedom) && (b.cursortimeout = setTimeout(function() {
                        if (!b.rail.active || !b.showonmouseevent) b.autohidedom.stop().animate({
                            opacity: b.opt.cursoropacitymin
                        }), b.zoom && b.zoom.stop().animate({
                            opacity: b.opt.cursoropacitymin
                        }), b.cursoractive = !1;
                        b.cursortimeout = 0
                    }, d || b.opt.hidecursordelay))
                };
            this.noticeCursor = function(d, c, g) {
                b.showCursor(c, g);
                b.rail.active || b.hideCursor(d)
            };
            this.getContentSize = b.ispage ? function() {
                return {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
            } : b.haswrapper ? function() {
                return {
                    w: b.doc.outerWidth() + parseInt(b.win.css("paddingLeft")) + parseInt(b.win.css("paddingRight")),
                    h: b.doc.outerHeight() + parseInt(b.win.css("paddingTop")) + parseInt(b.win.css("paddingBottom"))
                }
            } : function() {
                return {
                    w: b.docscroll[0].scrollWidth,
                    h: b.docscroll[0].scrollHeight
                }
            };
            this.onResize = function(d, c) {
                if (!b.win) return !1;
                if (!b.haswrapper && !b.ispage) {
                    if ("none" == b.win.css("display")) return b.visibility &&
                        b.hideRail().hideRailHr(), !1;
                    !b.hidden && !b.visibility && b.showRail().showRailHr()
                }
                var g = b.page.maxh,
                    f = b.page.maxw,
                    e = b.view.w;
                b.view = {
                    w: b.ispage ? b.win.width() : parseInt(b.win[0].clientWidth),
                    h: b.ispage ? b.win.height() : parseInt(b.win[0].clientHeight)
                };
                b.page = c ? c : b.getContentSize();
                b.page.maxh = Math.max(0, b.page.h - b.view.h);
                b.page.maxw = Math.max(0, b.page.w - b.view.w);
                if (b.page.maxh == g && b.page.maxw == f && b.view.w == e) {
                    if (b.ispage) return b;
                    g = b.win.offset();
                    if (b.lastposition && (f = b.lastposition, f.top == g.top && f.left ==
                            g.left)) return b;
                    b.lastposition = g
                }
                0 == b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, b.cursorheight = 0, b.setScrollTop(0), b.rail.scrollable = !1) : b.rail.scrollable = !0;
                0 == b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, b.cursorwidth = 0, b.setScrollLeft(0), b.railh.scrollable = !1) : b.railh.scrollable = !0;
                b.locked = 0 == b.page.maxh && 0 == b.page.maxw;
                if (b.locked) return b.ispage || b.updateScrollBar(b.view), !1;
                !b.hidden && !b.visibility ? b.showRail().showRailHr() :
                    !b.hidden && !b.railh.visibility && b.showRailHr();
                b.istextarea && (b.win.css("resize") && "none" != b.win.css("resize")) && (b.view.h -= 20);
                b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h)));
                b.cursorheight = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorheight);
                b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w * (b.view.w / b.page.w)));
                b.cursorwidth = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorwidth);
                b.scrollvaluemax =
                    b.view.h - b.cursorheight - b.cursor.hborder;
                b.railh && (b.railh.width = 0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w, b.scrollvaluemaxw = b.railh.width - b.cursorwidth - b.cursorh.wborder);
                b.checkrtlmode && b.railh && (b.checkrtlmode = !1, b.opt.rtlmode && 0 == b.scroll.x && b.setScrollLeft(b.page.maxw));
                b.ispage || b.updateScrollBar(b.view);
                b.scrollratio = {
                    x: b.page.maxw / b.scrollvaluemaxw,
                    y: b.page.maxh / b.scrollvaluemax
                };
                b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)),
                    b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)), b.cursoractive && b.noticeCursor());
                b.scroll.y && 0 == b.getScrollTop() && b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y));
                return b
            };
            this.resize = b.onResize;
            this.lazyResize = function(d) {
                d = isNaN(d) ? 30 : d;
                b.delayed("resize", b.resize, d);
                return b
            };
            this._bind = function(d, c, g, f) {
                b.events.push({
                    e: d,
                    n: c,
                    f: g,
                    b: f,
                    q: !1
                });
                d.addEventListener ? d.addEventListener(c, g, f || !1) : d.attachEvent ? d.attachEvent("on" + c, g) : d["on" + c] = g
            };
            this.jqbind = function(d, c, g) {
                b.events.push({
                    e: d,
                    n: c,
                    f: g,
                    q: !0
                });
                e(d).bind(c, g)
            };
            this.bind = function(d, c, g, e) {
                var h = "jquery" in d ? d[0] : d;
                "mousewheel" == c ? "onwheel" in b.win ? b._bind(h, "wheel", g, e || !1) : (d = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", n(h, d, g, e || !1), "DOMMouseScroll" == d && n(h, "MozMousePixelScroll", g, e || !1)) : h.addEventListener ? (f.cantouch && /mouseup|mousedown|mousemove/.test(c) && b._bind(h, "mousedown" == c ? "touchstart" : "mouseup" == c ? "touchend" : "touchmove", function(b) {
                    if (b.touches) {
                        if (2 > b.touches.length) {
                            var d = b.touches.length ?
                                b.touches[0] : b;
                            d.original = b;
                            g.call(this, d)
                        }
                    } else b.changedTouches && (d = b.changedTouches[0], d.original = b, g.call(this, d))
                }, e || !1), b._bind(h, c, g, e || !1), f.cantouch && "mouseup" == c && b._bind(h, "touchcancel", g, e || !1)) : b._bind(h, c, function(d) {
                    if ((d = d || window.event || !1) && d.srcElement) d.target = d.srcElement;
                    "pageY" in d || (d.pageX = d.clientX + document.documentElement.scrollLeft, d.pageY = d.clientY + document.documentElement.scrollTop);
                    return !1 === g.call(h, d) || !1 === e ? b.cancelEvent(d) : !0
                })
            };
            this._unbind = function(b, c, g, f) {
                b.removeEventListener ?
                    b.removeEventListener(c, g, f) : b.detachEvent ? b.detachEvent("on" + c, g) : b["on" + c] = !1
            };
            this.unbindAll = function() {
                for (var d = 0; d < b.events.length; d++) {
                    var c = b.events[d];
                    c.q ? c.e.unbind(c.n, c.f) : b._unbind(c.e, c.n, c.f, c.b)
                }
            };
            this.cancelEvent = function(b) {
                b = b.original ? b.original : b ? b : window.event || !1;
                if (!b) return !1;
                b.preventDefault && b.preventDefault();
                b.stopPropagation && b.stopPropagation();
                b.preventManipulation && b.preventManipulation();
                b.cancelBubble = !0;
                b.cancel = !0;
                return b.returnValue = !1
            };
            this.stopPropagation =
                function(b) {
                    b = b.original ? b.original : b ? b : window.event || !1;
                    if (!b) return !1;
                    if (b.stopPropagation) return b.stopPropagation();
                    b.cancelBubble && (b.cancelBubble = !0);
                    return !1
                };
            this.showRail = function() {
                if (0 != b.page.maxh && (b.ispage || "none" != b.win.css("display"))) b.visibility = !0, b.rail.visibility = !0, b.rail.css("display", "block");
                return b
            };
            this.showRailHr = function() {
                if (!b.railh) return b;
                if (0 != b.page.maxw && (b.ispage || "none" != b.win.css("display"))) b.railh.visibility = !0, b.railh.css("display", "block");
                return b
            };
            this.hideRail =
                function() {
                    b.visibility = !1;
                    b.rail.visibility = !1;
                    b.rail.css("display", "none");
                    return b
                };
            this.hideRailHr = function() {
                if (!b.railh) return b;
                b.railh.visibility = !1;
                b.railh.css("display", "none");
                return b
            };
            this.show = function() {
                b.hidden = !1;
                b.locked = !1;
                return b.showRail().showRailHr()
            };
            this.hide = function() {
                b.hidden = !0;
                b.locked = !0;
                return b.hideRail().hideRailHr()
            };
            this.toggle = function() {
                return b.hidden ? b.show() : b.hide()
            };
            this.remove = function() {
                b.stop();
                b.cursortimeout && clearTimeout(b.cursortimeout);
                b.doZoomOut();
                b.unbindAll();
                !1 !== b.observer && b.observer.disconnect();
                !1 !== b.observerremover && b.observerremover.disconnect();
                b.events = [];
                b.cursor && (b.cursor.remove(), b.cursor = null);
                b.cursorh && (b.cursorh.remove(), b.cursorh = null);
                b.rail && (b.rail.remove(), b.rail = null);
                b.railh && (b.railh.remove(), b.railh = null);
                b.zoom && (b.zoom.remove(), b.zoom = null);
                for (var d = 0; d < b.saved.css.length; d++) {
                    var c = b.saved.css[d];
                    c[0].css(c[1], "undefined" == typeof c[2] ? "" : c[2])
                }
                b.saved = !1;
                b.me.data("__nicescroll", "");
                b.me = null;
                b.doc = null;
                b.docscroll =
                    null;
                b.win = null;
                return b
            };
            this.scrollstart = function(d) {
                this.onscrollstart = d;
                return b
            };
            this.scrollend = function(d) {
                this.onscrollend = d;
                return b
            };
            this.scrollcancel = function(d) {
                this.onscrollcancel = d;
                return b
            };
            this.zoomin = function(d) {
                this.onzoomin = d;
                return b
            };
            this.zoomout = function(d) {
                this.onzoomout = d;
                return b
            };
            this.isScrollable = function(b) {
                b = b.target ? b.target : b;
                if ("OPTION" == b.nodeName) return !0;
                for (; b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName);) {
                    var c = e(b),
                        c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") ||
                        "";
                    if (/scroll|auto/.test(c)) return b.clientHeight != b.scrollHeight;
                    b = b.parentNode ? b.parentNode : !1
                }
                return !1
            };
            this.getViewport = function(b) {
                for (b = b && b.parentNode ? b.parentNode : !1; b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName);) {
                    var c = e(b),
                        g = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                    if (/scroll|auto/.test(g) && b.clientHeight != b.scrollHeight || 0 < c.getNiceScroll().length) return c;
                    b = b.parentNode ? b.parentNode : !1
                }
                return !1
            };
            this.onmousewheel = function(d) {
                if (b.locked) return !0;
                if (b.rail.drag) return b.cancelEvent(d);
                if (!b.rail.scrollable) return b.railh && b.railh.scrollable ? b.onmousewheelhr(d) : !0;
                var c = +new Date,
                    g = !1;
                b.opt.preservenativescrolling && b.checkarea + 600 < c && (b.nativescrollingarea = b.isScrollable(d), g = !0);
                b.checkarea = c;
                if (b.nativescrollingarea) return !0;
                if (d = t(d, !1, g)) b.checkarea = 0;
                return d
            };
            this.onmousewheelhr = function(d) {
                if (b.locked || !b.railh.scrollable) return !0;
                if (b.rail.drag) return b.cancelEvent(d);
                var c = +new Date,
                    g = !1;
                b.opt.preservenativescrolling && b.checkarea + 600 < c && (b.nativescrollingarea = b.isScrollable(d),
                    g = !0);
                b.checkarea = c;
                return b.nativescrollingarea ? !0 : b.locked ? b.cancelEvent(d) : t(d, !0, g)
            };
            this.stop = function() {
                b.cancelScroll();
                b.scrollmon && b.scrollmon.stop();
                b.cursorfreezed = !1;
                b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
                b.noticeCursor();
                return b
            };
            this.getTransitionSpeed = function(c) {
                var f = Math.round(10 * b.opt.scrollspeed);
                c = Math.min(f, Math.round(c / 20 * b.opt.scrollspeed));
                return 20 < c ? c : 0
            };
            b.opt.smoothscroll ? b.ishwscroll && f.hastransition && b.opt.usetransition ? (this.prepareTransition = function(c,
                e) {
                var g = e ? 20 < c ? c : 0 : b.getTransitionSpeed(c),
                    h = g ? f.prefixstyle + "transform " + g + "ms ease-out" : "";
                if (!b.lasttransitionstyle || b.lasttransitionstyle != h) b.lasttransitionstyle = h, b.doc.css(f.transitionstyle, h);
                return g
            }, this.doScrollLeft = function(c, f) {
                var g = b.scrollrunning ? b.newscrolly : b.getScrollTop();
                b.doScrollPos(c, g, f)
            }, this.doScrollTop = function(c, f) {
                var g = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
                b.doScrollPos(g, c, f)
            }, this.doScrollPos = function(c, e, g) {
                var h = b.getScrollTop(),
                    l = b.getScrollLeft();
                (0 >
                    (b.newscrolly - h) * (e - h) || 0 > (b.newscrollx - l) * (c - l)) && b.cancelScroll();
                !1 == b.opt.bouncescroll && (0 > e ? e = 0 : e > b.page.maxh && (e = b.page.maxh), 0 > c ? c = 0 : c > b.page.maxw && (c = b.page.maxw));
                if (b.scrollrunning && c == b.newscrollx && e == b.newscrolly) return !1;
                b.newscrolly = e;
                b.newscrollx = c;
                b.newscrollspeed = g || !1;
                if (b.timer) return !1;
                b.timer = setTimeout(function() {
                    var g = b.getScrollTop(),
                        h = b.getScrollLeft(),
                        l, k;
                    l = c - h;
                    k = e - g;
                    l = Math.round(Math.sqrt(Math.pow(l, 2) + Math.pow(k, 2)));
                    l = b.newscrollspeed && 1 < b.newscrollspeed ? b.newscrollspeed :
                        b.getTransitionSpeed(l);
                    b.newscrollspeed && 1 >= b.newscrollspeed && (l *= b.newscrollspeed);
                    b.prepareTransition(l, !0);
                    b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
                    0 < l && (!b.scrollrunning && b.onscrollstart && b.onscrollstart.call(b, {
                        type: "scrollstart",
                        current: {
                            x: h,
                            y: g
                        },
                        request: {
                            x: c,
                            y: e
                        },
                        end: {
                            x: b.newscrollx,
                            y: b.newscrolly
                        },
                        speed: l
                    }), f.transitionend ? b.scrollendtrapped || (b.scrollendtrapped = !0, b.bind(b.doc, f.transitionend, b.onScrollEnd, !1)) : (b.scrollendtrapped && clearTimeout(b.scrollendtrapped),
                        b.scrollendtrapped = setTimeout(b.onScrollEnd, l)), b.timerscroll = {
                        bz: new BezierClass(g, b.newscrolly, l, 0, 0, 0.58, 1),
                        bh: new BezierClass(h, b.newscrollx, l, 0, 0, 0.58, 1)
                    }, b.cursorfreezed || (b.timerscroll.tm = setInterval(function() {
                        b.showCursor(b.getScrollTop(), b.getScrollLeft())
                    }, 60)));
                    b.synched("doScroll-set", function() {
                        b.timer = 0;
                        b.scrollendtrapped && (b.scrollrunning = !0);
                        b.setScrollTop(b.newscrolly);
                        b.setScrollLeft(b.newscrollx);
                        if (!b.scrollendtrapped) b.onScrollEnd()
                    })
                }, 50)
            }, this.cancelScroll = function() {
                if (!b.scrollendtrapped) return !0;
                var c = b.getScrollTop(),
                    e = b.getScrollLeft();
                b.scrollrunning = !1;
                f.transitionend || clearTimeout(f.transitionend);
                b.scrollendtrapped = !1;
                b._unbind(b.doc, f.transitionend, b.onScrollEnd);
                b.prepareTransition(0);
                b.setScrollTop(c);
                b.railh && b.setScrollLeft(e);
                b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
                b.timerscroll = !1;
                b.cursorfreezed = !1;
                b.showCursor(c, e);
                return b
            }, this.onScrollEnd = function() {
                b.scrollendtrapped && b._unbind(b.doc, f.transitionend, b.onScrollEnd);
                b.scrollendtrapped = !1;
                b.prepareTransition(0);
                b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
                b.timerscroll = !1;
                var c = b.getScrollTop(),
                    e = b.getScrollLeft();
                b.setScrollTop(c);
                b.railh && b.setScrollLeft(e);
                b.noticeCursor(!1, c, e);
                b.cursorfreezed = !1;
                0 > c ? c = 0 : c > b.page.maxh && (c = b.page.maxh);
                0 > e ? e = 0 : e > b.page.maxw && (e = b.page.maxw);
                if (c != b.newscrolly || e != b.newscrollx) return b.doScrollPos(e, c, b.opt.snapbackspeed);
                b.onscrollend && b.scrollrunning && b.onscrollend.call(b, {
                    type: "scrollend",
                    current: {
                        x: e,
                        y: c
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    }
                });
                b.scrollrunning = !1
            }) : (this.doScrollLeft = function(c, f) {
                var g = b.scrollrunning ? b.newscrolly : b.getScrollTop();
                b.doScrollPos(c, g, f)
            }, this.doScrollTop = function(c, f) {
                var g = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
                b.doScrollPos(g, c, f)
            }, this.doScrollPos = function(c, f, g) {
                function e() {
                    if (b.cancelAnimationFrame) return !0;
                    b.scrollrunning = !0;
                    if (r = 1 - r) return b.timer = v(e) || 1;
                    var c = 0,
                        d = sy = b.getScrollTop();
                    if (b.dst.ay) {
                        var d = b.bzscroll ? b.dst.py + b.bzscroll.getNow() * b.dst.ay : b.newscrolly,
                            g = d - sy;
                        if (0 > g && d < b.newscrolly || 0 < g && d > b.newscrolly) d =
                            b.newscrolly;
                        b.setScrollTop(d);
                        d == b.newscrolly && (c = 1)
                    } else c = 1;
                    var f = sx = b.getScrollLeft();
                    if (b.dst.ax) {
                        f = b.bzscroll ? b.dst.px + b.bzscroll.getNow() * b.dst.ax : b.newscrollx;
                        g = f - sx;
                        if (0 > g && f < b.newscrollx || 0 < g && f > b.newscrollx) f = b.newscrollx;
                        b.setScrollLeft(f);
                        f == b.newscrollx && (c += 1)
                    } else c += 1;
                    2 == c ? (b.timer = 0, b.cursorfreezed = !1, b.bzscroll = !1, b.scrollrunning = !1, 0 > d ? d = 0 : d > b.page.maxh && (d = b.page.maxh), 0 > f ? f = 0 : f > b.page.maxw && (f = b.page.maxw), f != b.newscrollx || d != b.newscrolly ? b.doScrollPos(f, d) : b.onscrollend && b.onscrollend.call(b, {
                        type: "scrollend",
                        current: {
                            x: sx,
                            y: sy
                        },
                        end: {
                            x: b.newscrollx,
                            y: b.newscrolly
                        }
                    })) : b.timer = v(e) || 1
                }
                f = "undefined" == typeof f || !1 === f ? b.getScrollTop(!0) : f;
                if (b.timer && b.newscrolly == f && b.newscrollx == c) return !0;
                b.timer && w(b.timer);
                b.timer = 0;
                var h = b.getScrollTop(),
                    l = b.getScrollLeft();
                (0 > (b.newscrolly - h) * (f - h) || 0 > (b.newscrollx - l) * (c - l)) && b.cancelScroll();
                b.newscrolly = f;
                b.newscrollx = c;
                if (!b.bouncescroll || !b.rail.visibility) 0 > b.newscrolly ? b.newscrolly = 0 : b.newscrolly > b.page.maxh && (b.newscrolly = b.page.maxh);
                if (!b.bouncescroll ||
                    !b.railh.visibility) 0 > b.newscrollx ? b.newscrollx = 0 : b.newscrollx > b.page.maxw && (b.newscrollx = b.page.maxw);
                b.dst = {};
                b.dst.x = c - l;
                b.dst.y = f - h;
                b.dst.px = l;
                b.dst.py = h;
                var k = Math.round(Math.sqrt(Math.pow(b.dst.x, 2) + Math.pow(b.dst.y, 2)));
                b.dst.ax = b.dst.x / k;
                b.dst.ay = b.dst.y / k;
                var n = 0,
                    q = k;
                0 == b.dst.x ? (n = h, q = f, b.dst.ay = 1, b.dst.py = 0) : 0 == b.dst.y && (n = l, q = c, b.dst.ax = 1, b.dst.px = 0);
                k = b.getTransitionSpeed(k);
                g && 1 >= g && (k *= g);
                b.bzscroll = 0 < k ? b.bzscroll ? b.bzscroll.update(q, k) : new BezierClass(n, q, k, 0, 1, 0, 1) : !1;
                if (!b.timer) {
                    (h ==
                        b.page.maxh && f >= b.page.maxh || l == b.page.maxw && c >= b.page.maxw) && b.checkContentSize();
                    var r = 1;
                    b.cancelAnimationFrame = !1;
                    b.timer = 1;
                    b.onscrollstart && !b.scrollrunning && b.onscrollstart.call(b, {
                        type: "scrollstart",
                        current: {
                            x: l,
                            y: h
                        },
                        request: {
                            x: c,
                            y: f
                        },
                        end: {
                            x: b.newscrollx,
                            y: b.newscrolly
                        },
                        speed: k
                    });
                    e();
                    (h == b.page.maxh && f >= h || l == b.page.maxw && c >= l) && b.checkContentSize();
                    b.noticeCursor()
                }
            }, this.cancelScroll = function() {
                b.timer && w(b.timer);
                b.timer = 0;
                b.bzscroll = !1;
                b.scrollrunning = !1;
                return b
            }) : (this.doScrollLeft = function(c,
                f) {
                var g = b.getScrollTop();
                b.doScrollPos(c, g, f)
            }, this.doScrollTop = function(c, f) {
                var g = b.getScrollLeft();
                b.doScrollPos(g, c, f)
            }, this.doScrollPos = function(c, f, g) {
                var e = c > b.page.maxw ? b.page.maxw : c;
                0 > e && (e = 0);
                var h = f > b.page.maxh ? b.page.maxh : f;
                0 > h && (h = 0);
                b.synched("scroll", function() {
                    b.setScrollTop(h);
                    b.setScrollLeft(e)
                })
            }, this.cancelScroll = function() {});
            this.doScrollBy = function(c, f) {
                var g = 0,
                    g = f ? Math.floor((b.scroll.y - c) * b.scrollratio.y) : (b.timer ? b.newscrolly : b.getScrollTop(!0)) - c;
                if (b.bouncescroll) {
                    var e =
                        Math.round(b.view.h / 2);
                    g < -e ? g = -e : g > b.page.maxh + e && (g = b.page.maxh + e)
                }
                b.cursorfreezed = !1;
                py = b.getScrollTop(!0);
                if (0 > g && 0 >= py) return b.noticeCursor();
                if (g > b.page.maxh && py >= b.page.maxh) return b.checkContentSize(), b.noticeCursor();
                b.doScrollTop(g)
            };
            this.doScrollLeftBy = function(c, f) {
                var g = 0,
                    g = f ? Math.floor((b.scroll.x - c) * b.scrollratio.x) : (b.timer ? b.newscrollx : b.getScrollLeft(!0)) - c;
                if (b.bouncescroll) {
                    var e = Math.round(b.view.w / 2);
                    g < -e ? g = -e : g > b.page.maxw + e && (g = b.page.maxw + e)
                }
                b.cursorfreezed = !1;
                px = b.getScrollLeft(!0);
                if (0 > g && 0 >= px || g > b.page.maxw && px >= b.page.maxw) return b.noticeCursor();
                b.doScrollLeft(g)
            };
            this.doScrollTo = function(c, f) {
                f && Math.round(c * b.scrollratio.y);
                b.cursorfreezed = !1;
                b.doScrollTop(c)
            };
            this.checkContentSize = function() {
                var c = b.getContentSize();
                (c.h != b.page.h || c.w != b.page.w) && b.resize(!1, c)
            };
            b.onscroll = function(c) {
                b.rail.drag || b.cursorfreezed || b.synched("scroll", function() {
                    b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
                    b.railh && (b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)));
                    b.noticeCursor()
                })
            };
            b.bind(b.docscroll, "scroll", b.onscroll);
            this.doZoomIn = function(c) {
                if (!b.zoomactive) {
                    b.zoomactive = !0;
                    b.zoomrestore = {
                        style: {}
                    };
                    var h = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                        g = b.win[0].style,
                        l;
                    for (l in h) {
                        var k = h[l];
                        b.zoomrestore.style[k] = "undefined" != typeof g[k] ? g[k] : ""
                    }
                    b.zoomrestore.style.width = b.win.css("width");
                    b.zoomrestore.style.height = b.win.css("height");
                    b.zoomrestore.padding = {
                        w: b.win.outerWidth() - b.win.width(),
                        h: b.win.outerHeight() -
                            b.win.height()
                    };
                    f.isios4 && (b.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0));
                    b.win.css({
                        position: f.isios4 ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        "z-index": x + 100,
                        margin: "0px"
                    });
                    h = b.win.css("backgroundColor");
                    ("" == h || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h)) && b.win.css("backgroundColor", "#fff");
                    b.rail.css({
                        "z-index": x + 101
                    });
                    b.zoom.css({
                        "z-index": x + 102
                    });
                    b.zoom.css("backgroundPosition", "0px -18px");
                    b.resizeZoom();
                    b.onzoomin && b.onzoomin.call(b);
                    return b.cancelEvent(c)
                }
            };
            this.doZoomOut =
                function(c) {
                    if (b.zoomactive) return b.zoomactive = !1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), f.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop), b.rail.css({
                        "z-index": b.zindex
                    }), b.zoom.css({
                        "z-index": b.zindex
                    }), b.zoomrestore = !1, b.zoom.css("backgroundPosition", "0px 0px"), b.onResize(), b.onzoomout && b.onzoomout.call(b), b.cancelEvent(c)
                };
            this.doZoom = function(c) {
                return b.zoomactive ? b.doZoomOut(c) : b.doZoomIn(c)
            };
            this.resizeZoom = function() {
                if (b.zoomactive) {
                    var c = b.getScrollTop();
                    b.win.css({
                        width: e(window).width() -
                            b.zoomrestore.padding.w + "px",
                        height: e(window).height() - b.zoomrestore.padding.h + "px"
                    });
                    b.onResize();
                    b.setScrollTop(Math.min(b.page.maxh, c))
                }
            };
            this.init();
            e.nicescroll.push(this)
        },
        H = function(e) {
            var c = this;
            this.nc = e;
            this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
            this.snapy = this.snapx = !1;
            this.demuly = this.demulx = 0;
            this.lastscrolly = this.lastscrollx = -1;
            this.timer = this.chky = this.chkx = 0;
            this.time = function() {
                return +new Date
            };
            this.reset = function(e, l) {
                c.stop();
                var k = c.time();
                c.steptime =
                    0;
                c.lasttime = k;
                c.speedx = 0;
                c.speedy = 0;
                c.lastx = e;
                c.lasty = l;
                c.lastscrollx = -1;
                c.lastscrolly = -1
            };
            this.update = function(e, l) {
                var k = c.time();
                c.steptime = k - c.lasttime;
                c.lasttime = k;
                var k = l - c.lasty,
                    t = e - c.lastx,
                    b = c.nc.getScrollTop(),
                    q = c.nc.getScrollLeft(),
                    b = b + k,
                    q = q + t;
                c.snapx = 0 > q || q > c.nc.page.maxw;
                c.snapy = 0 > b || b > c.nc.page.maxh;
                c.speedx = t;
                c.speedy = k;
                c.lastx = e;
                c.lasty = l
            };
            this.stop = function() {
                c.nc.unsynched("domomentum2d");
                c.timer && clearTimeout(c.timer);
                c.timer = 0;
                c.lastscrollx = -1;
                c.lastscrolly = -1
            };
            this.doSnapy = function(e,
                l) {
                var k = !1;
                0 > l ? (l = 0, k = !0) : l > c.nc.page.maxh && (l = c.nc.page.maxh, k = !0);
                0 > e ? (e = 0, k = !0) : e > c.nc.page.maxw && (e = c.nc.page.maxw, k = !0);
                k && c.nc.doScrollPos(e, l, c.nc.opt.snapbackspeed)
            };
            this.doMomentum = function(e) {
                var l = c.time(),
                    k = e ? l + e : c.lasttime;
                e = c.nc.getScrollLeft();
                var t = c.nc.getScrollTop(),
                    b = c.nc.page.maxh,
                    q = c.nc.page.maxw;
                c.speedx = 0 < q ? Math.min(60, c.speedx) : 0;
                c.speedy = 0 < b ? Math.min(60, c.speedy) : 0;
                k = k && 50 >= l - k;
                if (0 > t || t > b || 0 > e || e > q) k = !1;
                e = c.speedx && k ? c.speedx : !1;
                if (c.speedy && k && c.speedy || e) {
                    var f = Math.max(16,
                        c.steptime);
                    50 < f && (e = f / 50, c.speedx *= e, c.speedy *= e, f = 50);
                    c.demulxy = 0;
                    c.lastscrollx = c.nc.getScrollLeft();
                    c.chkx = c.lastscrollx;
                    c.lastscrolly = c.nc.getScrollTop();
                    c.chky = c.lastscrolly;
                    var r = c.lastscrollx,
                        u = c.lastscrolly,
                        d = function() {
                            var e = 600 < c.time() - l ? 0.04 : 0.02;
                            if (c.speedx && (r = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = r, 0 > r || r > q)) e = 0.1;
                            if (c.speedy && (u = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = u, 0 > u || u > b)) e = 0.1;
                            c.demulxy = Math.min(1, c.demulxy + e);
                            c.nc.synched("domomentum2d",
                                function() {
                                    c.speedx && (c.nc.getScrollLeft() != c.chkx && c.stop(), c.chkx = r, c.nc.setScrollLeft(r));
                                    c.speedy && (c.nc.getScrollTop() != c.chky && c.stop(), c.chky = u, c.nc.setScrollTop(u));
                                    c.timer || (c.nc.hideCursor(), c.doSnapy(r, u))
                                });
                            1 > c.demulxy ? c.timer = setTimeout(d, f) : (c.stop(), c.nc.hideCursor(), c.doSnapy(r, u))
                        };
                    d()
                } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop())
            }
        },
        A = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(k, c, h) {
            return (c = e.data(k, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : A.call(k)
        },
        set: function(k, c) {
            var h = e.data(k, "__nicescroll") || !1;
            h && h.ishwscroll ? h.setScrollTop(parseInt(c)) : A.call(k, c);
            return this
        }
    };
    e.fn.scrollTop = function(k) {
        if ("undefined" == typeof k) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollTop() : A.call(this)
        }
        return this.each(function() {
            var c = e.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollTop(parseInt(k)) : A.call(e(this), k)
        })
    };
    var B = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function(k, c, h) {
            return (c = e.data(k, "__nicescroll") ||
                !1) && c.ishwscroll ? c.getScrollLeft() : B.call(k)
        },
        set: function(k, c) {
            var h = e.data(k, "__nicescroll") || !1;
            h && h.ishwscroll ? h.setScrollLeft(parseInt(c)) : B.call(k, c);
            return this
        }
    };
    e.fn.scrollLeft = function(k) {
        if ("undefined" == typeof k) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollLeft() : B.call(this)
        }
        return this.each(function() {
            var c = e.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollLeft(parseInt(k)) : B.call(e(this), k)
        })
    };
    var C = function(k) {
        var c = this;
        this.length =
            0;
        this.name = "nicescrollarray";
        this.each = function(e) {
            for (var h = 0; h < c.length; h++) e.call(c[h]);
            return c
        };
        this.push = function(e) {
            c[c.length] = e;
            c.length++
        };
        this.eq = function(e) {
            return c[e]
        };
        if (k)
            for (a = 0; a < k.length; a++) {
                var h = e.data(k[a], "__nicescroll") || !1;
                h && (this[this.length] = h, this.length++)
            }
        return this
    };
    (function(e, c, h) {
        for (var l = 0; l < c.length; l++) h(e, c[l])
    })(C.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(e, c) {
        e[c] = function() {
            var e = arguments;
            return this.each(function() {
                this[c].apply(this,
                    e)
            })
        }
    });
    e.fn.getNiceScroll = function(k) {
        return "undefined" == typeof k ? new C(this) : e.data(this[k], "__nicescroll") || !1
    };
    e.extend(e.expr[":"], {
        nicescroll: function(k) {
            return e.data(k, "__nicescroll") ? !0 : !1
        }
    });
    e.fn.niceScroll = function(k, c) {
        "undefined" == typeof c && ("object" == typeof k && !("jquery" in k)) && (c = k, k = !1);
        var h = new C;
        "undefined" == typeof c && (c = {});
        k && (c.doc = e(k), c.win = e(this));
        var l = !("doc" in c);
        !l && !("win" in c) && (c.win = e(this));
        this.each(function() {
            var k = e(this).data("__nicescroll") || !1;
            k || (c.doc = l ?
                e(this) : c.doc, k = new N(c, e(this)), e(this).data("__nicescroll", k));
            h.push(k)
        });
        return 1 == h.length ? h[0] : h
    };
    window.NiceScroll = {
        getjQuery: function() {
            return e
        }
    };
    e.nicescroll || (e.nicescroll = new C, e.nicescroll.options = F)
})(jQuery);




/* 02)--------------------------------------------------------------
 * jQuery FlexSlider v2.2.2
 * copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function(a) {
    a.flexslider = function(b, c) {
        var d = a(b);
        d.vars = a.extend({}, a.flexslider.defaults, c);
        var j, e = d.vars.namespace,
            f = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            g = ("ontouchstart" in window || f || window.DocumentTouch && document instanceof DocumentTouch) && d.vars.touch,
            h = "click touchend MSPointerUp",
            i = "",
            k = "vertical" === d.vars.direction,
            l = d.vars.reverse,
            m = d.vars.itemWidth > 0,
            n = "fade" === d.vars.animation,
            o = "" !== d.vars.asnavFor,
            p = {},
            q = !0;
        a.data(b, "flexslider", d), p = {
            init: function() {
                d.animating = !1, d.currentSlide = parseInt(d.vars.startAt ? d.vars.startAt : 0, 10), isNaN(d.currentSlide) && (d.currentSlide = 0), d.animatingTo = d.currentSlide, d.atEnd = 0 === d.currentSlide || d.currentSlide === d.last, d.containerSelector = d.vars.selector.substr(0, d.vars.selector.search(" ")), d.slides = a(d.vars.selector, d), d.container = a(d.containerSelector, d), d.count = d.slides.length, d.syncExists = a(d.vars.sync).length > 0, "slide" === d.vars.animation && (d.vars.animation = "swing"), d.prop = k ? "top" : "marginLeft", d.args = {}, d.manualPause = !1, d.stopped = !1, d.started = !1, d.startTimeout = null, d.transitions = !d.vars.video && !n && d.vars.useCSS && function() {
                    var a = document.createElement("div"),
                        b = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var c in b)
                        if (void 0 !== a.style[b[c]]) return d.pfx = b[c].replace("Perspective", "").toLowerCase(), d.prop = "-" + d.pfx + "-transform", !0;
                    return !1
                }(), d.ensureAnimationEnd = "", "" !== d.vars.controlsContainer && (d.controlsContainer = a(d.vars.controlsContainer).length > 0 && a(d.vars.controlsContainer)), "" !== d.vars.manualControls && (d.manualControls = a(d.vars.manualControls).length > 0 && a(d.vars.manualControls)), d.vars.randomize && (d.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), d.container.empty().append(d.slides)), d.doMath(), d.setup("init"), d.vars.controlnav && p.controlnav.setup(), d.vars.directionnav && p.directionnav.setup(), d.vars.keyboard && (1 === a(d.containerSelector).length || d.vars.multipleKeyboard) && a(document).bind("keyup", function(a) {
                    var b = a.keyCode;
                    if (!d.animating && (39 === b || 37 === b)) {
                        var c = 39 === b ? d.getTarget("next") : 37 === b ? d.getTarget("prev") : !1;
                        d.flexAnimate(c, d.vars.pauseOnAction)
                    }
                }), d.vars.mousewheel && d.bind("mousewheel", function(a, b) {
                    a.preventDefault();
                    var f = 0 > b ? d.getTarget("next") : d.getTarget("prev");
                    d.flexAnimate(f, d.vars.pauseOnAction)
                }), d.vars.pausePlay && p.pausePlay.setup(), d.vars.slideshow && d.vars.pauseInvisible && p.pauseInvisible.init(), d.vars.slideshow && (d.vars.pauseOnHover && d.hover(function() {
                    d.manualPlay || d.manualPause || d.pause()
                }, function() {
                    d.manualPause || d.manualPlay || d.stopped || d.play()
                }), d.vars.pauseInvisible && p.pauseInvisible.isHidden() || (d.vars.initDelay > 0 ? d.startTimeout = setTimeout(d.play, d.vars.initDelay) : d.play())), o && p.asnav.setup(), g && d.vars.touch && p.touch(), (!n || n && d.vars.smoothHeight) && a(window).bind("resize orientationchange focus", p.resize), d.find("img").attr("draggable", "false"), setTimeout(function() {
                    d.vars.start(d)
                }, 200)
            },
            asnav: {
                setup: function() {
                    d.asnav = !0, d.animatingTo = Math.floor(d.currentSlide / d.move), d.currentItem = d.currentSlide, d.slides.removeClass(e + "active-slide").eq(d.currentItem).addClass(e + "active-slide"), f ? (b._slider = d, d.slides.each(function() {
                        var b = this;
                        b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", function(a) {
                            a.preventDefault(), a.currentTarget._gesture && a.currentTarget._gesture.addPointer(a.pointerId)
                        }, !1), b.addEventListener("MSGestureTap", function(b) {
                            b.preventDefault();
                            var c = a(this),
                                e = c.index();
                            a(d.vars.asnavFor).data("flexslider").animating || c.hasClass("active") || (d.direction = d.currentItem < e ? "next" : "prev", d.flexAnimate(e, d.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : d.slides.on(h, function(b) {
                        b.preventDefault();
                        var c = a(this),
                            f = c.index(),
                            g = c.offset().left - a(d).scrollLeft();
                        0 >= g && c.hasClass(e + "active-slide") ? d.flexAnimate(d.getTarget("prev"), !0) : a(d.vars.asnavFor).data("flexslider").animating || c.hasClass(e + "active-slide") || (d.direction = d.currentItem < f ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlnav: {
                setup: function() {
                    d.manualControls ? p.controlnav.setupManual() : p.controlnav.setupPaging()
                },
                setupPaging: function() {
                    var f, g, b = "thumbnails" === d.vars.controlnav ? "control-thumbs" : "control-paging",
                        c = 1;
                    if (d.controlnavScaffold = a('<ol class="' + e + "control-nav " + e + b + '"></ol>'), d.pagingCount > 1)
                        for (var j = 0; j < d.pagingCount; j++) {
                            if (g = d.slides.eq(j), f = "thumbnails" === d.vars.controlnav ? '<img src="' + g.attr("data-thumb") + '"/>' : "<a>" + c + "</a>", "thumbnails" === d.vars.controlnav && !0 === d.vars.thumbCaptions) {
                                var k = g.attr("data-thumbcaption");
                                "" != k && void 0 != k && (f += '<span class="' + e + 'caption">' + k + "</span>")
                            }
                            d.controlnavScaffold.append("<li>" + f + "</li>"), c++
                        }
                    d.controlsContainer ? a(d.controlsContainer).append(d.controlnavScaffold) : d.append(d.controlnavScaffold), p.controlnav.set(), p.controlnav.active(), d.controlnavScaffold.delegate("a, img", h, function(b) {
                        if (b.preventDefault(), "" === i || i === b.type) {
                            var c = a(this),
                                f = d.controlnav.index(c);
                            c.hasClass(e + "active") || (d.direction = f > d.currentSlide ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction))
                        }
                        "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    d.controlnav = d.manualControls, p.controlnav.active(), d.controlnav.bind(h, function(b) {
                        if (b.preventDefault(), "" === i || i === b.type) {
                            var c = a(this),
                                f = d.controlnav.index(c);
                            c.hasClass(e + "active") || (d.direction = f > d.currentSlide ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction))
                        }
                        "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var b = "thumbnails" === d.vars.controlnav ? "img" : "a";
                    d.controlnav = a("." + e + "control-nav li " + b, d.controlsContainer ? d.controlsContainer : d)
                },
                active: function() {
                    d.controlnav.removeClass(e + "active").eq(d.animatingTo).addClass(e + "active")
                },
                update: function(b, c) {
                    d.pagingCount > 1 && "add" === b ? d.controlnavScaffold.append(a("<li><a>" + d.count + "</a></li>")) : 1 === d.pagingCount ? d.controlnavScaffold.find("li").remove() : d.controlnav.eq(c).closest("li").remove(), p.controlnav.set(), d.pagingCount > 1 && d.pagingCount !== d.controlnav.length ? d.update(c, b) : p.controlnav.active()
                }
            },
            directionnav: {
                setup: function() {
                    var b = a('<ul class="' + e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + d.vars.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + d.vars.nextText + "</a></li></ul>");
                    d.controlsContainer ? (a(d.controlsContainer).append(b), d.directionnav = a("." + e + "direction-nav li a", d.controlsContainer)) : (d.append(b), d.directionnav = a("." + e + "direction-nav li a", d)), p.directionnav.update(), d.directionnav.bind(h, function(b) {
                        b.preventDefault();
                        var c;
                        ("" === i || i === b.type) && (c = a(this).hasClass(e + "next") ? d.getTarget("next") : d.getTarget("prev"), d.flexAnimate(c, d.vars.pauseOnAction)), "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var a = e + "disabled";
                    1 === d.pagingCount ? d.directionnav.addClass(a).attr("tabindex", "-1") : d.vars.animationLoop ? d.directionnav.removeClass(a).removeAttr("tabindex") : 0 === d.animatingTo ? d.directionnav.removeClass(a).filter("." + e + "prev").addClass(a).attr("tabindex", "-1") : d.animatingTo === d.last ? d.directionnav.removeClass(a).filter("." + e + "next").addClass(a).attr("tabindex", "-1") : d.directionnav.removeClass(a).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var b = a('<div class="' + e + 'pauseplay"><a></a></div>');
                    d.controlsContainer ? (d.controlsContainer.append(b), d.pausePlay = a("." + e + "pauseplay a", d.controlsContainer)) : (d.append(b), d.pausePlay = a("." + e + "pauseplay a", d)), p.pausePlay.update(d.vars.slideshow ? e + "pause" : e + "play"), d.pausePlay.bind(h, function(b) {
                        b.preventDefault(), ("" === i || i === b.type) && (a(this).hasClass(e + "pause") ? (d.manualPause = !0, d.manualPlay = !1, d.pause()) : (d.manualPause = !1, d.manualPlay = !0, d.play())), "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                update: function(a) {
                    "play" === a ? d.pausePlay.removeClass(e + "pause").addClass(e + "play").html(d.vars.playText) : d.pausePlay.removeClass(e + "play").addClass(e + "pause").html(d.vars.pauseText)
                }
            },
            touch: function() {
                function r(f) {
                    d.animating ? f.preventDefault() : (window.navigator.msPointerEnabled || 1 === f.touches.length) && (d.pause(), g = k ? d.h : d.w, i = Number(new Date), o = f.touches[0].pageX, p = f.touches[0].pageY, e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g, a = k ? p : o, c = k ? o : p, b.addEventListener("touchmove", s, !1), b.addEventListener("touchend", t, !1))
                }

                function s(b) {
                    o = b.touches[0].pageX, p = b.touches[0].pageY, h = k ? a - p : a - o, j = k ? Math.abs(h) < Math.abs(o - c) : Math.abs(h) < Math.abs(p - c);
                    var f = 500;
                    (!j || Number(new Date) - i > f) && (b.preventDefault(), !n && d.transitions && (d.vars.animationLoop || (h /= 0 === d.currentSlide && 0 > h || d.currentSlide === d.last && h > 0 ? Math.abs(h) / g + 2 : 1), d.setProps(e + h, "setTouch")))
                }

                function t() {
                    if (b.removeEventListener("touchmove", s, !1), d.animatingTo === d.currentSlide && !j && null !== h) {
                        var k = l ? -h : h,
                            m = k > 0 ? d.getTarget("next") : d.getTarget("prev");
                        d.canAdvance(m) && (Number(new Date) - i < 550 && Math.abs(k) > 50 || Math.abs(k) > g / 2) ? d.flexAnimate(m, d.vars.pauseOnAction) : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0)
                    }
                    b.removeEventListener("touchend", t, !1), a = null, c = null, h = null, e = null
                }

                function u(a) {
                    a.stopPropagation(), d.animating ? a.preventDefault() : (d.pause(), b._gesture.addPointer(a.pointerId), q = 0, g = k ? d.h : d.w, i = Number(new Date), e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g)
                }

                function v(a) {
                    a.stopPropagation();
                    var c = a.target._slider;
                    if (c) {
                        var d = -a.translationX,
                            f = -a.translationY;
                        return q += k ? f : d, h = q, j = k ? Math.abs(q) < Math.abs(-d) : Math.abs(q) < Math.abs(-f), a.detail === a.MSGESTURE_FLAG_INERTIA ? (setImmediate(function() {
                            b._gesture.stop()
                        }), void 0) : ((!j || Number(new Date) - i > 500) && (a.preventDefault(), !n && c.transitions && (c.vars.animationLoop || (h = q / (0 === c.currentSlide && 0 > q || c.currentSlide === c.last && q > 0 ? Math.abs(q) / g + 2 : 1)), c.setProps(e + h, "setTouch"))), void 0)
                    }
                }

                function w(b) {
                    b.stopPropagation();
                    var d = b.target._slider;
                    if (d) {
                        if (d.animatingTo === d.currentSlide && !j && null !== h) {
                            var f = l ? -h : h,
                                k = f > 0 ? d.getTarget("next") : d.getTarget("prev");
                            d.canAdvance(k) && (Number(new Date) - i < 550 && Math.abs(f) > 50 || Math.abs(f) > g / 2) ? d.flexAnimate(k, d.vars.pauseOnAction) : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0)
                        }
                        a = null, c = null, h = null, e = null, q = 0
                    }
                }
                var a, c, e, g, h, i, j = !1,
                    o = 0,
                    p = 0,
                    q = 0;
                f ? (b.style.msTouchAction = "none", b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", u, !1), b._slider = d, b.addEventListener("MSGestureChange", v, !1), b.addEventListener("MSGestureEnd", w, !1)) : b.addEventListener("touchstart", r, !1)
            },
            resize: function() {
                !d.animating && d.is(":visible") && (m || d.doMath(), n ? p.smoothHeight() : m ? (d.slides.width(d.computedW), d.update(d.pagingCount), d.setProps()) : k ? (d.viewport.height(d.h), d.setProps(d.h, "setTotal")) : (d.vars.smoothHeight && p.smoothHeight(), d.newSlides.width(d.computedW), d.setProps(d.computedW, "setTotal")))
            },
            smoothHeight: function(a) {
                if (!k || n) {
                    var b = n ? d : d.viewport;
                    a ? b.animate({
                        height: d.slides.eq(d.animatingTo).height()
                    }, a) : b.height(d.slides.eq(d.animatingTo).height())
                }
            },
            sync: function(b) {
                var c = a(d.vars.sync).data("flexslider"),
                    e = d.animatingTo;
                switch (b) {
                    case "animate":
                        c.flexAnimate(e, d.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        c.playing || c.asnav || c.play();
                        break;
                    case "pause":
                        c.pause()
                }
            },
            uniqueID: function(b) {
                return b.find("[id]").each(function() {
                    var b = a(this);
                    b.attr("id", b.attr("id") + "_clone")
                }), b
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var a = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var b = 0; b < a.length; b++) a[b] + "Hidden" in document && (p.pauseInvisible.visProp = a[b] + "Hidden");
                    if (p.pauseInvisible.visProp) {
                        var c = p.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(c, function() {
                            p.pauseInvisible.isHidden() ? d.startTimeout ? clearTimeout(d.startTimeout) : d.pause() : d.started ? d.play() : d.vars.initDelay > 0 ? setTimeout(d.play, d.vars.initDelay) : d.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[p.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(j), j = setTimeout(function() {
                    i = ""
                }, 3e3)
            }
        }, d.flexAnimate = function(b, c, f, h, i) {
            if (d.vars.animationLoop || b === d.currentSlide || (d.direction = b > d.currentSlide ? "next" : "prev"), o && 1 === d.pagingCount && (d.direction = d.currentItem < b ? "next" : "prev"), !d.animating && (d.canAdvance(b, i) || f) && d.is(":visible")) {
                if (o && h) {
                    var j = a(d.vars.asnavFor).data("flexslider");
                    if (d.atEnd = 0 === b || b === d.count - 1, j.flexAnimate(b, !0, !1, !0, i), d.direction = d.currentItem < b ? "next" : "prev", j.direction = d.direction, Math.ceil((b + 1) / d.visible) - 1 === d.currentSlide || 0 === b) return d.currentItem = b, d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), !1;
                    d.currentItem = b, d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), b = Math.floor(b / d.visible)
                }
                if (d.animating = !0, d.animatingTo = b, c && d.pause(), d.vars.before(d), d.syncExists && !i && p.sync("animate"), d.vars.controlnav && p.controlnav.active(), m || d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), d.atEnd = 0 === b || b === d.last, d.vars.directionnav && p.directionnav.update(), b === d.last && (d.vars.end(d), d.vars.animationLoop || d.pause()), n) g ? (d.slides.eq(d.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), d.slides.eq(b).css({
                    opacity: 1,
                    zIndex: 2
                }), d.wrapup(q)) : (d.slides.eq(d.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, d.vars.animationSpeed, d.vars.easing), d.slides.eq(b).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, d.vars.animationSpeed, d.vars.easing, d.wrapup));
                else {
                    var r, s, t, q = k ? d.slides.filter(":first").height() : d.computedW;
                    m ? (r = d.vars.itemMargin, t = (d.itemW + r) * d.move * d.animatingTo, s = t > d.limit && 1 !== d.visible ? d.limit : t) : s = 0 === d.currentSlide && b === d.count - 1 && d.vars.animationLoop && "next" !== d.direction ? l ? (d.count + d.cloneOffset) * q : 0 : d.currentSlide === d.last && 0 === b && d.vars.animationLoop && "prev" !== d.direction ? l ? 0 : (d.count + 1) * q : l ? (d.count - 1 - b + d.cloneOffset) * q : (b + d.cloneOffset) * q, d.setProps(s, "", d.vars.animationSpeed), d.transitions ? (d.vars.animationLoop && d.atEnd || (d.animating = !1, d.currentSlide = d.animatingTo), d.container.unbind("webkitTransitionEnd transitionend"), d.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(d.ensureAnimationEnd), d.wrapup(q)
                    }), clearTimeout(d.ensureAnimationEnd), d.ensureAnimationEnd = setTimeout(function() {
                        d.wrapup(q)
                    }, d.vars.animationSpeed + 100)) : d.container.animate(d.args, d.vars.animationSpeed, d.vars.easing, function() {
                        d.wrapup(q)
                    })
                }
                d.vars.smoothHeight && p.smoothHeight(d.vars.animationSpeed)
            }
        }, d.wrapup = function(a) {
            n || m || (0 === d.currentSlide && d.animatingTo === d.last && d.vars.animationLoop ? d.setProps(a, "jumpEnd") : d.currentSlide === d.last && 0 === d.animatingTo && d.vars.animationLoop && d.setProps(a, "jumpStart")), d.animating = !1, d.currentSlide = d.animatingTo, d.vars.after(d)
        }, d.animateSlides = function() {
            !d.animating && q && d.flexAnimate(d.getTarget("next"))
        }, d.pause = function() {
            clearInterval(d.animatedSlides), d.animatedSlides = null, d.playing = !1, d.vars.pausePlay && p.pausePlay.update("play"), d.syncExists && p.sync("pause")
        }, d.play = function() {
            d.playing && clearInterval(d.animatedSlides), d.animatedSlides = d.animatedSlides || setInterval(d.animateSlides, d.vars.slideshowSpeed), d.started = d.playing = !0, d.vars.pausePlay && p.pausePlay.update("pause"), d.syncExists && p.sync("play")
        }, d.stop = function() {
            d.pause(), d.stopped = !0
        }, d.canAdvance = function(a, b) {
            var c = o ? d.pagingCount - 1 : d.last;
            return b ? !0 : o && d.currentItem === d.count - 1 && 0 === a && "prev" === d.direction ? !0 : o && 0 === d.currentItem && a === d.pagingCount - 1 && "next" !== d.direction ? !1 : a !== d.currentSlide || o ? d.vars.animationLoop ? !0 : d.atEnd && 0 === d.currentSlide && a === c && "next" !== d.direction ? !1 : d.atEnd && d.currentSlide === c && 0 === a && "next" === d.direction ? !1 : !0 : !1
        }, d.getTarget = function(a) {
            return d.direction = a, "next" === a ? d.currentSlide === d.last ? 0 : d.currentSlide + 1 : 0 === d.currentSlide ? d.last : d.currentSlide - 1
        }, d.setProps = function(a, b, c) {
            var e = function() {
                var c = a ? a : (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo,
                    e = function() {
                        if (m) return "setTouch" === b ? a : l && d.animatingTo === d.last ? 0 : l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : d.animatingTo === d.last ? d.limit : c;
                        switch (b) {
                            case "setTotal":
                                return l ? (d.count - 1 - d.currentSlide + d.cloneOffset) * a : (d.currentSlide + d.cloneOffset) * a;
                            case "setTouch":
                                return l ? a : a;
                            case "jumpEnd":
                                return l ? a : d.count * a;
                            case "jumpStart":
                                return l ? d.count * a : a;
                            default:
                                return a
                        }
                    }();
                return -1 * e + "px"
            }();
            d.transitions && (e = k ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", c = void 0 !== c ? c / 1e3 + "s" : "0s", d.container.css("-" + d.pfx + "-transition-duration", c), d.container.css("transition-duration", c)), d.args[d.prop] = e, (d.transitions || void 0 === c) && d.container.css(d.args), d.container.css("transform", e)
        }, d.setup = function(b) {
            if (n) d.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === b && (g ? d.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + d.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(d.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : d.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(d.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, d.vars.animationSpeed, d.vars.easing)), d.vars.smoothHeight && p.smoothHeight();
            else {
                var c, f;
                "init" === b && (d.viewport = a('<div class="' + e + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(d).append(d.container), d.cloneCount = 0, d.cloneOffset = 0, l && (f = a.makeArray(d.slides).reverse(), d.slides = a(f), d.container.empty().append(d.slides))), d.vars.animationLoop && !m && (d.cloneCount = 2, d.cloneOffset = 1, "init" !== b && d.container.find(".clone").remove(), p.uniqueID(d.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(d.container), p.uniqueID(d.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(d.container)), d.newSlides = a(d.vars.selector, d), c = l ? d.count - 1 - d.currentSlide + d.cloneOffset : d.currentSlide + d.cloneOffset, k && !m ? (d.container.height(200 * (d.count + d.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    d.newSlides.css({
                        display: "block"
                    }), d.doMath(), d.viewport.height(d.h), d.setProps(c * d.h, "init")
                }, "init" === b ? 100 : 0)) : (d.container.width(200 * (d.count + d.cloneCount) + "%"), d.setProps(c * d.computedW, "init"), setTimeout(function() {
                    d.doMath(), d.newSlides.css({
                        width: d.computedW,
                        "float": "left",
                        display: "block"
                    }), d.vars.smoothHeight && p.smoothHeight()
                }, "init" === b ? 100 : 0))
            }
            m || d.slides.removeClass(e + "active-slide").eq(d.currentSlide).addClass(e + "active-slide"), d.vars.init(d)
        }, d.doMath = function() {
            var a = d.slides.first(),
                b = d.vars.itemMargin,
                c = d.vars.minItems,
                e = d.vars.maxItems;
            d.w = void 0 === d.viewport ? d.width() : d.viewport.width(), d.h = a.height(), d.boxPadding = a.outerWidth() - a.width(), m ? (d.itemT = d.vars.itemWidth + b, d.minW = c ? c * d.itemT : d.w, d.maxW = e ? e * d.itemT - b : d.w, d.itemW = d.minW > d.w ? (d.w - b * (c - 1)) / c : d.maxW < d.w ? (d.w - b * (e - 1)) / e : d.vars.itemWidth > d.w ? d.w : d.vars.itemWidth, d.visible = Math.floor(d.w / d.itemW), d.move = d.vars.move > 0 && d.vars.move < d.visible ? d.vars.move : d.visible, d.pagingCount = Math.ceil((d.count - d.visible) / d.move + 1), d.last = d.pagingCount - 1, d.limit = 1 === d.pagingCount ? 0 : d.vars.itemWidth > d.w ? d.itemW * (d.count - 1) + b * (d.count - 1) : (d.itemW + b) * d.count - d.w - b) : (d.itemW = d.w, d.pagingCount = d.count, d.last = d.count - 1), d.computedW = d.itemW - d.boxPadding
        }, d.update = function(a, b) {
            d.doMath(), m || (a < d.currentSlide ? d.currentSlide += 1 : a <= d.currentSlide && 0 !== a && (d.currentSlide -= 1), d.animatingTo = d.currentSlide), d.vars.controlnav && !d.manualControls && ("add" === b && !m || d.pagingCount > d.controlnav.length ? p.controlnav.update("add") : ("remove" === b && !m || d.pagingCount < d.controlnav.length) && (m && d.currentSlide > d.last && (d.currentSlide -= 1, d.animatingTo -= 1), p.controlnav.update("remove", d.last))), d.vars.directionnav && p.directionnav.update()
        }, d.addSlide = function(b, c) {
            var e = a(b);
            d.count += 1, d.last = d.count - 1, k && l ? void 0 !== c ? d.slides.eq(d.count - c).after(e) : d.container.prepend(e) : void 0 !== c ? d.slides.eq(c).before(e) : d.container.append(e), d.update(c, "add"), d.slides = a(d.vars.selector + ":not(.clone)", d), d.setup(), d.vars.added(d)
        }, d.removeSlide = function(b) {
            var c = isNaN(b) ? d.slides.index(a(b)) : b;
            d.count -= 1, d.last = d.count - 1, isNaN(b) ? a(b, d.slides).remove() : k && l ? d.slides.eq(d.last).remove() : d.slides.eq(b).remove(), d.doMath(), d.update(c, "remove"), d.slides = a(d.vars.selector + ":not(.clone)", d), d.setup(), d.vars.removed(d)
        }, p.init()
    }, a(window).blur(function() {
        focused = !1
    }).focus(function() {
        focused = !0
    }), a.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlnav: !0,
        directionnav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asnavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, a.fn.flexslider = function(b) {
        if (void 0 === b && (b = {}), "object" == typeof b) return this.each(function() {
            var c = a(this),
                d = b.selector ? b.selector : ".slides > li",
                e = c.find(d);
            1 === e.length && b.allowOneSlide === !0 || 0 === e.length ? (e.fadeIn(400), b.start && b.start(c)) : void 0 === c.data("flexslider") && new a.flexslider(this, b)
        });
        var c = a(this).data("flexslider");
        switch (b) {
            case "play":
                c.play();
                break;
            case "pause":
                c.pause();
                break;
            case "stop":
                c.stop();
                break;
            case "next":
                c.flexAnimate(c.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                c.flexAnimate(c.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof b && c.flexAnimate(b, !0)
        }
    }
}(jQuery);




/* 04)--------------------------------------------------------------
 * jQuery EasyTabs plugin 3.2.0
 *
 * copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Thu May 09 17:30:00 2013 -0500
 */
(function(a) {
    a.easytabs = function(j, e) {
        var f = this,
            q = a(j),
            i = {
                animate: true,
                panelActiveClass: "active",
                tabActiveClass: "active",
                defaultTab: "li:first-child",
                animationSpeed: "normal",
                tabs: "> ul > li",
                updateHash: true,
                cycle: false,
                collapsible: false,
                collapsedClass: "collapsed",
                collapsedByDefault: true,
                uiTabs: false,
                transitionIn: "fadeIn",
                transitionOut: "fadeOut",
                transitionInEasing: "swing",
                transitionOutEasing: "swing",
                transitionCollapse: "slideUp",
                transitionUncollapse: "slideDown",
                transitionCollapseEasing: "swing",
                transitionUncollapseEasing: "swing",
                containerClass: "",
                tabsClass: "",
                tabClass: "",
                panelClass: "",
                cache: true,
                event: "click",
                panelContext: q
            },
            h, l, v, m, d, t = {
                fast: 200,
                normal: 400,
                slow: 600
            },
            r;
        f.init = function() {
            f.settings = r = a.extend({}, i, e);
            r.bind_str = r.event + ".easytabs";
            if (r.uiTabs) {
                r.tabActiveClass = "ui-tabs-selected";
                r.containerClass = "ui-tabs ui-widget ui-widget-content ui-corner-all";
                r.tabsClass = "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all";
                r.tabClass = "ui-state-default ui-corner-top";
                r.panelClass = "ui-tabs-panel ui-widget-content ui-corner-bottom"
            }
            if (r.collapsible && e.defaultTab !== undefined && e.collpasedByDefault === undefined) {
                r.collapsedByDefault = false
            }
            if (typeof(r.animationSpeed) === "string") {
                r.animationSpeed = t[r.animationSpeed]
            }
            a("a.anchor").remove().prependTo("body");
            q.data("easytabs", {});
            f.setTransitions();
            f.getTabs();
            b();
            g();
            w();
            n();
            c();
            q.attr("data-easytabs", true)
        };
        f.setTransitions = function() {
            v = (r.animate) ? {
                show: r.transitionIn,
                hide: r.transitionOut,
                speed: r.animationSpeed,
                collapse: r.transitionCollapse,
                uncollapse: r.transitionUncollapse,
                halfSpeed: r.animationSpeed / 2
            } : {
                show: "show",
                hide: "hide",
                speed: 0,
                collapse: "hide",
                uncollapse: "show",
                halfSpeed: 0
            }
        };
        f.getTabs = function() {
            var x;
            f.tabs = q.find(r.tabs), f.panels = a(), f.tabs.each(function() {
                var A = a(this),
                    z = A.children("a"),
                    y = A.children("a").data("target");
                A.data("easytabs", {});
                if (y !== undefined && y !== null) {
                    A.data("easytabs").ajax = z.attr("href")
                } else {
                    y = z.attr("href")
                }
                y = y.match(/#([^\?]+)/)[1];
                x = r.panelContext.find("#" + y);
                if (x.length) {
                    x.data("easytabs", {
                        position: x.css("position"),
                        visibility: x.css("visibility")
                    });
                    x.not(r.panelActiveClass).hide();
                    f.panels = f.panels.add(x);
                    A.data("easytabs").panel = x
                } else {
                    f.tabs = f.tabs.not(A);
                    if ("console" in window) {
                        console.warn("Warning: tab without matching panel for selector '#" + y + "' removed from set")
                    }
                }
            })
        };
        f.selectTab = function(x, C) {
            var y = window.location,
                B = y.hash.match(/^[^\?]*/)[0],
                z = x.parent().data("easytabs").panel,
                A = x.parent().data("easytabs").ajax;
            if (r.collapsible && !d && (x.hasClass(r.tabActiveClass) || x.hasClass(r.collapsedClass))) {
                f.toggleTabCollapse(x, z, A, C)
            } else {
                if (!x.hasClass(r.tabActiveClass) || !z.hasClass(r.panelActiveClass)) {
                    o(x, z, A, C)
                } else {
                    if (!r.cache) {
                        o(x, z, A, C)
                    }
                }
            }
        };
        f.toggleTabCollapse = function(x, y, z, A) {
            f.panels.stop(true, true);
            if (u(q, "easytabs:before", [x, y, r])) {
                f.tabs.filter("." + r.tabActiveClass).removeClass(r.tabActiveClass).children().removeClass(r.tabActiveClass);
                if (x.hasClass(r.collapsedClass)) {
                    if (z && (!r.cache || !x.parent().data("easytabs").cached)) {
                        q.trigger("easytabs:ajax:beforeSend", [x, y]);
                        y.load(z, function(C, B, D) {
                            x.parent().data("easytabs").cached = true;
                            q.trigger("easytabs:ajax:complete", [x, y, C, B, D])
                        })
                    }
                    x.parent().removeClass(r.collapsedClass).addClass(r.tabActiveClass).children().removeClass(r.collapsedClass).addClass(r.tabActiveClass);
                    y.addClass(r.panelActiveClass)[v.uncollapse](v.speed, r.transitionUncollapseEasing, function() {
                        q.trigger("easytabs:midTransition", [x, y, r]);
                        if (typeof A == "function") {
                            A()
                        }
                    })
                } else {
                    x.addClass(r.collapsedClass).parent().addClass(r.collapsedClass);
                    y.removeClass(r.panelActiveClass)[v.collapse](v.speed, r.transitionCollapseEasing, function() {
                        q.trigger("easytabs:midTransition", [x, y, r]);
                        if (typeof A == "function") {
                            A()
                        }
                    })
                }
            }
        };
        f.matchTab = function(x) {
            return f.tabs.find("[href='" + x + "'],[data-target='" + x + "']").first()
        };
        f.matchInPanel = function(x) {
            return (x && f.validId(x) ? f.panels.filter(":has(" + x + ")").first() : [])
        };
        f.validId = function(x) {
            return x.substr(1).match(/^[A-Za-z]+[A-Za-z0-9\-_:\.].$/)
        };
        f.selectTabFromHashChange = function() {
            var y = window.location.hash.match(/^[^\?]*/)[0],
                x = f.matchTab(y),
                z;
            if (r.updateHash) {
                if (x.length) {
                    d = true;
                    f.selectTab(x)
                } else {
                    z = f.matchInPanel(y);
                    if (z.length) {
                        y = "#" + z.attr("id");
                        x = f.matchTab(y);
                        d = true;
                        f.selectTab(x)
                    } else {
                        if (!h.hasClass(r.tabActiveClass) && !r.cycle) {
                            if (y === "" || f.matchTab(m).length || q.closest(y).length) {
                                d = true;
                                f.selectTab(l)
                            }
                        }
                    }
                }
            }
        };
        f.cycleTabs = function(x) {
            if (r.cycle) {
                x = x % f.tabs.length;
                $tab = a(f.tabs[x]).children("a").first();
                d = true;
                f.selectTab($tab, function() {
                    setTimeout(function() {
                        f.cycleTabs(x + 1)
                    }, r.cycle)
                })
            }
        };
        f.publicMethods = {
            select: function(x) {
                var y;
                if ((y = f.tabs.filter(x)).length === 0) {
                    if ((y = f.tabs.find("a[href='" + x + "']")).length === 0) {
                        if ((y = f.tabs.find("a" + x)).length === 0) {
                            if ((y = f.tabs.find("[data-target='" + x + "']")).length === 0) {
                                if ((y = f.tabs.find("a[href$='" + x + "']")).length === 0) {
                                    a.error("Tab '" + x + "' does not exist in tab set")
                                }
                            }
                        }
                    }
                } else {
                    y = y.children("a").first()
                }
                f.selectTab(y)
            }
        };
        var u = function(A, x, z) {
            var y = a.Event(x);
            A.trigger(y, z);
            return y.result !== false
        };
        var b = function() {
            q.addClass(r.containerClass);
            f.tabs.parent().addClass(r.tabsClass);
            f.tabs.addClass(r.tabClass);
            f.panels.addClass(r.panelClass)
        };
        var g = function() {
            var y = window.location.hash.match(/^[^\?]*/)[0],
                x = f.matchTab(y).parent(),
                z;
            if (x.length === 1) {
                h = x;
                r.cycle = false
            } else {
                z = f.matchInPanel(y);
                if (z.length) {
                    y = "#" + z.attr("id");
                    h = f.matchTab(y).parent()
                } else {
                    h = f.tabs.parent().find(r.defaultTab);
                    if (h.length === 0) {
                        a.error("The specified default tab ('" + r.defaultTab + "') could not be found in the tab set ('" + r.tabs + "') out of " + f.tabs.length + " tabs.")
                    }
                }
            }
            l = h.children("a").first();
            p(x)
        };
        var p = function(z) {
            var y, x;
            if (r.collapsible && z.length === 0 && r.collapsedByDefault) {
                h.addClass(r.collapsedClass).children().addClass(r.collapsedClass)
            } else {
                y = a(h.data("easytabs").panel);
                x = h.data("easytabs").ajax;
                if (x && (!r.cache || !h.data("easytabs").cached)) {
                    q.trigger("easytabs:ajax:beforeSend", [l, y]);
                    y.load(x, function(B, A, C) {
                        h.data("easytabs").cached = true;
                        q.trigger("easytabs:ajax:complete", [l, y, B, A, C])
                    })
                }
                h.data("easytabs").panel.show().addClass(r.panelActiveClass);
                h.addClass(r.tabActiveClass).children().addClass(r.tabActiveClass)
            }
            q.trigger("easytabs:initialised", [l, y])
        };
        var w = function() {
            f.tabs.children("a").bind(r.bind_str, function(x) {
                r.cycle = false;
                d = false;
                f.selectTab(a(this));
                x.preventDefault ? x.preventDefault() : x.returnValue = false
            })
        };
        var o = function(z, D, E, H) {
            f.panels.stop(true, true);
            if (u(q, "easytabs:before", [z, D, r])) {
                var A = f.panels.filter(":visible"),
                    y = D.parent(),
                    F, x, C, G, B = window.location.hash.match(/^[^\?]*/)[0];
                if (r.animate) {
                    F = s(D);
                    x = A.length ? k(A) : 0;
                    C = F - x
                }
                m = B;
                G = function() {
                    q.trigger("easytabs:midTransition", [z, D, r]);
                    if (r.animate && r.transitionIn == "fadeIn") {
                        if (C < 0) {
                            y.animate({
                                height: y.height() + C
                            }, v.halfSpeed).css({
                                "min-height": ""
                            })
                        }
                    }
                    if (r.updateHash && !d) {
                        window.location.hash = "#" + D.attr("id")
                    } else {
                        d = false
                    }
                    D[v.show](v.speed, r.transitionInEasing, function() {
                        y.css({
                            height: "",
                            "min-height": ""
                        });
                        q.trigger("easytabs:after", [z, D, r]);
                        if (typeof H == "function") {
                            H()
                        }
                    })
                };
                if (E && (!r.cache || !z.parent().data("easytabs").cached)) {
                    q.trigger("easytabs:ajax:beforeSend", [z, D]);
                    D.load(E, function(J, I, K) {
                        z.parent().data("easytabs").cached = true;
                        q.trigger("easytabs:ajax:complete", [z, D, J, I, K])
                    })
                }
                if (r.animate && r.transitionOut == "fadeOut") {
                    if (C > 0) {
                        y.animate({
                            height: (y.height() + C)
                        }, v.halfSpeed)
                    } else {
                        y.css({
                            "min-height": y.height()
                        })
                    }
                }
                f.tabs.filter("." + r.tabActiveClass).removeClass(r.tabActiveClass).children().removeClass(r.tabActiveClass);
                f.tabs.filter("." + r.collapsedClass).removeClass(r.collapsedClass).children().removeClass(r.collapsedClass);
                z.parent().addClass(r.tabActiveClass).children().addClass(r.tabActiveClass);
                f.panels.filter("." + r.panelActiveClass).removeClass(r.panelActiveClass);
                D.addClass(r.panelActiveClass);
                if (A.length) {
                    A[v.hide](v.speed, r.transitionOutEasing, G)
                } else {
                    D[v.uncollapse](v.speed, r.transitionUncollapseEasing, G)
                }
            }
        };
        var s = function(z) {
            if (z.data("easytabs") && z.data("easytabs").lastHeight) {
                return z.data("easytabs").lastHeight
            }
            var B = z.css("display"),
                y, x;
            try {
                y = a("<div></div>", {
                    position: "absolute",
                    visibility: "hidden",
                    overflow: "hidden"
                })
            } catch (A) {
                y = a("<div></div>", {
                    visibility: "hidden",
                    overflow: "hidden"
                })
            }
            x = z.wrap(y).css({
                position: "relative",
                visibility: "hidden",
                display: "block"
            }).outerHeight();
            z.unwrap();
            z.css({
                position: z.data("easytabs").position,
                visibility: z.data("easytabs").visibility,
                display: B
            });
            z.data("easytabs").lastHeight = x;
            return x
        };
        var k = function(y) {
            var x = y.outerHeight();
            if (y.data("easytabs")) {
                y.data("easytabs").lastHeight = x
            } else {
                y.data("easytabs", {
                    lastHeight: x
                })
            }
            return x
        };
        var n = function() {
            if (typeof a(window).hashchange === "function") {
                a(window).hashchange(function() {
                    f.selectTabFromHashChange()
                })
            } else {
                if (a.address && typeof a.address.change === "function") {
                    a.address.change(function() {
                        f.selectTabFromHashChange()
                    })
                }
            }
        };
        var c = function() {
            var x;
            if (r.cycle) {
                x = f.tabs.index(h);
                setTimeout(function() {
                    f.cycleTabs(x + 1)
                }, r.cycle)
            }
        };
        f.init()
    };
    a.fn.easytabs = function(c) {
        var b = arguments;
        return this.each(function() {
            var e = a(this),
                d = e.data("easytabs");
            if (undefined === d) {
                d = new a.easytabs(this, c);
                e.data("easytabs", d)
            }
            if (d.publicMethods[c]) {
                return d.publicMethods[c](Array.prototype.slice.call(b, 1))
            }
        })
    }
})(jQuery);




/* 05)--------------------------------------------------------------
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Pipe, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function f(a) {
        if (a.touches !== d) return {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        };
        if (a.touches === d) {
            if (a.pageX !== d) return {
                x: a.pageX,
                y: a.pageY
            };
            if (a.pageX === d) return {
                x: a.clientX,
                y: a.clientY
            }
        }
    }

    function g(a) {
        var b, d, e = c.createElement("div"),
            f = a;
        for (b in f)
            if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
        return [!1]
    }

    function h() {
        return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function i() {
        return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function j() {
        return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function k() {
        return "ontouchstart" in b || !!navigator.msMaxTouchPoints
    }

    function l() {
        return b.navigator.msPointerEnabled
    }
    var m, n, o;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, n = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, o = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a = this._clones,
                b = this.$stage.children(".cloned");
            (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var a, b, c = this._clones,
                d = this._items,
                e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
            for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a, b, c, d = this.settings.rtl ? 1 : -1,
                e = (this.width() / this.settings.items).toFixed(3),
                f = 0;
            for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var b, c, d = (this.width() / this.settings.items).toFixed(3),
                e = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(e), e = {
                    width: this.settings.autoWidth ? "auto" : d - this.settings.margin
                }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function(a) {
                    return a > 1
                }).length > 0)
                for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
            else this.$stage.children().css(e)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current && this.reset(this.$stage.children().index(a.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], e.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var b, c, e;
            if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) {
            return b.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        (new Date).getTime();
        this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function() {
        this.e._onDragStart = a.proxy(function(a) {
            this.onDragStart(a)
        }, this), this.e._onDragMove = a.proxy(function(a) {
            this.onDragMove(a)
        }, this), this.e._onDragEnd = a.proxy(function(a) {
            this.onDragEnd(a)
        }, this), this.e._onResize = a.proxy(function(a) {
            this.onResize(a)
        }, this), this.e._transitionEnd = a.proxy(function(a) {
            this.transitionEnd(a)
        }, this), this.e._preventClick = a.proxy(function(a) {
            this.preventClick(a)
        }, this)
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, e.prototype.eventsRouter = function(a) {
        var b = a.type;
        "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
    }, e.prototype.internalEvents = function() {
        var c = (k(), l());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this)), this.$stage.on("dragstart", function() {
            return !1
        }), this.$stage.get(0).onselectstart = function() {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function(d) {
        var e, g, h, i;
        if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
        if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) {
            this.eventsRouter(a)
        }, this))
    }, e.prototype.onDragMove = function(a) {
        var c, e, g, h, i, j;
        this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function(b) {
        var d, e, f;
        if (this.state.isTouch) {
            if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
        }
    }, e.prototype.removeClick = function(c) {
        this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() {
            a(c).off("click.preventClick")
        }, 300)
    }, e.prototype.preventClick = function(b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
    }, e.prototype.getTransformProperty = function() {
        var a, c;
        return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
    }, e.prototype.closest = function(b) {
        var c = -1,
            d = 30,
            e = this.width(),
            f = this.coordinates();
        return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) {
            return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
        }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function(b) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: b + "px"
        }) : this.$stage.animate({
            left: b
        }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(a) {
        this._invalidated[a] = !0
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
        var e = c ? this._items.length : this._items.length + this._clones.length;
        return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
    }, e.prototype.relative = function(a) {
        return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = 0,
            f = this.settings;
        if (a) return this._items.length - 1;
        if (!f.loop && f.center) b = this._items.length - 1;
        else if (f.loop || f.center)
            if (f.loop || f.center) b = this._items.length + f.items;
            else {
                if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
                for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
                    (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
            } else b = this._items.length - f.items;
        return b
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(c, d) {
        if (this.settings.loop) {
            var e = c - this.relative(this.current()),
                f = this.current(),
                g = this.current(),
                h = this.current() + e,
                i = 0 > g - h ? !0 : !1,
                j = this._clones.length + this._items.length;
            h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() {
                this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.transitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(a, b) {
        b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
            content: a,
            position: b
        }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: a,
            position: b
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.addTriggerableEvents = function() {
        var b = a.proxy(function(b, c) {
            return a.proxy(function(a) {
                a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
            }, this)
        }, this);
        a.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, a.proxy(function(a, c) {
            this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
        }, this))
    }, e.prototype.watchVisibility = function() {
        function c(a) {
            return a.offsetWidth > 0 && a.offsetHeight > 0
        }

        function d() {
            c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
        }
        c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        var c, d, e, f;
        c = 0, d = this, b.each(function(g, h) {
            e = a(h), f = new Image, f.onload = function() {
                c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
            }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
        })
    }, e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var d in this._plugins) this._plugins[d].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d) {
        var e = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            f = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, e, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(g)
        }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.browserSupport = function() {
        if (this.support3d = j(), this.support3d) {
            this.transformVendor = i();
            var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function(b) {
        return this.each(function() {
            a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b) {
    var c = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    c.Defaults = {
        lazyLoad: !1
    }, c.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, c.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document),
function(a) {
    var b = function(c) {
        this._core = c, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    b.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, b.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, b.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document),
function(a, b, c) {
    var d = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": a.proxy(function(a) {
                this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": a.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find(".owl-video");
                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
            }, this)
        }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    d.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, d.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, d.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, d.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, d.prototype.play = function(b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c, d, e = a(b.target || b.srcElement),
            f = e.closest("." + this._core.settings.itemClass),
            g = this._videos[f.attr("data-video")],
            h = g.width || "100%",
            i = g.height || this._core.$stage.height();
        "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
    }, d.prototype.isInFullScreen = function() {
        var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
    }, d.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                this.swapping = "translated" == a.type
            }, this),
            "translate.owl.carousel": a.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c) {
    var d = function(b) {
        this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    d.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, d.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
    }, d.prototype.play = function() {
        return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, d.prototype.stop = function() {
        b.clearInterval(this.interval)
    }, d.prototype.pause = function() {
        b.clearInterval(this.interval)
    }, d.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document),
function(a) {
    "use strict";
    var b = function(c) {
        this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": a.proxy(function(b) {
                this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) {
                this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "change.owl.carousel": a.proxy(function(a) {
                if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var b = this._core.current(),
                        c = this._core.maximum(),
                        d = this._core.minimum();
                    a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                "position" == a.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": a.proxy(function() {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    b.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, b.prototype.initialize = function() {
        var b, c, d = this._core.settings;
        d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function(b) {
            var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(c, d.dotsSpeed)
        }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() {
            this.prev(d.navSpeed)
        }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() {
            this.next(d.navSpeed)
        }, this));
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
    }, b.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, b.prototype.update = function() {
        var a, b, c, d = this._core.settings,
            e = this._core.clones().length / 2,
            f = e + this._core.items().length,
            g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
            for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
                start: a - e,
                end: a - e + g - 1
            }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
    }, b.prototype.draw = function() {
        var b, c, d = "",
            e = this._core.settings,
            f = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
            if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
                for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
                this._controls.$indicators.html(d)
            } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(e.dots)
    }, b.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
        }
    }, b.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, function(a) {
            return a.start <= b && a.end >= b
        }).pop()
    }, b.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, b.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, b.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, b.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document),
function(a, b) {
    "use strict";
    var c = function(d) {
        this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function() {
                "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[c] = b.content
            }, this)
        }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function() {
            var a = b.location.hash.substring(1),
                c = this._core.$stage.children(),
                d = this._hashes[a] && c.index(this._hashes[a]) || 0;
            return a ? void this._core.to(d, !1, !0) : !1
        }, this))
    };
    c.Defaults = {
        URLhashListener: !1
    }, c.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);




/* 06)--------------------------------------------------------------
 *! Magnific Popup - v0.9.9 - 2014-09-06
 * http://dimsemenov.com/plugins/magnific-popup/
 * copyright (c) 2014 Dmitry Semenov; */
(function(e) {
    var t, n, i, o, r, a, s, l = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        u = "BeforeAppend",
        p = "MarkupParse",
        f = "Open",
        m = "Change",
        g = "mfp",
        h = "." + g,
        v = "mfp-ready",
        C = "mfp-removing",
        y = "mfp-prevent-close",
        w = function() {},
        b = !!window.jQuery,
        I = e(window),
        x = function(e, n) {
            t.ev.on(g + e + h, n)
        },
        k = function(t, n, i, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        T = function(n, i) {
            t.ev.triggerHandler(g + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        E = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
        },
        _ = function() {
            e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
        },
        S = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    w.prototype = {
        constructor: w,
        init: function() {
            var n = navigator.appVersion;
            t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
        },
        open: function(n) {
            i || (i = e(document.body));
            var r;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var s, l = n.items;
                for (r = 0; l.length > r; r++)
                    if (s = l[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
                        t.index = r;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return t.updateItemHTML(), void 0;
            t.types = [], a = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + h, function() {
                t.close()
            }), t.wrap = k("wrap").attr("tabindex", -1).on("click" + h, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
            var c = e.magnificPopup.modules;
            for (r = 0; c.length > r; r++) {
                var d = c[r];
                d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
            }
            T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function(e, t, n, i) {
                n.close_replaceWith = E(i.type)
            }), a += " mfp-close-btn-in") : t.wrap.append(E())), t.st.alignTop && (a += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: I.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: o.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && o.on("keyup" + h, function(e) {
                27 === e.keyCode && t.close()
            }), I.on("resize" + h, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
            var u = t.wH = I.height(),
                m = {};
            if (t.fixedContentPos && t._hasScrollBar(u)) {
                var g = t._getScrollbarSize();
                g && (m.marginRight = g)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var C = t.st.mainClass;
            return t.isIE7 && (C += " mfp-ie7"), C && t._addClassToMFP(C), t.updateItemHTML(), T("BuildControls"), e("html").css(m), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), o.on("focusin" + h, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(u), T(f), n
        },
        close: function() {
            t.isOpen && (T(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(C), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            T(l);
            var n = C + " " + v + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var i = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
            }
            o.off("keyup" + h + " focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T(d)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || I.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var o = t.st[i] ? t.st[i].markup : !1;
                T("FirstMarkupParse", o), t.currTemplate[i] = o ? e(o) : !0
            }
            r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i), n.preloaded = !0, T(m, n), r = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "", T(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = {
                    el: e(o)
                } : (i = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var r = t.types, a = 0; r.length > a; a++)
                    if (o.el.hasClass("mfp-" + r[a])) {
                        i = r[a];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, T("ElementParse", o), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0
                    } else if (a > I.width()) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(y)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i) return !0
                } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), T(p, [t, n, i]), e.each(n, function(e, n) {
                if (void 0 === n || n === !1) return !0;
                if (o = e.split("_"), o.length > 1) {
                    var i = t.find(h + "-" + o[0]);
                    if (i.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
                    }
                } else t.find(h + "-" + e).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: w.prototype,
        modules: [],
        open: function(t, n) {
            return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function(n) {
        _();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
                    mfpEl: o
                }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var P, O, z, M = "inline",
        B = function() {
            z && (O.after(z.addClass(P)).detach(), z = null)
        };
    e.magnificPopup.registerModule(M, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(M), x(l + "." + M, function() {
                    B()
                })
            },
            getInline: function(n, i) {
                if (B(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (O || (P = o.hiddenClass, O = k(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var F, H = "ajax",
        L = function() {
            F && i.removeClass(F)
        },
        A = function() {
            L(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(H), F = t.st.ajax.cursor, x(l + "." + H, A), x("BeforeChange." + H, A)
            },
            getAjax: function(n) {
                F && i.addClass(F), t.updateStatus("loading");
                var o = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var a = {
                            data: i,
                            xhr: r
                        };
                        T("ParseAjax", a), t.appendContent(e(a.data), H), n.finished = !0, L(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(v)
                        }, 16), t.updateStatus("ready"), T("AjaxContentAdded")
                    },
                    error: function() {
                        L(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o), ""
            }
        }
    });
    var j, N = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = t.st.image,
                    n = ".image";
                t.types.push("image"), x(f + n, function() {
                    "image" === t.currItem.type && e.cursor && i.addClass(e.cursor)
                }), x(l + n, function() {
                    e.cursor && i.removeClass(e.cursor), I.off("resize" + h)
                }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) {
                        j && clearInterval(j), j = setInterval(function() {
                            return i.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(j), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0)
                        }, r)
                    };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
                    },
                    a = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: N(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var W, R = function() {
        return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, a = n.duration,
                        s = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        d = function() {
                            t.content.css("visibility", "visible")
                        };
                    x("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return d(), void 0;
                            r = s(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() {
                                r.css(t._getOffset(!0)), o = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        r.remove(), e = r = null, T("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), x(c + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = s(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), x(l + i, function() {
                        t._allowZoom() && (d(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = {
                    width: i.width(),
                    height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r
                };
                return R() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var Z = "iframe",
        q = "//about:blank",
        D = function(e) {
            if (t.currTemplate[Z]) {
                var n = t.currTemplate[Z].find("iframe");
                n.length && (e || (n[0].src = q), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(Z, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(Z), x("BeforeChange", function(e, t, n) {
                    t !== n && (t === Z ? D() : n === Z && D(!0))
                }), x(l + "." + Z, function() {
                    D()
                })
            },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
            }
        }
    });
    var K = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : 0 > e ? n + e : e
        },
        Y = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    i = ".mfp-gallery",
                    r = Boolean(e.fn.mfpFastClick);
                return t.direction = !0, n && n.enabled ? (a += " mfp-gallery", x(f + i, function() {
                    n.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), o.on("keydown" + i, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), x("UpdateStatus" + i, function(e, n) {
                    n.text && (n.text = Y(n.text, t.currItem.index, t.items.length))
                }), x(p + i, function(e, i, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ""
                }), x("BuildControls" + i, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            a = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = r ? "mfpFastClick" : "click";
                        o[s](function() {
                            t.prev()
                        }), a[s](function() {
                            t.next()
                        }), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", a[0], !1, !0), k("a", a[0], !1, !0)), t.container.append(o.add(a))
                    }
                }), x(m + i, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), x(l + i, function() {
                    o.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
                }), void 0) : !1
            },
            next: function() {
                t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1;
                    (t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e);
                for (e = 1;
                    (t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = K(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    e.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(e) {
                    return e.src.replace(/\.\w+$/, function(e) {
                        return "@2x" + e
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var e = t.st.retina,
                            n = e.ratio;
                        n = isNaN(n) ? n() : n, n > 1 && (x("ImageHasSize." + U, function(e, t) {
                            t.img.css({
                                "max-width": t.img[0].naturalWidth / n,
                                width: "100%"
                            })
                        }), x("ElementParse." + U, function(t, i) {
                            i.src = e.replaceSrc(i, n)
                        }))
                    }
                }
            }
        }),
        function() {
            var t = 1e3,
                n = "ontouchstart" in window,
                i = function() {
                    I.off("touchmove" + r + " touchend" + r)
                },
                o = "mfpFastClick",
                r = "." + o;
            e.fn.mfpFastClick = function(o) {
                return e(this).each(function() {
                    var a, s = e(this);
                    if (n) {
                        var l, c, d, u, p, f;
                        s.on("touchstart" + r, function(e) {
                            u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, I.on("touchmove" + r, function(e) {
                                p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i())
                            }).on("touchend" + r, function(e) {
                                i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function() {
                                    a = !1
                                }, t), o())
                            })
                        })
                    }
                    s.on("click" + r, function() {
                        a || o()
                    })
                })
            }, e.fn.destroyMfpFastClick = function() {
                e(this).off("touchstart" + r + " click" + r), n && I.off("touchmove" + r + " touchend" + r)
            }
        }(), _()
})(window.jQuery || window.Zepto);




/* 07)--------------------------------------------------------------
/* Placeholders.js v3.0.2 */
(function(t) {
    "use strict";

    function e(t, e, r) {
        return t.addEventListener ? t.addEventListener(e, r, !1) : t.attachEvent ? t.attachEvent("on" + e, r) : void 0
    }

    function r(t, e) {
        var r, n;
        for (r = 0, n = t.length; n > r; r++)
            if (t[r] === e) return !0;
        return !1
    }

    function n(t, e) {
        var r;
        t.createTextRange ? (r = t.createTextRange(), r.move("character", e), r.select()) : t.selectionStart && (t.focus(), t.setSelectionRange(e, e))
    }

    function a(t, e) {
        try {
            return t.type = e, !0
        } catch (r) {
            return !1
        }
    }
    t.Placeholders = {
        Utils: {
            addEventListener: e,
            inArray: r,
            moveCaret: n,
            changeType: a
        }
    }
})(this),
function(t) {
    "use strict";

    function e() {}

    function r() {
        try {
            return document.activeElement
        } catch (t) {}
    }

    function n(t, e) {
        var r, n, a = !!e && t.value !== e,
            u = t.value === t.getAttribute(V);
        return (a || u) && "true" === t.getAttribute(D) ? (t.removeAttribute(D), t.value = t.value.replace(t.getAttribute(V), ""), t.className = t.className.replace(R, ""), n = t.getAttribute(F), parseInt(n, 10) >= 0 && (t.setAttribute("maxLength", n), t.removeAttribute(F)), r = t.getAttribute(P), r && (t.type = r), !0) : !1
    }

    function a(t) {
        var e, r, n = t.getAttribute(V);
        return "" === t.value && n ? (t.setAttribute(D, "true"), t.value = n, t.className += " " + I, r = t.getAttribute(F), r || (t.setAttribute(F, t.maxLength), t.removeAttribute("maxLength")), e = t.getAttribute(P), e ? t.type = "text" : "password" === t.type && M.changeType(t, "text") && t.setAttribute(P, "password"), !0) : !1
    }

    function u(t, e) {
        var r, n, a, u, i, l, o;
        if (t && t.getAttribute(V)) e(t);
        else
            for (a = t ? t.getElementsByTagName("input") : b, u = t ? t.getElementsByTagName("textarea") : f, r = a ? a.length : 0, n = u ? u.length : 0, o = 0, l = r + n; l > o; o++) i = r > o ? a[o] : u[o - r], e(i)
    }

    function i(t) {
        u(t, n)
    }

    function l(t) {
        u(t, a)
    }

    function o(t) {
        return function() {
            m && t.value === t.getAttribute(V) && "true" === t.getAttribute(D) ? M.moveCaret(t, 0) : n(t)
        }
    }

    function c(t) {
        return function() {
            a(t)
        }
    }

    function s(t) {
        return function(e) {
            return A = t.value, "true" === t.getAttribute(D) && A === t.getAttribute(V) && M.inArray(C, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0
        }
    }

    function d(t) {
        return function() {
            n(t, A), "" === t.value && (t.blur(), M.moveCaret(t, 0))
        }
    }

    function g(t) {
        return function() {
            t === r() && t.value === t.getAttribute(V) && "true" === t.getAttribute(D) && M.moveCaret(t, 0)
        }
    }

    function v(t) {
        return function() {
            i(t)
        }
    }

    function p(t) {
        t.form && (T = t.form, "string" == typeof T && (T = document.getElementById(T)), T.getAttribute(U) || (M.addEventListener(T, "submit", v(T)), T.setAttribute(U, "true"))), M.addEventListener(t, "focus", o(t)), M.addEventListener(t, "blur", c(t)), m && (M.addEventListener(t, "keydown", s(t)), M.addEventListener(t, "keyup", d(t)), M.addEventListener(t, "click", g(t))), t.setAttribute(j, "true"), t.setAttribute(V, x), (m || t !== r()) && a(t)
    }
    var b, f, m, h, A, y, E, x, L, T, N, S, w, B = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
        C = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
        k = "#000",
        I = "placeholdersjs",
        R = RegExp("(?:^|\\s)" + I + "(?!\\S)"),
        V = "data-placeholder-value",
        D = "data-placeholder-active",
        P = "data-placeholder-type",
        U = "data-placeholder-submit",
        j = "data-placeholder-bound",
        q = "data-placeholder-focus",
        z = "data-placeholder-live",
        F = "data-placeholder-maxlength",
        G = document.createElement("input"),
        H = document.getElementsByTagName("head")[0],
        J = document.documentElement,
        K = t.Placeholders,
        M = K.Utils;
    if (K.nativeSupport = void 0 !== G.placeholder, !K.nativeSupport) {
        for (b = document.getElementsByTagName("input"), f = document.getElementsByTagName("textarea"), m = "false" === J.getAttribute(q), h = "false" !== J.getAttribute(z), y = document.createElement("style"), y.type = "text/css", E = document.createTextNode("." + I + " { color:" + k + "; }"), y.styleSheet ? y.styleSheet.cssText = E.nodeValue : y.appendChild(E), H.insertBefore(y, H.firstChild), w = 0, S = b.length + f.length; S > w; w++) N = b.length > w ? b[w] : f[w - b.length], x = N.attributes.placeholder, x && (x = x.nodeValue, x && M.inArray(B, N.type) && p(N));
        L = setInterval(function() {
            for (w = 0, S = b.length + f.length; S > w; w++) N = b.length > w ? b[w] : f[w - b.length], x = N.attributes.placeholder, x ? (x = x.nodeValue, x && M.inArray(B, N.type) && (N.getAttribute(j) || p(N), (x !== N.getAttribute(V) || "password" === N.type && !N.getAttribute(P)) && ("password" === N.type && !N.getAttribute(P) && M.changeType(N, "text") && N.setAttribute(P, "password"), N.value === N.getAttribute(V) && (N.value = x), N.setAttribute(V, x)))) : N.getAttribute(D) && (n(N), N.removeAttribute(V));
            h || clearInterval(L)
        }, 100)
    }
    M.addEventListener(t, "beforeunload", function() {
        K.disable()
    }), K.disable = K.nativeSupport ? e : i, K.enable = K.nativeSupport ? e : l
}(this);




/* 08)--------------------------------------------------------------
/*! jQuery UI - v1.11.2 - 2014-12-21
* http://jqueryui.com
* Includes: core.js, datepicker.js
* copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function(e) {
    function t(t, s) {
        var a, n, r, o = t.nodeName.toLowerCase();
        return "area" === o ? (a = t.parentNode, n = a.name, t.href && n && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap='#" + n + "']")[0], !!r && i(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || s : s) && i(t)
    }

    function i(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }

    function s(e) {
        for (var t, i; e.length && e[0] !== document;) {
            if (t = e.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(e.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            e = e.parent()

        }
        return 0
    }

    function a() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = n(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function n(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.delegate(i, "mouseout", function() {
            e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", r)
    }

    function r() {
        e.datepicker._isDisabledDatepicker(h.inline ? h.dpDiv.parent()[0] : h.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
    }

    function o(t, i) {
        e.extend(t, i);
        for (var s in i) null == i[s] && (t[s] = i[s]);
        return t
    }
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.11.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function(t) {
            var i = this.css("position"),
                s = "absolute" === i,
                a = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                n = this.parents().filter(function() {
                    var t = e(this);
                    return s && "static" === t.css("position") ? !1 : a.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && n.length ? n : e(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var e = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, s) {
            return !!e.data(t, s[3])
        },
        focusable: function(i) {
            return t(i, !isNaN(e.attr(i, "tabindex")))
        },
        tabbable: function(i) {
            var s = e.attr(i, "tabindex"),
                a = isNaN(s);
            return (a || s >= 0) && t(i, !a)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
        function s(t, i, s, n) {
            return e.each(a, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), n && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var a = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            n = i.toLowerCase(),
            r = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + i] = function(t) {
            return void 0 === t ? r["inner" + i].call(this) : this.each(function() {
                e(this).css(n, s(this, t) + "px")
            })
        }, e.fn["outer" + i] = function(t, a) {
            return "number" != typeof t ? r["outer" + i].call(this, t) : this.each(function() {
                e(this).css(n, s(this, t, !0, a) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() {
            var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(e + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(t) {
            if (void 0 !== t) return this.css("zIndex", t);
            if (this.length)
                for (var i, s, a = e(this[0]); a.length && a[0] !== document;) {
                    if (i = a.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(a.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    a = a.parent()
                }
            return 0
        }
    }), e.ui.plugin = {
        add: function(t, i, s) {
            var a, n = e.ui[t].prototype;
            for (a in s) n.plugins[a] = n.plugins[a] || [], n.plugins[a].push([i, s[a]])
        },
        call: function(e, t, i, s) {
            var a, n = e.plugins[t];
            if (n && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (a = 0; n.length > a; a++) e.options[n[a][0]] && n[a][1].apply(e.element, i)
        }
    }, e.extend(e.ui, {
        datepicker: {
            version: "1.11.2"
        }
    });
    var h;
    e.extend(a.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(e) {
            return o(this._defaults, e || {}), this
        },
        _attachDatepicker: function(t, i) {
            var s, a, n;
            s = t.nodeName.toLowerCase(), a = "div" === s || "span" === s, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), n = this._newInst(e(t), a), n.settings = e.extend({}, i || {}), "input" === s ? this._connectDatepicker(t, n) : a && this._inlineDatepicker(t, n)
        },
        _newInst: function(t, i) {
            var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: s,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? n(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, i) {
            var s = e(t);
            i.append = e([]), i.trigger = e([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var s, a, n, r = this._get(i, "appendText"),
                o = this._get(i, "isRTL");
            i.append && i.append.remove(), r && (i.append = e("<span class='" + this._appendClass + "'>" + r + "</span>"), t[o ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && t.focus(this._showDatepicker), ("button" === s || "both" === s) && (a = this._get(i, "buttonText"), n = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
                src: n,
                alt: a,
                title: a
            }) : e("<button type='button'></button>").addClass(this._triggerClass).html(n ? e("<img/>").attr({
                src: n,
                alt: a,
                title: a
            }) : a)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
                return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
            }))
        },
        _autoSize: function(e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t, i, s, a, n = new Date(2009, 11, 20),
                    r = this._get(e, "dateFormat");
                r.match(/[DM]/) && (t = function(e) {
                    for (i = 0, s = 0, a = 0; e.length > a; a++) e[a].length > i && (i = e[a].length, s = a);
                    return s
                }, n.setMonth(t(this._get(e, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), n.setDate(t(this._get(e, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - n.getDay())), e.input.attr("size", this._formatDate(e, n).length)
            }
        },
        _inlineDatepicker: function(t, i) {
            var s = e(t);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), e.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, i, s, a, n) {
            var r, h, l, u, d, c = this._dialogInst;
            return c || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), c = this._dialogInst = this._newInst(this._dialogInput, !1), c.settings = {}, e.data(this._dialogInput[0], "datepicker", c)), o(c.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(c, i) : i, this._dialogInput.val(i), this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + u, l / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), c.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", c), this
        },
        _destroyDatepicker: function(t) {
            var i, s = e(t),
                a = e.data(t, "datepicker");
            s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), "input" === i ? (a.append.remove(), a.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(t) {
            var i, s, a = e(t),
                n = e.data(t, "datepicker");
            a.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, n.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (s = a.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                return e === t ? null : e
            }))
        },
        _disableDatepicker: function(t) {
            var i, s, a = e(t),
                n = e.data(t, "datepicker");
            a.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, n.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (s = a.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                return e === t ? null : e
            }), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(e) {
            if (!e) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === e) return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return e.data(t, "datepicker")
            } catch (i) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(t, i, s) {
            var a, n, r, h, l = this._getInst(t);
            return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? e.extend({}, e.datepicker._defaults) : l ? "all" === i ? e.extend({}, l.settings) : this._get(l, i) : null : (a = i || {}, "string" == typeof i && (a = {}, a[i] = s), l && (this._curInst === l && this._hideDatepicker(), n = this._getDateDatepicker(t, !0), r = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), o(l.settings, a), null !== r && void 0 !== a.dateFormat && void 0 === a.minDate && (l.settings.minDate = this._formatDate(l, r)), null !== h && void 0 !== a.dateFormat && void 0 === a.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in a && (a.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), l), this._autoSize(l), this._setDate(l, n), this._updateAlternate(l), this._updateDatepicker(l)), void 0)
        },
        _changeDatepicker: function(e, t, i) {
            this._optionDatepicker(e, t, i)
        },
        _refreshDatepicker: function(e) {
            var t = this._getInst(e);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(e, t) {
            var i = this._getInst(e);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function(t) {
            var i, s, a, n = e.datepicker._getInst(t.target),
                r = !0,
                o = n.dpDiv.is(".ui-datepicker-rtl");
            if (n._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    e.datepicker._hideDatepicker(), r = !1;
                    break;
                case 13:
                    return a = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", n.dpDiv), a[0] && e.datepicker._selectDay(t.target, n.selectedMonth, n.selectedYear, a[0]), i = e.datepicker._get(n, "onSelect"), i ? (s = e.datepicker._formatDate(n), i.apply(n.input ? n.input[0] : null, [s, n])) : e.datepicker._hideDatepicker(), !1;
                case 27:
                    e.datepicker._hideDatepicker();
                    break;
                case 33:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(n, "stepBigMonths") : -e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 34:
                    e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(n, "stepBigMonths") : +e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, o ? 1 : -1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(n, "stepBigMonths") : -e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, o ? -1 : 1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(n, "stepBigMonths") : +e.datepicker._get(n, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
            } else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function(t) {
            var i, s, a = e.datepicker._getInst(t.target);
            return e.datepicker._get(a, "constrainInput") ? (i = e.datepicker._possibleChars(e.datepicker._get(a, "dateFormat")), s = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0
        },
        _doKeyUp: function(t) {
            var i, s = e.datepicker._getInst(t.target);
            if (s.input.val() !== s.lastVal) try {
                i = e.datepicker.parseDate(e.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, e.datepicker._getFormatConfig(s)), i && (e.datepicker._setDateFromField(s), e.datepicker._updateAlternate(s), e.datepicker._updateDatepicker(s))
            } catch (a) {}
            return !0
        },
        _showDatepicker: function(t) {
            if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
                var i, a, n, r, h, l, u;
                i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), a = e.datepicker._get(i, "beforeShow"), n = a ? a.apply(t, [t, i]) : {}, n !== !1 && (o(i.settings, n), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), r = !1, e(t).parents().each(function() {
                    return r |= "fixed" === e(this).css("position"), !r
                }), h = {
                    left: e.datepicker._pos[0],
                    top: e.datepicker._pos[1]
                }, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), e.datepicker._updateDatepicker(i), h = e.datepicker._checkOffset(i, h, r), i.dpDiv.css({
                    position: e.datepicker._inDialog && e.blockUI ? "static" : r ? "fixed" : "absolute",
                    display: "none",
                    left: h.left + "px",
                    top: h.top + "px"
                }), i.inline || (l = e.datepicker._get(i, "showAnim"), u = e.datepicker._get(i, "duration"), i.dpDiv.css("z-index", s(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[l] ? i.dpDiv.show(l, e.datepicker._get(i, "showOptions"), u) : i.dpDiv[l || "show"](l ? u : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4, h = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
            var i, s = this._getNumberOfMonths(t),
                a = s[1],
                n = 17,
                o = t.dpDiv.find("." + this._dayOverClass + " a");
            o.length > 0 && r.apply(o.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), a > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", n * a + "em"), t.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function() {
                i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(e) {
            return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
        },
        _checkOffset: function(t, i, s) {
            var a = t.dpDiv.outerWidth(),
                n = t.dpDiv.outerHeight(),
                r = t.input ? t.input.outerWidth() : 0,
                o = t.input ? t.input.outerHeight() : 0,
                h = document.documentElement.clientWidth + (s ? 0 : e(document).scrollLeft()),
                l = document.documentElement.clientHeight + (s ? 0 : e(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? a - r : 0, i.left -= s && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= s && i.top === t.input.offset().top + o ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + a > h && h > a ? Math.abs(i.left + a - h) : 0), i.top -= Math.min(i.top, i.top + n > l && l > n ? Math.abs(n + o) : 0), i
        },
        _findPos: function(t) {
            for (var i, s = this._getInst(t), a = this._get(s, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[a ? "previousSibling" : "nextSibling"];
            return i = e(t).offset(), [i.left, i.top]
        },
        _hideDatepicker: function(t) {
            var i, s, a, n, r = this._curInst;
            !r || t && r !== e.data(t, "datepicker") || this._datepickerShowing && (i = this._get(r, "showAnim"), s = this._get(r, "duration"), a = function() {
                e.datepicker._tidyDialog(r)
            }, e.effects && (e.effects.effect[i] || e.effects[i]) ? r.dpDiv.hide(i, e.datepicker._get(r, "showOptions"), s, a) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, a), i || a(), this._datepickerShowing = !1, n = this._get(r, "onClose"), n && n.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(e) {
            e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            if (e.datepicker._curInst) {
                var i = e(t.target),
                    s = e.datepicker._getInst(i[0]);
                (i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== s) && e.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, s) {
            var a = e(t),
                n = this._getInst(a[0]);
            this._isDisabledDatepicker(a[0]) || (this._adjustInstDate(n, i + ("M" === s ? this._get(n, "showCurrentAtPos") : 0), s), this._updateDatepicker(n))
        },
        _gotoToday: function(t) {
            var i, s = e(t),
                a = this._getInst(s[0]);
            this._get(a, "gotoCurrent") && a.currentDay ? (a.selectedDay = a.currentDay, a.drawMonth = a.selectedMonth = a.currentMonth, a.drawYear = a.selectedYear = a.currentYear) : (i = new Date, a.selectedDay = i.getDate(), a.drawMonth = a.selectedMonth = i.getMonth(), a.drawYear = a.selectedYear = i.getFullYear()), this._notifyChange(a), this._adjustDate(s)
        },
        _selectMonthYear: function(t, i, s) {
            var a = e(t),
                n = this._getInst(a[0]);
            n["selected" + ("M" === s ? "Month" : "Year")] = n["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(n), this._adjustDate(a)
        },
        _selectDay: function(t, i, s, a) {
            var n, r = e(t);
            e(a).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (n = this._getInst(r[0]), n.selectedDay = n.currentDay = e("a", a).html(), n.selectedMonth = n.currentMonth = i, n.selectedYear = n.currentYear = s, this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)))
        },
        _clearDate: function(t) {
            var i = e(t);
            this._selectDate(i, "")
        },
        _selectDate: function(t, i) {
            var s, a = e(t),
                n = this._getInst(a[0]);
            i = null != i ? i : this._formatDate(n), n.input && n.input.val(i), this._updateAlternate(n), s = this._get(n, "onSelect"), s ? s.apply(n.input ? n.input[0] : null, [i, n]) : n.input && n.input.trigger("change"), n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(), this._lastInput = n.input[0], "object" != typeof n.input[0] && n.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var i, s, a, n = this._get(t, "altField");
            n && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), s = this._getDate(t), a = this.formatDate(i, s, this._getFormatConfig(t)), e(n).each(function() {
                e(this).val(a)
            }))
        },
        noWeekends: function(e) {
            var t = e.getDay();
            return [t > 0 && 6 > t, ""]
        },
        iso8601Week: function(e) {
            var t, i = new Date(e.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1
        },
        parseDate: function(t, i, s) {
            if (null == t || null == i) throw "Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
            var a, n, r, o, h = 0,
                l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                u = "string" != typeof l ? l : (new Date).getFullYear() % 100 + parseInt(l, 10),
                d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                c = (s ? s.dayNames : null) || this._defaults.dayNames,
                p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                f = (s ? s.monthNames : null) || this._defaults.monthNames,
                m = -1,
                g = -1,
                v = -1,
                y = -1,
                b = !1,
                _ = function(e) {
                    var i = t.length > a + 1 && t.charAt(a + 1) === e;
                    return i && a++, i
                },
                x = function(e) {
                    var t = _(e),
                        s = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
                        a = "y" === e ? s : 1,
                        n = RegExp("^\\d{" + a + "," + s + "}"),
                        r = i.substring(h).match(n);
                    if (!r) throw "Missing number at position " + h;
                    return h += r[0].length, parseInt(r[0], 10)
                },
                k = function(t, s, a) {
                    var n = -1,
                        r = e.map(_(t) ? a : s, function(e, t) {
                            return [
                                [t, e]
                            ]
                        }).sort(function(e, t) {
                            return -(e[1].length - t[1].length)
                        });
                    if (e.each(r, function(e, t) {
                            var s = t[1];
                            return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (n = t[0], h += s.length, !1) : void 0
                        }), -1 !== n) return n + 1;
                    throw "Unknown name at position " + h
                },
                w = function() {
                    if (i.charAt(h) !== t.charAt(a)) throw "Unexpected literal at position " + h;
                    h++
                };
            for (a = 0; t.length > a; a++)
                if (b) "'" !== t.charAt(a) || _("'") ? w() : b = !1;
                else switch (t.charAt(a)) {
                    case "d":
                        v = x("d");
                        break;
                    case "D":
                        k("D", d, c);
                        break;
                    case "o":
                        y = x("o");
                        break;
                    case "m":
                        g = x("m");
                        break;
                    case "M":
                        g = k("M", p, f);
                        break;
                    case "y":
                        m = x("y");
                        break;
                    case "@":
                        o = new Date(x("@")), m = o.getFullYear(), g = o.getMonth() + 1, v = o.getDate();
                        break;
                    case "!":
                        o = new Date((x("!") - this._ticksTo1970) / 1e4), m = o.getFullYear(), g = o.getMonth() + 1, v = o.getDate();
                        break;
                    case "'":
                        _("'") ? w() : b = !0;
                        break;
                    default:
                        w()
                }
                if (i.length > h && (r = i.substr(h), !/^\s+/.test(r))) throw "Extra/unparsed characters found in date: " + r;
            if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), y > -1)
                for (g = 1, v = y;;) {
                    if (n = this._getDaysInMonth(m, g - 1), n >= v) break;
                    g++, v -= n
                }
            if (o = this._daylightSavingAdjust(new Date(m, g - 1, v)), o.getFullYear() !== m || o.getMonth() + 1 !== g || o.getDate() !== v) throw "Invalid date";
            return o
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(e, t, i) {
            if (!t) return "";
            var s, a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                n = (i ? i.dayNames : null) || this._defaults.dayNames,
                r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                o = (i ? i.monthNames : null) || this._defaults.monthNames,
                h = function(t) {
                    var i = e.length > s + 1 && e.charAt(s + 1) === t;
                    return i && s++, i
                },
                l = function(e, t, i) {
                    var s = "" + t;
                    if (h(e))
                        for (; i > s.length;) s = "0" + s;
                    return s
                },
                u = function(e, t, i, s) {
                    return h(e) ? s[t] : i[t]
                },
                d = "",
                c = !1;
            if (t)
                for (s = 0; e.length > s; s++)
                    if (c) "'" !== e.charAt(s) || h("'") ? d += e.charAt(s) : c = !1;
                    else switch (e.charAt(s)) {
                        case "d":
                            d += l("d", t.getDate(), 2);
                            break;
                        case "D":
                            d += u("D", t.getDay(), a, n);
                            break;
                        case "o":
                            d += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            d += l("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            d += u("M", t.getMonth(), r, o);
                            break;
                        case "y":
                            d += h("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            d += t.getTime();
                            break;
                        case "!":
                            d += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            h("'") ? d += "'" : c = !0;
                            break;
                        default:
                            d += e.charAt(s)
                    }
                    return d
        },
        _possibleChars: function(e) {
            var t, i = "",
                s = !1,
                a = function(i) {
                    var s = e.length > t + 1 && e.charAt(t + 1) === i;
                    return s && t++, s
                };
            for (t = 0; e.length > t; t++)
                if (s) "'" !== e.charAt(t) || a("'") ? i += e.charAt(t) : s = !1;
                else switch (e.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        a("'") ? i += "'" : s = !0;
                        break;
                    default:
                        i += e.charAt(t)
                }
                return i
        },
        _get: function(e, t) {
            return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t]
        },
        _setDateFromField: function(e, t) {
            if (e.input.val() !== e.lastVal) {
                var i = this._get(e, "dateFormat"),
                    s = e.lastVal = e.input ? e.input.val() : null,
                    a = this._getDefaultDate(e),
                    n = a,
                    r = this._getFormatConfig(e);
                try {
                    n = this.parseDate(i, s, r) || a
                } catch (o) {
                    s = t ? "" : s
                }
                e.selectedDay = n.getDate(), e.drawMonth = e.selectedMonth = n.getMonth(), e.drawYear = e.selectedYear = n.getFullYear(), e.currentDay = s ? n.getDate() : 0, e.currentMonth = s ? n.getMonth() : 0, e.currentYear = s ? n.getFullYear() : 0, this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function(e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
        },
        _determineDate: function(t, i, s) {
            var a = function(e) {
                    var t = new Date;
                    return t.setDate(t.getDate() + e), t
                },
                n = function(i) {
                    try {
                        return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t))
                    } catch (s) {}
                    for (var a = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, n = a.getFullYear(), r = a.getMonth(), o = a.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
                        switch (l[2] || "d") {
                            case "d":
                            case "D":
                                o += parseInt(l[1], 10);
                                break;
                            case "w":
                            case "W":
                                o += 7 * parseInt(l[1], 10);
                                break;
                            case "m":
                            case "M":
                                r += parseInt(l[1], 10), o = Math.min(o, e.datepicker._getDaysInMonth(n, r));
                                break;
                            case "y":
                            case "Y":
                                n += parseInt(l[1], 10), o = Math.min(o, e.datepicker._getDaysInMonth(n, r))
                        }
                        l = h.exec(i)
                    }
                    return new Date(n, r, o)
                },
                r = null == i || "" === i ? s : "string" == typeof i ? n(i) : "number" == typeof i ? isNaN(i) ? s : a(i) : new Date(i.getTime());
            return r = r && "Invalid Date" == "" + r ? s : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r)
        },
        _daylightSavingAdjust: function(e) {
            return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
        },
        _setDate: function(e, t, i) {
            var s = !t,
                a = e.selectedMonth,
                n = e.selectedYear,
                r = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = r.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = r.getMonth(), e.drawYear = e.selectedYear = e.currentYear = r.getFullYear(), a === e.selectedMonth && n === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(s ? "" : this._formatDate(e))
        },
        _getDate: function(e) {
            var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return t
        },
        _attachHandlers: function(t) {
            var i = this._get(t, "stepMonths"),
                s = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        e.datepicker._adjustDate(s, -i, "M")
                    },
                    next: function() {
                        e.datepicker._adjustDate(s, +i, "M")
                    },
                    hide: function() {
                        e.datepicker._hideDatepicker()
                    },
                    today: function() {
                        e.datepicker._gotoToday(s)
                    },
                    selectDay: function() {
                        return e.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return e.datepicker._selectMonthYear(s, this, "M"), !1
                    },
                    selectYear: function() {
                        return e.datepicker._selectMonthYear(s, this, "Y"), !1
                    }
                };
                e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(e) {
            var t, i, s, a, n, r, o, h, l, u, d, c, p, f, m, g, v, y, b, _, x, k, w, D, T, S, M, N, C, A, I, P, F, H, z, j, E, O, L, W = new Date,
                R = this._daylightSavingAdjust(new Date(W.getFullYear(), W.getMonth(), W.getDate())),
                Y = this._get(e, "isRTL"),
                J = this._get(e, "showButtonPanel"),
                B = this._get(e, "hideIfNoPrevNext"),
                K = this._get(e, "navigationAsDateFormat"),
                V = this._getNumberOfMonths(e),
                q = this._get(e, "showCurrentAtPos"),
                U = this._get(e, "stepMonths"),
                G = 1 !== V[0] || 1 !== V[1],
                Q = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                X = this._getMinMaxDate(e, "min"),
                $ = this._getMinMaxDate(e, "max"),
                Z = e.drawMonth - q,
                et = e.drawYear;
            if (0 > Z && (Z += 12, et--), $)
                for (t = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - V[0] * V[1] + 1, $.getDate())), t = X && X > t ? X : t; this._daylightSavingAdjust(new Date(et, Z, 1)) > t;) Z--, 0 > Z && (Z = 11, et--);
            for (e.drawMonth = Z, e.drawYear = et, i = this._get(e, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z - U, 1)), this._getFormatConfig(e)) : i, s = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : B ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", a = this._get(e, "nextText"), a = K ? this.formatDate(a, this._daylightSavingAdjust(new Date(et, Z + U, 1)), this._getFormatConfig(e)) : a, n = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + a + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + a + "</span></a>" : B ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + a + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + a + "</span></a>", r = this._get(e, "currentText"), o = this._get(e, "gotoCurrent") && e.currentDay ? Q : R, r = K ? this.formatDate(r, o, this._getFormatConfig(e)) : r, h = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", l = J ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(e, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (Y ? "" : h) + "</div>" : "", u = parseInt(this._get(e, "firstDay"), 10), u = isNaN(u) ? 0 : u, d = this._get(e, "showWeek"), c = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), g = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), _ = "", k = 0; V[0] > k; k++) {
                for (w = "", this.maxRows = 4, D = 0; V[1] > D; D++) {
                    if (T = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), S = " ui-corner-all", M = "", G) {
                        if (M += "<div class='ui-datepicker-group", V[1] > 1) switch (D) {
                            case 0:
                                M += " ui-datepicker-group-first", S = " ui-corner-" + (Y ? "right" : "left");
                                break;
                            case V[1] - 1:
                                M += " ui-datepicker-group-last", S = " ui-corner-" + (Y ? "left" : "right");
                                break;
                            default:
                                M += " ui-datepicker-group-middle", S = ""
                        }
                        M += "'>"
                    }
                    for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + S + "'>" + (/all|left/.test(S) && 0 === k ? Y ? n : s : "") + (/all|right/.test(S) && 0 === k ? Y ? s : n : "") + this._generateMonthYearHeader(e, Z, et, X, $, k > 0 || D > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", N = d ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", x = 0; 7 > x; x++) C = (x + u) % 7, N += "<th scope='col'" + ((x + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + c[C] + "'>" + p[C] + "</span></th>";
                    for (M += N + "</tr></thead><tbody>", A = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, A)), I = (this._getFirstDayOfMonth(et, Z) - u + 7) % 7, P = Math.ceil((I + A) / 7), F = G ? this.maxRows > P ? this.maxRows : P : P, this.maxRows = F, H = this._daylightSavingAdjust(new Date(et, Z, 1 - I)), z = 0; F > z; z++) {
                        for (M += "<tr>", j = d ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(H) + "</td>" : "", x = 0; 7 > x; x++) E = g ? g.apply(e.input ? e.input[0] : null, [H]) : [!0, ""], O = H.getMonth() !== Z, L = O && !y || !E[0] || X && X > H || $ && H > $, j += "<td class='" + ((x + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (O ? " ui-datepicker-other-month" : "") + (H.getTime() === T.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === H.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (O && !v ? "" : " " + E[1] + (H.getTime() === Q.getTime() ? " " + this._currentClass : "") + (H.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + (O && !v || !E[2] ? "" : " title='" + E[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (O && !v ? "&#xa0;" : L ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === R.getTime() ? " ui-state-highlight" : "") + (H.getTime() === Q.getTime() ? " ui-state-active" : "") + (O ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>", H.setDate(H.getDate() + 1), H = this._daylightSavingAdjust(H);
                        M += j + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, et++), M += "</tbody></table>" + (G ? "</div>" + (V[0] > 0 && D === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), w += M
                }
                _ += w
            }
            return _ += l, e._keyEvent = !1, _
        },
        _generateMonthYearHeader: function(e, t, i, s, a, n, r, o) {
            var h, l, u, d, c, p, f, m, g = this._get(e, "changeMonth"),
                v = this._get(e, "changeYear"),
                y = this._get(e, "showMonthAfterYear"),
                b = "<div class='ui-datepicker-title'>",
                _ = "";
            if (n || !g) _ += "<span class='ui-datepicker-month'>" + r[t] + "</span>";
            else {
                for (h = s && s.getFullYear() === i, l = a && a.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!h || u >= s.getMonth()) && (!l || a.getMonth() >= u) && (_ += "<option value='" + u + "'" + (u === t ? " selected='selected'" : "") + ">" + o[u] + "</option>");
                _ += "</select>"
            }
            if (y || (b += _ + (!n && g && v ? "" : "&#xa0;")), !e.yearshtml)
                if (e.yearshtml = "", n || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (d = this._get(e, "yearRange").split(":"), c = (new Date).getFullYear(), p = function(e) {
                            var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? c + parseInt(e, 10) : parseInt(e, 10);
                            return isNaN(t) ? c : t
                        }, f = p(d[0]), m = Math.max(f, p(d[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = a ? Math.min(m, a.getFullYear()) : m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) e.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null
                }
            return b += this._get(e, "yearSuffix"), y && (b += (!n && g && v ? "" : "&#xa0;") + _), b += "</div>"
        },
        _adjustInstDate: function(e, t, i) {
            var s = e.drawYear + ("Y" === i ? t : 0),
                a = e.drawMonth + ("M" === i ? t : 0),
                n = Math.min(e.selectedDay, this._getDaysInMonth(s, a)) + ("D" === i ? t : 0),
                r = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s, a, n)));
            e.selectedDay = r.getDate(), e.drawMonth = e.selectedMonth = r.getMonth(), e.drawYear = e.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e)
        },
        _restrictMinMax: function(e, t) {
            var i = this._getMinMaxDate(e, "min"),
                s = this._getMinMaxDate(e, "max"),
                a = i && i > t ? i : t;
            return s && a > s ? s : a
        },
        _notifyChange: function(e) {
            var t = this._get(e, "onChangeMonthYear");
            t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function(e) {
            var t = this._get(e, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(e, t) {
            return this._determineDate(e, this._get(e, t + "Date"), null)
        },
        _getDaysInMonth: function(e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function(e, t) {
            return new Date(e, t, 1).getDay()
        },
        _canAdjustMonth: function(e, t, i, s) {
            var a = this._getNumberOfMonths(e),
                n = this._daylightSavingAdjust(new Date(i, s + (0 > t ? t : a[0] * a[1]), 1));
            return 0 > t && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())), this._isInRange(e, n)
        },
        _isInRange: function(e, t) {
            var i, s, a = this._getMinMaxDate(e, "min"),
                n = this._getMinMaxDate(e, "max"),
                r = null,
                o = null,
                h = this._get(e, "yearRange");
            return h && (i = h.split(":"), s = (new Date).getFullYear(), r = parseInt(i[0], 10), o = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += s), i[1].match(/[+\-].*/) && (o += s)), (!a || t.getTime() >= a.getTime()) && (!n || t.getTime() <= n.getTime()) && (!r || t.getFullYear() >= r) && (!o || o >= t.getFullYear())
        },
        _getFormatConfig: function(e) {
            var t = this._get(e, "shortYearCutoff");
            return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                shortYearCutoff: t,
                dayNamesShort: this._get(e, "dayNamesShort"),
                dayNames: this._get(e, "dayNames"),
                monthNamesShort: this._get(e, "monthNamesShort"),
                monthNames: this._get(e, "monthNames")
            }
        },
        _formatDate: function(e, t, i, s) {
            t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
            var a = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(s, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return this.formatDate(this._get(e, "dateFormat"), a, this._getFormatConfig(e))
        }
    }), e.fn.datepicker = function(t) {
        if (!this.length) return this;
        e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
        }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
    }, e.datepicker = new a, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.11.2", e.datepicker
});




/* 09)--------------------------------------------------------------
/*!
 * Isotope PACKAGED v2.0.0
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function n(e, i) {
            t.fn[e] = function(n) {
                if ("string" == typeof n) {
                    for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
                        var p = this[a],
                            h = t.data(p, e);
                        if (h)
                            if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
                                var f = h[n].apply(h, s);
                                if (void 0 !== f) return f
                            } else r("no such method '" + n + "' for " + e + " instance");
                        else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var o = t.data(this, e);
                    o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
                })
            }
        }
        if (t) {
            var r = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), n(t, e)
            }, t.bridget
        }
    }
    var o = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery)
})(window),
function(t) {
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        o = function() {};
    i.addEventListener ? o = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (o = function(t, i, o) {
        t[i + o] = o.handleEvent ? function() {
            var i = e(t);
            o.handleEvent.call(o, i)
        } : function() {
            var i = e(t);
            o.call(t, i)
        }, t.attachEvent("on" + i, t[i + o])
    });
    var n = function() {};
    i.removeEventListener ? n = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (n = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (o) {
            t[e + i] = void 0
        }
    });
    var r = {
        bind: o,
        unbind: n
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function(t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== n.readyState;
        if (!e.isReady && !i) {
            e.isReady = !0;
            for (var o = 0, s = r.length; s > o; o++) {
                var a = r[o];
                a()
            }
        }
    }

    function o(o) {
        return o.bind(n, "DOMContentLoaded", i), o.bind(n, "readystatechange", i), o.bind(t, "load", i), e
    }
    var n = t.document,
        r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], o)) : t.docReady = o(t.eventie)
}(this),
function() {
    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var o = t.prototype,
        n = this,
        r = n.EventEmitter;
    o.getListeners = function(t) {
        var e, i, o = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
        } else e = o[t] || (o[t] = []);
        return e
    }, o.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, o.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, o.addListener = function(t, i) {
        var o, n = this.getListenersAsObject(t),
            r = "object" == typeof i;
        for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
            listener: i,
            once: !1
        });
        return this
    }, o.on = i("addListener"), o.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, o.once = i("addOnceListener"), o.defineEvent = function(t) {
        return this.getListeners(t), this
    }, o.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, o.removeListener = function(t, i) {
        var o, n, r = this.getListenersAsObject(t);
        for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
        return this
    }, o.off = i("removeListener"), o.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, o.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, o.manipulateListeners = function(t, e, i) {
        var o, n, r = t ? this.removeListener : this.addListener,
            s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--;) r.call(this, e, i[o]);
        else
            for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
        return this
    }, o.removeEvent = function(t) {
        var e, i = typeof t,
            o = this._getEvents();
        if ("string" === i) delete o[t];
        else if (t instanceof RegExp)
            for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this
    }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
        var i, o, n, r, s = this.getListenersAsObject(t);
        for (n in s)
            if (s.hasOwnProperty(n))
                for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, o.trigger = i("emitEvent"), o.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, o.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, o._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, o._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return n.EventEmitter = r, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof o[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, n = 0, r = i.length; r > n; n++)
                    if (e = i[n] + t, "string" == typeof o[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            o = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t) {
        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function i() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = s.length; i > e; e++) {
                var o = s[e];
                t[o] = 0
            }
            return t
        }

        function o(t) {
            function o(t) {
                if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var o = r(t);
                    if ("none" === o.display) return i();
                    var n = {};
                    n.width = t.offsetWidth, n.height = t.offsetHeight;
                    for (var h = n.isBorderBox = !(!p || !o[p] || "border-box" !== o[p]), f = 0, c = s.length; c > f; f++) {
                        var d = s[f],
                            l = o[d];
                        l = a(t, l);
                        var y = parseFloat(l);
                        n[d] = isNaN(y) ? 0 : y
                    }
                    var m = n.paddingLeft + n.paddingRight,
                        g = n.paddingTop + n.paddingBottom,
                        v = n.marginLeft + n.marginRight,
                        _ = n.marginTop + n.marginBottom,
                        I = n.borderLeftWidth + n.borderRightWidth,
                        L = n.borderTopWidth + n.borderBottomWidth,
                        z = h && u,
                        S = e(o.width);
                    S !== !1 && (n.width = S + (z ? 0 : m + I));
                    var b = e(o.height);
                    return b !== !1 && (n.height = b + (z ? 0 : g + L)), n.innerWidth = n.width - (m + I), n.innerHeight = n.height - (g + L), n.outerWidth = n.width + v, n.outerHeight = n.height + _, n
                }
            }

            function a(t, e) {
                if (n || -1 === e.indexOf("%")) return e;
                var i = t.style,
                    o = i.left,
                    r = t.runtimeStyle,
                    s = r && r.left;
                return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = o, s && (r.left = s), e
            }
            var u, p = t("boxSizing");
            return function() {
                if (p) {
                    var t = document.createElement("div");
                    t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[p] = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(t);
                    var o = r(t);
                    u = 200 === e(o.width), i.removeChild(t)
                }
            }(), o
        }
        var n = t.getComputedStyle,
            r = n ? function(t) {
                return n(t, null)
            } : function(t) {
                return t.currentStyle
            },
            s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("get-style-property")) : t.getSize = o(t.getStyleProperty)
    }(window),
    function(t, e) {
        function i(t, e) {
            return t[a](e)
        }

        function o(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function n(t, e) {
            o(t);
            for (var i = t.parentNode.querySelectorAll(e), n = 0, r = i.length; r > n; n++)
                if (i[n] === t) return !0;
            return !1
        }

        function r(t, e) {
            return o(t), i(t, e)
        }
        var s, a = function() {
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0, o = t.length; o > i; i++) {
                var n = t[i],
                    r = n + "MatchesSelector";
                if (e[r]) return r
            }
        }();
        if (a) {
            var u = document.createElement("div"),
                p = i(u, "div");
            s = p ? i : r
        } else s = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return s
        }) : window.matchesSelector = s
    }(this, Element.prototype),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function o(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }

        function n(t, n, r) {
            function a(t, e) {
                t && (this.element = t, this.layout = e, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var u = r("transition"),
                p = r("transform"),
                h = u && p,
                f = !!r("perspective"),
                c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                }[u],
                d = ["transform", "transition", "transitionDuration", "transitionProperty"],
                l = function() {
                    for (var t = {}, e = 0, i = d.length; i > e; e++) {
                        var o = d[e],
                            n = r(o);
                        n && n !== o && (t[o] = n)
                    }
                    return t
                }();
            e(a.prototype, t.prototype), a.prototype._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, a.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, a.prototype.getSize = function() {
                this.size = n(this.element)
            }, a.prototype.css = function(t) {
                var e = this.element.style;
                for (var i in t) {
                    var o = l[i] || i;
                    e[o] = t[i]
                }
            }, a.prototype.getPosition = function() {
                var t = s(this.element),
                    e = this.layout.options,
                    i = e.isOriginLeft,
                    o = e.isOriginTop,
                    n = parseInt(t[i ? "left" : "right"], 10),
                    r = parseInt(t[o ? "top" : "bottom"], 10);
                n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
                var a = this.layout.size;
                n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
            }, a.prototype.layoutPosition = function() {
                var t = this.layout.size,
                    e = this.layout.options,
                    i = {};
                e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
            };
            var y = f ? function(t, e) {
                return "translate3d(" + t + "px, " + e + "px, 0)"
            } : function(t, e) {
                return "translate(" + t + "px, " + e + "px)"
            };
            a.prototype._transitionTo = function(t, e) {
                this.getPosition();
                var i = this.position.x,
                    o = this.position.y,
                    n = parseInt(t, 10),
                    r = parseInt(e, 10),
                    s = n === this.position.x && r === this.position.y;
                if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
                var a = t - i,
                    u = e - o,
                    p = {},
                    h = this.layout.options;
                a = h.isOriginLeft ? a : -a, u = h.isOriginTop ? u : -u, p.transform = y(a, u), this.transition({
                    to: p,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }, a.prototype.goTo = function(t, e) {
                this.setPosition(t, e), this.layoutPosition()
            }, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
                this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
            }, a.prototype._nonTransition = function(t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
            }, a.prototype._transition = function(t) {
                if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var o = this.element.offsetHeight;
                    o = null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            };
            var m = p && o(p) + ",opacity";
            a.prototype.enableTransition = function() {
                this.isTransitioning || (this.css({
                    transitionProperty: m,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(c, this, !1))
            }, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
                this.ontransitionend(t)
            }, a.prototype.onotransitionend = function(t) {
                this.ontransitionend(t)
            };
            var g = {
                "-webkit-transform": "transform",
                "-moz-transform": "transform",
                "-o-transform": "transform"
            };
            a.prototype.ontransitionend = function(t) {
                if (t.target === this.element) {
                    var e = this._transn,
                        o = g[t.propertyName] || t.propertyName;
                    if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                        var n = e.onEnd[o];
                        n.call(this), delete e.onEnd[o]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, a.prototype.disableTransition = function() {
                this.removeTransitionStyles(), this.element.removeEventListener(c, this, !1), this.isTransitioning = !1
            }, a.prototype._removeStyles = function(t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e)
            };
            var v = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return a.prototype.removeTransitionStyles = function() {
                this.css(v)
            }, a.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, a.prototype.remove = function() {
                if (!u || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
                var t = this;
                this.on("transitionEnd", function() {
                    return t.removeElem(), !0
                }), this.hide()
            }, a.prototype.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0
                })
            }, a.prototype.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var t = this.layout.options;
                this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: {
                        opacity: function() {
                            this.isHidden && this.css({
                                display: "none"
                            })
                        }
                    }
                })
            }, a.prototype.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, a
        }
        var r = t.getComputedStyle,
            s = r ? function(t) {
                return r(t, null)
            } : function(t) {
                return t.currentStyle
            };
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
    }(window),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === f.call(t)
        }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) {
            var i = d(e, t); - 1 !== i && e.splice(i, 1)
        }

        function r(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        }

        function s(i, s, f, d, l, y) {
            function m(t, i) {
                if ("string" == typeof t && (t = a.querySelector(t)), !t || !c(t)) return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
                this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
                var o = ++g;
                this.element.outlayerGUID = o, v[o] = this, this._create(), this.options.isInitLayout && this.layout()
            }
            var g = 0,
                v = {};
            return m.namespace = "outlayer", m.Item = y, m.defaults = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, e(m.prototype, f.prototype), m.prototype.option = function(t) {
                e(this.options, t)
            }, m.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, m.prototype.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }, m.prototype._itemize = function(t) {
                for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
                    var s = e[n],
                        a = new i(s, this);
                    o.push(a)
                }
                return o
            }, m.prototype._filterFindItemElements = function(t) {
                t = o(t);
                for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
                    var s = t[n];
                    if (c(s))
                        if (e) {
                            l(s, e) && i.push(s);
                            for (var a = s.querySelectorAll(e), u = 0, p = a.length; p > u; u++) i.push(a[u])
                        } else i.push(s)
                }
                return i
            }, m.prototype.getItemElements = function() {
                for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
                return t
            }, m.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, t), this._isLayoutInited = !0
            }, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function() {
                this.getSize()
            }, m.prototype.getSize = function() {
                this.size = d(this.element)
            }, m.prototype._getMeasurement = function(t, e) {
                var i, o = this.options[t];
                o ? ("string" == typeof o ? i = this.element.querySelector(o) : c(o) && (i = o), this[t] = i ? d(i)[e] : o) : this[t] = 0
            }, m.prototype.layoutItems = function(t, e) {
                t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
            }, m.prototype._getItemsForLayout = function(t) {
                for (var e = [], i = 0, o = t.length; o > i; i++) {
                    var n = t[i];
                    n.isIgnored || e.push(n)
                }
                return e
            }, m.prototype._layoutItems = function(t, e) {
                function i() {
                    o.emitEvent("layoutComplete", [o, t])
                }
                var o = this;
                if (!t || !t.length) return i(), void 0;
                this._itemsOn(t, "layout", i);
                for (var n = [], r = 0, s = t.length; s > r; r++) {
                    var a = t[r],
                        u = this._getItemLayoutPosition(a);
                    u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
                }
                this._processLayoutQueue(n)
            }, m.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, m.prototype._processLayoutQueue = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    this._positionItem(o.item, o.x, o.y, o.isInstant)
                }
            }, m.prototype._positionItem = function(t, e, i, o) {
                o ? t.goTo(e, i) : t.moveTo(e, i)
            }, m.prototype._postLayout = function() {
                this.resizeContainer()
            }, m.prototype.resizeContainer = function() {
                if (this.options.isResizingContainer) {
                    var t = this._getContainerSize();
                    t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
                }
            }, m.prototype._getContainerSize = h, m.prototype._setContainerMeasure = function(t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
                }
            }, m.prototype._itemsOn = function(t, e, i) {
                function o() {
                    return n++, n === r && i.call(s), !0
                }
                for (var n = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
                    var p = t[a];
                    p.on(e, o)
                }
            }, m.prototype.ignore = function(t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0)
            }, m.prototype.unignore = function(t) {
                var e = this.getItem(t);
                e && delete e.isIgnored
            }, m.prototype.stamp = function(t) {
                if (t = this._find(t)) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        this.ignore(o)
                    }
                }
            }, m.prototype.unstamp = function(t) {
                if (t = this._find(t))
                    for (var e = 0, i = t.length; i > e; e++) {
                        var o = t[e];
                        n(o, this.stamps), this.unignore(o)
                    }
            }, m.prototype._find = function(t) {
                return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0
            }, m.prototype._manageStamps = function() {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; e > t; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i)
                    }
                }
            }, m.prototype._getBoundingRect = function() {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
                }
            }, m.prototype._manageStamp = h, m.prototype._getElementOffset = function(t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    o = d(t),
                    n = {
                        left: e.left - i.left - o.marginLeft,
                        top: e.top - i.top - o.marginTop,
                        right: i.right - e.right - o.marginRight,
                        bottom: i.bottom - e.bottom - o.marginBottom
                    };
                return n
            }, m.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, m.prototype.bindResize = function() {
                this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
            }, m.prototype.unbindResize = function() {
                this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
            }, m.prototype.onresize = function() {
                function t() {
                    e.resize(), delete e.resizeTimeout
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var e = this;
                this.resizeTimeout = setTimeout(t, 100)
            }, m.prototype.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, m.prototype.needsResizeLayout = function() {
                var t = d(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth
            }, m.prototype.addItems = function(t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e
            }, m.prototype.appended = function(t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e))
            }, m.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
                }
            }, m.prototype.reveal = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.reveal()
                    }
            }, m.prototype.hide = function(t) {
                var e = t && t.length;
                if (e)
                    for (var i = 0; e > i; i++) {
                        var o = t[i];
                        o.hide()
                    }
            }, m.prototype.getItem = function(t) {
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    if (o.element === t) return o
                }
            }, m.prototype.getItems = function(t) {
                if (t && t.length) {
                    for (var e = [], i = 0, o = t.length; o > i; i++) {
                        var n = t[i],
                            r = this.getItem(n);
                        r && e.push(r)
                    }
                    return e
                }
            }, m.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (e && e.length) {
                    this._itemsOn(e, "remove", function() {
                        this.emitEvent("removeComplete", [this, e])
                    });
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        s.remove(), n(s, this.items)
                    }
                }
            }, m.prototype.destroy = function() {
                var t = this.element.style;
                t.height = "", t.position = "", t.width = "";
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var o = this.items[e];
                    o.destroy()
                }
                this.unbindResize(), delete this.element.outlayerGUID, p && p.removeData(this.element, this.constructor.namespace)
            }, m.data = function(t) {
                var e = t && t.outlayerGUID;
                return e && v[e]
            }, m.create = function(t, i) {
                function o() {
                    m.apply(this, arguments)
                }
                return Object.create ? o.prototype = Object.create(m.prototype) : e(o.prototype, m.prototype), o.prototype.constructor = o, o.defaults = e({}, m.defaults), e(o.defaults, i), o.prototype.settings = {}, o.namespace = t, o.data = m.data, o.Item = function() {
                    y.apply(this, arguments)
                }, o.Item.prototype = new y, s(function() {
                    for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, h = i.length; h > s; s++) {
                        var f, c = i[s],
                            d = c.getAttribute(n);
                        try {
                            f = d && JSON.parse(d)
                        } catch (l) {
                            u && u.error("Error parsing " + n + " on " + c.nodeName.toLowerCase() + (c.id ? "#" + c.id : "") + ": " + l);
                            continue
                        }
                        var y = new o(c, f);
                        p && p.data(c, t, y)
                    }
                }), p && p.bridget && p.bridget(t, o), o
            }, m.Item = y, m
        }
        var a = t.document,
            u = t.console,
            p = t.jQuery,
            h = function() {},
            f = Object.prototype.toString,
            c = "object" == typeof HTMLElement ? function(t) {
                return t instanceof HTMLElement
            } : function(t) {
                return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
            },
            d = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
    }(window),
    function(t) {
        function e(t) {
            function e() {
                t.Item.apply(this, arguments)
            }
            return e.prototype = new t.Item, e.prototype._create = function() {
                this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
            }, e.prototype.updateSortData = function() {
                if (!this.isIgnored) {
                    this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                    var t = this.layout.options.getSortData,
                        e = this.layout._sorters;
                    for (var i in t) {
                        var o = e[i];
                        this.sortData[i] = o(this.element, this)
                    }
                }
            }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window),
    function(t) {
        function e(t, e) {
            function i(t) {
                this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
            }
            return function() {
                function t(t) {
                    return function() {
                        return e.prototype[t].apply(this.isotope, arguments)
                    }
                }
                for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
                    var s = o[n];
                    i.prototype[s] = t(s)
                }
            }(), i.prototype.needsVerticalResizeLayout = function() {
                var e = t(this.isotope.element),
                    i = this.isotope.size && e;
                return i && e.innerHeight !== this.isotope.size.innerHeight
            }, i.prototype._getMeasurement = function() {
                this.isotope._getMeasurement.apply(this, arguments)
            }, i.prototype.getColumnWidth = function() {
                this.getSegmentSize("column", "Width")
            }, i.prototype.getRowHeight = function() {
                this.getSegmentSize("row", "Height")
            }, i.prototype.getSegmentSize = function(t, e) {
                var i = t + e,
                    o = "outer" + e;
                if (this._getMeasurement(i, o), !this[i]) {
                    var n = this.getFirstItemSize();
                    this[i] = n && n[o] || this.isotope.size["inner" + e]
                }
            }, i.prototype.getFirstItemSize = function() {
                var e = this.isotope.filteredItems[0];
                return e && e.element && t(e.element)
            }, i.prototype.layout = function() {
                this.isotope.layout.apply(this.isotope, arguments)
            }, i.prototype.getSize = function() {
                this.isotope.getSize(), this.size = this.isotope.size
            }, i.modes = {}, i.create = function(t, e) {
                function o() {
                    i.apply(this, arguments)
                }
                return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
            }, i
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window),
    function(t) {
        function e(t, e) {
            var o = t.create("masonry");
            return o.prototype._resetLayout = function() {
                this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
                var t = this.cols;
                for (this.colYs = []; t--;) this.colYs.push(0);
                this.maxY = 0
            }, o.prototype.measureColumns = function() {
                if (this.getContainerWidth(), !this.columnWidth) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = i && e(i).outerWidth || this.containerWidth
                }
                this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            }, o.prototype.getContainerWidth = function() {
                var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                    i = e(t);
                this.containerWidth = i && i.innerWidth
            }, o.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    o = e && 1 > e ? "round" : "ceil",
                    n = Math[o](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), u = {
                        x: this.columnWidth * a,
                        y: s
                    }, p = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = p;
                return u
            }, o.prototype._getColGroup = function(t) {
                if (2 > t) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                    var n = this.colYs.slice(o, o + t);
                    e[o] = Math.max.apply(Math, n)
                }
                return e
            }, o.prototype._manageStamp = function(t) {
                var i = e(t),
                    o = this._getElementOffset(t),
                    n = this.options.isOriginLeft ? o.left : o.right,
                    r = n + i.outerWidth,
                    s = Math.floor(n / this.columnWidth);
                s = Math.max(0, s);
                var a = Math.floor(r / this.columnWidth);
                a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
                for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(u, this.colYs[p])
            }, o.prototype._getContainerSize = function() {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = {
                    height: this.maxY
                };
                return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
            }, o.prototype._getContainerFitWidth = function() {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
                return (this.cols - t) * this.columnWidth - this.gutter
            }, o.prototype.needsResizeLayout = function() {
                var t = this.containerWidth;
                return this.getContainerWidth(), t !== this.containerWidth
            }, o
        }
        var i = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, o = t.length; o > i; i++) {
                var n = t[i];
                if (n === e) return i
            }
            return -1
        };
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
    }(window),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t, i) {
            var o = t.create("masonry"),
                n = o.prototype._getElementOffset,
                r = o.prototype.layout,
                s = o.prototype._getMeasurement;
            e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
            var a = o.prototype.measureColumns;
            o.prototype.measureColumns = function() {
                this.items = this.isotope.filteredItems, a.call(this)
            };
            var u = o.prototype._manageStamp;
            return o.prototype._manageStamp = function() {
                this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
            }, o
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : i(t.Isotope.LayoutMode, t.Masonry)
    }(window),
    function(t) {
        function e(t) {
            var e = t.create("fitRows");
            return e.prototype._resetLayout = function() {
                this.x = 0, this.y = 0, this.maxY = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize(), 0 !== this.x && t.size.outerWidth + this.x > this.isotope.size.innerWidth && (this.x = 0, this.y = this.maxY);
                var e = {
                    x: this.x,
                    y: this.y
                };
                return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += t.size.outerWidth, e
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.maxY
                }
            }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        function e(t) {
            var e = t.create("vertical", {
                horizontalAlignment: 0
            });
            return e.prototype._resetLayout = function() {
                this.y = 0
            }, e.prototype._getItemLayoutPosition = function(t) {
                t.getSize();
                var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                    i = this.y;
                return this.y += t.size.outerHeight, {
                    x: e,
                    y: i
                }
            }, e.prototype._getContainerSize = function() {
                return {
                    height: this.y
                }
            }, e
        }
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : e(t.Isotope.LayoutMode)
    }(window),
    function(t) {
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === h.call(t)
        }

        function o(t) {
            var e = [];
            if (i(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
            else e.push(t);
            return e
        }

        function n(t, e) {
            var i = f(e, t); - 1 !== i && e.splice(i, 1)
        }

        function r(t, i, r, u, h) {
            function f(t, e) {
                return function(i, o) {
                    for (var n = 0, r = t.length; r > n; n++) {
                        var s = t[n],
                            a = i.sortData[s],
                            u = o.sortData[s];
                        if (a > u || u > a) {
                            var p = void 0 !== e[s] ? e[s] : e,
                                h = p ? 1 : -1;
                            return (a > u ? 1 : -1) * h
                        }
                    }
                    return 0
                }
            }
            var c = t.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
            c.Item = u, c.LayoutMode = h, c.prototype._create = function() {
                this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
                for (var e in h.modes) this._initLayoutMode(e)
            }, c.prototype.reloadItems = function() {
                this.itemGUID = 0, t.prototype.reloadItems.call(this)
            }, c.prototype._itemize = function() {
                for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
                    var n = e[i];
                    n.id = this.itemGUID++
                }
                return this._updateItemsSortData(e), e
            }, c.prototype._initLayoutMode = function(t) {
                var i = h.modes[t],
                    o = this.options[t] || {};
                this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
            }, c.prototype.layout = function() {
                return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
            }, c.prototype._layout = function() {
                var t = this._getIsInstant();
                this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
            }, c.prototype.arrange = function(t) {
                this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
            }, c.prototype._init = c.prototype.arrange, c.prototype._getIsInstant = function() {
                var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                return this._isInstant = t, t
            }, c.prototype._filter = function(t) {
                function e() {
                    f.reveal(n), f.hide(r)
                }
                var i = this.options.filter;
                i = i || "*";
                for (var o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, u = t.length; u > a; a++) {
                    var p = t[a];
                    if (!p.isIgnored) {
                        var h = s(p);
                        h && o.push(p), h && p.isHidden ? n.push(p) : h || p.isHidden || r.push(p)
                    }
                }
                var f = this;
                return this._isInstant ? this._noTransition(e) : e(), o
            }, c.prototype._getFilterTest = function(t) {
                return s && this.options.isJQueryFiltering ? function(e) {
                    return s(e.element).is(t)
                } : "function" == typeof t ? function(e) {
                    return t(e.element)
                } : function(e) {
                    return r(e.element, t)
                }
            }, c.prototype.updateSortData = function(t) {
                this._getSorters(), t = o(t);
                var e = this.getItems(t);
                e = e.length ? e : this.items, this._updateItemsSortData(e)
            }, c.prototype._getSorters = function() {
                var t = this.options.getSortData;
                for (var e in t) {
                    var i = t[e];
                    this._sorters[e] = d(i)
                }
            }, c.prototype._updateItemsSortData = function(t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var o = t[e];
                    o.updateSortData()
                }
            };
            var d = function() {
                function t(t) {
                    if ("string" != typeof t) return t;
                    var i = a(t).split(" "),
                        o = i[0],
                        n = o.match(/^\[(.+)\]$/),
                        r = n && n[1],
                        s = e(r, o),
                        u = c.sortDataParsers[i[1]];
                    return t = u ? function(t) {
                        return t && u(s(t))
                    } : function(t) {
                        return t && s(t)
                    }
                }

                function e(t, e) {
                    var i;
                    return i = t ? function(e) {
                        return e.getAttribute(t)
                    } : function(t) {
                        var i = t.querySelector(e);
                        return i && p(i)
                    }
                }
                return t
            }();
            c.sortDataParsers = {
                parseInt: function(t) {
                    return parseInt(t, 10)
                },
                parseFloat: function(t) {
                    return parseFloat(t)
                }
            }, c.prototype._sort = function() {
                var t = this.options.sortBy;
                if (t) {
                    var e = [].concat.apply(t, this.sortHistory),
                        i = f(e, this.options.sortAscending);
                    this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
                }
            }, c.prototype._mode = function() {
                var t = this.options.layoutMode,
                    e = this.modes[t];
                if (!e) throw Error("No layout mode: " + t);
                return e.options = this.options[t], e
            }, c.prototype._resetLayout = function() {
                t.prototype._resetLayout.call(this), this._mode()._resetLayout()
            }, c.prototype._getItemLayoutPosition = function(t) {
                return this._mode()._getItemLayoutPosition(t)
            }, c.prototype._manageStamp = function(t) {
                this._mode()._manageStamp(t)
            }, c.prototype._getContainerSize = function() {
                return this._mode()._getContainerSize()
            }, c.prototype.needsResizeLayout = function() {
                return this._mode().needsResizeLayout()
            }, c.prototype.appended = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i = this._filterRevealAdded(e);
                    this.filteredItems = this.filteredItems.concat(i)
                }
            }, c.prototype.prepended = function(t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    this.items = e.concat(i), this._resetLayout(), this._manageStamps();
                    var o = this._filterRevealAdded(e);
                    this.layoutItems(i), this.filteredItems = o.concat(this.filteredItems)
                }
            }, c.prototype._filterRevealAdded = function(t) {
                var e = this._noTransition(function() {
                    return this._filter(t)
                });
                return this.layoutItems(e, !0), this.reveal(e), t
            }, c.prototype.insert = function(t) {
                var e = this.addItems(t);
                if (e.length) {
                    var i, o, n = e.length;
                    for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
                    var r = this._filter(e);
                    for (this._noTransition(function() {
                            this.hide(r)
                        }), i = 0; n > i; i++) e[i].isLayoutInstant = !0;
                    for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
                    this.reveal(r)
                }
            };
            var l = c.prototype.remove;
            return c.prototype.remove = function(t) {
                t = o(t);
                var e = this.getItems(t);
                if (l.call(this, t), e && e.length)
                    for (var i = 0, r = e.length; r > i; i++) {
                        var s = e[i];
                        n(s, this.filteredItems)
                    }
            }, c.prototype._noTransition = function(t) {
                var e = this.options.transitionDuration;
                this.options.transitionDuration = 0;
                var i = t.call(this);
                return this.options.transitionDuration = e, i
            }, c
        }
        var s = t.jQuery,
            a = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            u = document.documentElement,
            p = u.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            h = Object.prototype.toString,
            f = Array.prototype.indexOf ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var i = 0, o = t.length; o > i; i++)
                    if (t[i] === e) return i;
                return -1
            };
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], r) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window);


/* 10)--------------------------------------------------------------
 * Accordion
 * ----------------------------------------------------
 * Author: Themedo
 * Author URL: http://themeforest.net/user/themedo
 */
! function(c) {
    c.fn.themedo_accordion = function(a) {
        if (this.length > 1) return this.each(function() {
            c(this).themedo_accordion(a)
        }), this;
        var e = c.extend({
            animation: !0,
            showIcon: !0,
            closeAble: !1,
            closeOther: !0,
            slideSpeed: 150,
            activeIndex: !1
        }, a);
        c(this).data("close-able") && (e.closeAble = c(this).data("close-able")), c(this).data("animation") && (e.animation = c(this).data("animation")), c(this).data("show-icon") && (e.showIcon = c(this).data("show-icon")), c(this).data("close-other") && (e.closeOther = c(this).data("close-other")), c(this).data("slide-speed") && (e.slideSpeed = c(this).data("slide-speed")), c(this).data("active-index") && (e.activeIndex = c(this).data("active-index"));
        var i = this,
            n = function() {
                i.createStructure(), i.clickHead()
            };
        return this.createStructure = function() {
            i.addClass("td_accordion"), e.showIcon && i.addClass("acc_with_icon"), i.find(".accordion_in").length < 1 && i.children().addClass("accordion_in"), i.find(".accordion_in").each(function(a, e) {
                var i = c(e).children();
                c(i[0]).addClass("acc_head"), c(i[1]).addClass("acc_content")
            }), e.showIcon && i.find(".acc_head").prepend('<div class="acc_icon_expand"></div>'), i.find(".accordion_in .acc_content").not(".acc_active .acc_content").hide(), e.activeIndex === parseInt(e.activeIndex) && (0 === e.activeIndex ? (i.find(".accordion_in").addClass("acc_active").show(), i.find(".accordion_in .acc_content").addClass("acc_active").show()) : (i.find(".accordion_in").eq(e.activeIndex - 1).addClass("acc_active").show(), i.find(".accordion_in .acc_content").eq(e.activeIndex - 1).addClass("acc_active").show()))
        }, this.clickHead = function() {
            i.on("click", ".acc_head", function() {
                var a = c(this).parent();
                0 == a.hasClass("acc_active") && e.closeOther && (i.find(".acc_content").slideUp(e.slideSpeed), i.find(".accordion_in").removeClass("acc_active")), a.hasClass("acc_active") ? !1 !== e.closeAble && (a.children(".acc_content").slideUp(e.slideSpeed), a.removeClass("acc_active")) : (c(this).next(".acc_content").slideDown(e.slideSpeed), a.addClass("acc_active"))
            })
        }, n(), this
    }
}(jQuery);




// YTP player
function onYouTubePlayerAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}
var ytp = ytp || {};
! function(jQuery, ytp) {
    var nAgt = navigator.userAgent;
    if (!jQuery.browser) {
        jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
        if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
        else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
        else if (-1 != nAgt.indexOf("Trident")) {
            jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
            var start = nAgt.indexOf("rv:") + 3,
                end = start + 4;
            jQuery.browser.fullVersion = nAgt.substring(start, end)
        } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
    }
    jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.fn.CSSAnimate = function(a, b, c, d, e) {
        function f(a) {
            return a.replace(/([A-Z])/g, function(a) {
                return "-" + a.toLowerCase()
            })
        }

        function g(a, b) {
            return "string" != typeof a || a.match(/^[\-0-9\.]+$/) ? "" + a + b : a
        }
        return jQuery.support.CSStransition = function() {
            var a = (document.body || document.documentElement).style;
            return void 0 !== a.transition || void 0 !== a.WebkitTransition || void 0 !== a.MozTransition || void 0 !== a.MsTransition || void 0 !== a.OTransition
        }(), this.each(function() {
            var h = this,
                i = jQuery(this);
            h.id = h.id || "CSSA_" + (new Date).getTime();
            var j = j || {
                type: "noEvent"
            };
            if (h.CSSAIsRunning && h.eventType == j.type) h.CSSqueue = function() {
                i.CSSAnimate(a, b, c, d, e)
            };
            else if (h.CSSqueue = null, h.eventType = j.type, 0 !== i.length && a) {
                if (h.CSSAIsRunning = !0, "function" == typeof b && (e = b, b = jQuery.fx.speeds._default), "function" == typeof c && (e = c, c = 0), "function" == typeof d && (e = d, d = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof b)
                    for (var k in jQuery.fx.speeds) {
                        if (b == k) {
                            b = jQuery.fx.speeds[k];
                            break
                        }
                        b = jQuery.fx.speeds._default
                    }
                if (b || (b = jQuery.fx.speeds._default), jQuery.support.CSStransition) {
                    j = {
                        "default": "ease",
                        "in": "ease-in",
                        out: "ease-out",
                        "in-out": "ease-in-out",
                        snap: "cubic-bezier(0,1,.5,1)",
                        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                        easeInOutExpo: "cubic-bezier(1,0,0,1)",
                        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                        easeInSine: "cubic-bezier(.47,0,.745,.715)",
                        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                    }, j[d] && (d = j[d]);
                    var l = "",
                        m = "transitionEnd";
                    jQuery.browser.webkit ? (l = "-webkit-", m = "webkitTransitionEnd") : jQuery.browser.mozilla ? (l = "-moz-", m = "transitionend") : jQuery.browser.opera ? (l = "-o-", m = "otransitionend") : jQuery.browser.msie && (l = "-ms-", m = "msTransitionEnd"), j = [];
                    for (n in a) k = n, "transform" === k && (k = l + "transform", a[k] = a[n], delete a[n]), "filter" === k && (k = l + "filter", a[k] = a[n], delete a[n]), ("transform-origin" === k || "origin" === k) && (k = l + "transform-origin", a[k] = a[n], delete a[n]), "x" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " translateX(" + g(a[n], "px") + ")", delete a[n]), "y" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " translateY(" + g(a[n], "px") + ")", delete a[n]), "z" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " translateZ(" + g(a[n], "px") + ")", delete a[n]), "rotate" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " rotate(" + g(a[n], "deg") + ")", delete a[n]), "rotateX" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " rotateX(" + g(a[n], "deg") + ")", delete a[n]), "rotateY" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " rotateY(" + g(a[n], "deg") + ")", delete a[n]), "rotateZ" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " rotateZ(" + g(a[n], "deg") + ")", delete a[n]), "scale" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " scale(" + g(a[n], "") + ")", delete a[n]), "scaleX" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " scaleX(" + g(a[n], "") + ")", delete a[n]), "scaleY" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " scaleY(" + g(a[n], "") + ")", delete a[n]), "scaleZ" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " scaleZ(" + g(a[n], "") + ")", delete a[n]), "skew" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " skew(" + g(a[n], "deg") + ")", delete a[n]), "skewX" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " skewX(" + g(a[n], "deg") + ")", delete a[n]), "skewY" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " skewY(" + g(a[n], "deg") + ")", delete a[n]), "perspective" === k && (k = l + "transform", a[k] = a[k] || "", a[k] += " perspective(" + g(a[n], "px") + ")", delete a[n]), 0 > j.indexOf(k) && j.push(f(k));
                    var n = j.join(","),
                        o = function() {
                            i.off(m + "." + h.id), clearTimeout(h.timeout), i.css(l + "transition", ""), "function" == typeof e && e(i), h.called = !0, h.CSSAIsRunning = !1, "function" == typeof h.CSSqueue && (h.CSSqueue(), h.CSSqueue = null)
                        },
                        p = {};
                    jQuery.extend(p, a), p[l + "transition-property"] = n, p[l + "transition-duration"] = b + "ms", p[l + "transition-delay"] = c + "ms", p[l + "transition-style"] = "preserve-3d", p[l + "transition-timing-function"] = d, setTimeout(function() {
                        i.one(m + "." + h.id, o), i.css(p)
                    }, 1), h.timeout = setTimeout(function() {
                        i.called || !e ? (i.called = !1, h.CSSAIsRunning = !1) : (i.css(l + "transition", ""), e(i), h.CSSAIsRunning = !1, "function" == typeof h.CSSqueue && (h.CSSqueue(), h.CSSqueue = null))
                    }, b + c + 100)
                } else {
                    for (var n in a) "transform" === n && delete a[n], "filter" === n && delete a[n], "transform-origin" === n && delete a[n], "auto" === a[n] && delete a[n];
                    e && "string" != typeof e || (e = "linear"), i.animate(a, b, e)
                }
            }
        })
    };
    var getYTPVideoID = function(a) {
        var b, c;
        return a.indexOf("youtu.be") > 0 ? (b = a.substr(a.lastIndexOf("/") + 1, a.length), c = b.indexOf("?list=") > 0 ? b.substr(b.lastIndexOf("="), b.length) : null, b = c ? b.substr(0, b.lastIndexOf("?")) : b) : a.indexOf("http") > -1 ? (b = a.match(/[\\?&]v=([^&#]*)/)[1], c = a.indexOf("list=") > 0 ? a.match(/[\\?&]list=([^&#]*)/)[1] : null) : (b = a.length > 15 ? null : a, c = b ? null : a), {
            videoID: b,
            playlistID: c
        }
    };
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "2.8.1",
        author: "Matteo Bicocchi",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 100,
            addRaster: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnClick: !1,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            gaTrack: !0,
            optimizeDisplay: !0,
            onReady: function() {}
        },
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        locationProtocol: "https:",
        buildPlayer: function(options) {
            return this.each(function() {
                var YTPlayer = this,
                    $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 == property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function() {
                    var a = !1;
                    try {
                        self.location.href != top.location.href && (a = !0)
                    } catch (b) {
                        a = !0
                    }
                    return a
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1,
                    playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1;
                YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = {
                    autoplay: 0,
                    modestbranding: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: !0,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                document.createElement("video").canPlayType && jQuery.extend(playerVars, {
                    html5: 1
                }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1);
                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox"),
                    overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay");
                if (YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.opt.containment = "self" == YTPlayer.opt.containment ? jQuery(this) : jQuery(YTPlayer.opt.containment), YTPlayer.isBackground = "body" == YTPlayer.opt.containment.get(0).tagName.toLowerCase(), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    if (YTPlayer.canPlayOnMobile = isPlayer && 0 == jQuery(this).children().length, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide(), jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return $YTPlayer.remove(), void 0;
                    if (YTPlayer.opt.addRaster) {
                        var classN = "dot" == YTPlayer.opt.addRaster ? "raster-dot" : "raster";
                        overlay.addClass(YTPlayer.isRetina ? classN + " retina" : classN)
                    } else overlay.removeClass(function(a, b) {
                        var c = b.split(" "),
                            d = [];
                        return jQuery.each(c, function(a, b) {
                            /raster-.*/.test(b) && d.push(b)
                        }), d.push("retina"), d.join(" ")
                    });
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                    if (wrapper.css({
                            position: "absolute",
                            zIndex: 0,
                            minWidth: "100%",
                            minHeight: "100%",
                            left: 0,
                            top: 0,
                            overflow: "hidden",
                            opacity: 0
                        }), playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden"
                        }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function() {
                            "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                        }), YTPlayer.isBackground ? (jQuery("body").css({
                            boxSizing: "border-box"
                        }), wrapper.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 0,
                            webkitTransform: "translateZ(0)"
                        }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({
                            position: "relative"
                        }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({
                            opacity: 1
                        }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function() {
                            $YTPlayer.find(".mb_YTPBar").addClass("visible")
                        }).on("mouseleave", function() {
                            $YTPlayer.find(".mb_YTPBar").removeClass("visible")
                        }), ytp.YTAPIReady) setTimeout(function() {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100);
                    else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script></script>").attr({
                            src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/player_api?v=" + jQuery.mbYTPlayer.version,
                            id: "YTAPI"
                        });
                        jQuery("head title").after(tag)
                    }
                    jQuery(document).on("YTAPIReady", function() {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && YTPlayer.opt.stopMovieOnClick && jQuery(document).off("mousedown.ytplayer").on("mousedown.ytplayer", function(a) {
                            var b = jQuery(a.target);
                            (b.is("a") || b.parents().is("a")) && $YTPlayer.pauseYTP()
                        }), YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromFeed(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function() {
                            return YTPlayer.isInit ? void 0 : (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile ? (new YT.Player(playerID, {
                                videoId: YTPlayer.videoID.toString(),
                                height: "100%",
                                width: "100%",
                                videoId: YTPlayer.videoID,
                                events: {
                                    onReady: function(a) {
                                        YTPlayer.player = a.target, playerBox.css({
                                            opacity: 1
                                        }), YTPlayer.wrapper.css({
                                            opacity: YTPlayer.opt.opacity
                                        }), $YTPlayer.optimizeDisplay()
                                    },
                                    onStateChange: function() {}
                                }
                            }), void 0) : (new YT.Player(playerID, {
                                videoId: YTPlayer.videoID.toString(),
                                playerVars: playerVars,
                                events: {
                                    onReady: function(a) {
                                        if (YTPlayer.player = a.target, !YTPlayer.isReady) {
                                            YTPlayer.isReady = !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).on("resize.YTP", function() {
                                                $YTPlayer.optimizeDisplay()
                                            }), YTPlayer.opt.showControls && jQuery(YTPlayer).buildYTPControls();
                                            var b = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
                                            YTPlayer.player.setVolume(0), jQuery(YTPlayer).muteYTPVolume(), jQuery.mbYTPlayer.checkForState(YTPlayer), YTPlayer.checkForStartAt = setInterval(function() {
                                                if (!jQuery.contains(document, YTPlayer)) return jQuery(YTPlayer).playerDestroy(), void 0;
                                                var a = YTPlayer.player.getVideoLoadedFraction() > b / YTPlayer.player.getDuration();
                                                YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= b && a ? (clearInterval(YTPlayer.checkForStartAt), YTPlayer.player.setVolume(0), jQuery(YTPlayer).muteYTPVolume(), "function" == typeof YTPlayer.opt.onReady && YTPlayer.opt.onReady(YTPlayer), YTPlayer.opt.mute || jQuery(YTPlayer).unmuteYTP(), YTPlayer.player.pauseVideo(), setTimeout(function() {
                                                    YTPlayer.canTrigger = !0, YTPlayer.opt.autoPlay ? ($YTPlayer.playYTP(), $YTPlayer.css("background-image", "none"), YTPlayer.wrapper.CSSAnimate({
                                                        opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                                                    }, 2e3)) : YTPlayer.player.pauseVideo()
                                                }, 100)) : (YTPlayer.player.playVideo(), YTPlayer.player.seekTo(b, !0));
                                                var c = jQuery.Event("YTPReady");
                                                jQuery(YTPlayer).trigger(c)
                                            }, 1e3);
                                            var c = jQuery.Event("YTPUnstarted");
                                            c.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(c)
                                        }
                                    },
                                    onStateChange: function(event) {
                                        if ("function" == typeof event.target.getPlayerState) {
                                            var state = event.target.getPlayerState();
                                            if (YTPlayer.state != state) {
                                                YTPlayer.state = state;
                                                var controls = jQuery("#controlBar_" + YTPlayer.id),
                                                    eventType;
                                                switch (state) {
                                                    case -1:
                                                        eventType = "YTPUnstarted";
                                                        break;
                                                    case 0:
                                                        eventType = "YTPEnd";
                                                        break;
                                                    case 1:
                                                        eventType = "YTPStart", controls.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.videoTitle || YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.videoTitle || YTPlayer.videoID.toString());
                                                        break;
                                                    case 2:
                                                        eventType = "YTPPause", controls.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 3:
                                                        jQuery.browser.chrome || YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", jQuery.browser.chrome || YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), controls.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play), setTimeout(function() {
                                                            controls.show(1e3)
                                                        }, 2e3);
                                                        break;
                                                    case 5:
                                                        eventType = "YTPCued"
                                                }
                                                var YTPevent = jQuery.Event(eventType);
                                                YTPevent.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPevent)
                                            }
                                        }
                                    },
                                    onPlaybackQualityChange: function(a) {
                                        var b = a.target.getPlaybackQuality(),
                                            c = jQuery.Event("YTPQualityChange");
                                        c.quality = b, jQuery(YTPlayer).trigger(c)
                                    },
                                    onError: function(a) {
                                        150 == a.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == a.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, a)
                                    }
                                }
                            }), void 0))
                        }))
                    })
                }
            })
        },
        getDataFromFeed: function(a) {
            jQuery.browser.msie && jQuery.browser.version <= 9 ? ("auto" == a.opt.ratio ? a.opt.ratio = "16/9" : a.opt.ratio, a.hasData || (a.hasData = !0, setTimeout(function() {
                jQuery(a).trigger("YTPChanged")
            }, 100))) : (jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//gdata.youtube.com/feeds/api/videos/" + a.videoID + "?v=2&alt=jsonc", function(b) {
                a.dataReceived = !0, a.videoData = b.data, jQuery(a).trigger("YTPChanged");
                var e = jQuery.Event("YTPData");
                e.prop = {};
                for (var f in a.videoData) e.prop[f] = a.videoData[f];
                if (jQuery(a).trigger(e), a.videoTitle = a.videoData.title, "auto" == a.opt.ratio && (a.opt.ratio = a.videoData.aspectRatio && "widescreen" === a.videoData.aspectRatio ? "16/9" : "4/3"), !a.hasData && (a.hasData = !0, a.isPlayer)) {
                    var g = a.videoData.thumbnail.hqDefault;
                    a.opt.containment.css({
                        background: "rgba(0,0,0,0.5) url(" + g + ") center center",
                        backgroundSize: "cover"
                    })
                }
            }), setTimeout(function() {
                a.dataReceived || a.hasData || (a.hasData = !0, jQuery(a).trigger("YTPChanged"))
            }, 1500))
        },
        getVideoData: function() {
            var a = this.get(0);
            return a.videoData
        },
        getVideoID: function() {
            var a = this.get(0);
            return a.videoID || !1
        },
        setVideoQuality: function(a) {
            var b = this.get(0);
            jQuery.browser.chrome || b.player.setPlaybackQuality(a)
        },
        YTPlaylist: function(a, b, c) {
            var d = this.get(0);
            d.isPlayList = !0, b && (a = jQuery.shuffle(a)), d.videoID || (d.videos = a, d.videoCounter = 0, d.videoLength = a.length, jQuery(d).data("property", a[0]), jQuery(d).mb_YTPlayer()), "function" == typeof c && jQuery(d).on("YTPChanged", function() {
                c(d)
            }), jQuery(d).on("YTPEnd", function() {
                jQuery(d).playNext()
            })
        },
        playNext: function() {
            var a = this.get(0);
            a.videoCounter++, a.videoCounter >= a.videoLength && (a.videoCounter = 0), jQuery(a.playerEl).css({
                opacity: 0
            }), jQuery(a).changeMovie(a.videos[a.videoCounter])
        },
        playPrev: function() {
            var a = this.get(0);
            a.videoCounter--, a.videoCounter < 0 && (a.videoCounter = a.videoLength - 1), jQuery(a.playerEl).css({
                opacity: 0
            }), jQuery(a).changeMovie(a.videos[a.videoCounter])
        },
        changeMovie: function(a) {
            var b = this.get(0);
            b.opt.startAt = 0, b.opt.stopAt = 0, b.opt.mute = !0, a && jQuery.extend(b.opt, a), b.videoID = getYTPVideoID(b.opt.videoURL).videoID, jQuery(b).pauseYTP();
            var c = jQuery.browser.msie ? 1e3 : 0;
            jQuery(b.playerEl).CSSAnimate({
                opacity: 0
            }, c), setTimeout(function() {
                var a = jQuery.browser.chrome ? "default" : b.opt.quality;
                jQuery(b).getPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + b.videoID), 1, a), jQuery(b).playYTP(), jQuery(b).one("YTPStart", function() {
                    b.wrapper.CSSAnimate({
                        opacity: b.isAlone ? 1 : b.opt.opacity
                    }, 1e3), jQuery(b.playerEl).CSSAnimate({
                        opacity: 1
                    }, c), b.opt.startAt && b.player.seekTo(b.opt.startAt), jQuery.mbYTPlayer.checkForState(b), b.opt.autoPlay || jQuery(b).pauseYTP()
                }), b.opt.mute ? jQuery(b).muteYTPVolume() : jQuery(b).unmuteYTP()
            }, c), b.opt.addRaster ? b.overlay.addClass(b.isRetina ? "raster retina" : "raster") : b.overlay.removeClass("raster").removeClass("retina"), jQuery("#controlBar_" + b.id).remove(), b.opt.showControls && jQuery(b).buildYTPControls(), jQuery.mbYTPlayer.getDataFromFeed(b), jQuery(b).optimizeDisplay()
        },
        getPlayer: function() {
            return jQuery(this).get(0).player
        },
        playerDestroy: function() {
            var a = this.get(0);
            ytp.YTAPIReady = !1, ytp.backgroundIsInited = !1, a.isInit = !1, a.videoID = null;
            var b = a.wrapper;
            b.remove(), jQuery("#controlBar_" + a.id).remove(), clearInterval(a.checkForStartAt), clearInterval(a.getState)
        },
        fullscreen: function(real) {
            function RunPrefixMethod(a, b) {
                for (var e, f, c = ["webkit", "moz", "ms", "o", ""], d = 0; d < c.length && !a[e];) {
                    if (e = b, "" == c[d] && (e = e.substr(0, 1).toLowerCase() + e.substr(1)), e = c[d] + e, f = typeof a[e], "undefined" != f) return c = [c[d]], "function" == f ? a[e]() : a[e];
                    d++
                }
            }

            function launchFullscreen(a) {
                RunPrefixMethod(a, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }
            var YTPlayer = this.get(0);
            "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id),
                fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function() {
                    var a = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    a ? (jQuery(YTPlayer).setVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).setVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("fullscreen"), videoWrapper.CSSAnimate({
                        opacity: YTPlayer.opt.opacity
                    }, 500), videoWrapper.css({
                        zIndex: 0
                    }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            YTPlayer.isAlone ? (real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
                opacity: YTPlayer.opt.opacity
            }, 500), videoWrapper.css({
                zIndex: 0
            })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (real ? (videoWrapper.css({
                opacity: 0
            }), videoWrapper.addClass("fullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function() {
                videoWrapper.CSSAnimate({
                    opacity: 1
                }, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
            }, 500)) : videoWrapper.css({
                zIndex: 1e4
            }).CSSAnimate({
                opacity: 1
            }, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0)
        },
        playYTP: function() {
            var a = this.get(0);
            if ("undefined" != typeof a.player) {
                var b = jQuery("#controlBar_" + a.id),
                    c = b.find(".mb_YTPPlaypause");
                c.html(jQuery.mbYTPlayer.controls.pause), a.player.playVideo(), a.wrapper.CSSAnimate({
                    opacity: a.isAlone ? 1 : a.opt.opacity
                }, 2e3), jQuery(a).on("YTPStart", function() {
                    jQuery(a).css("background-image", "none")
                })
            }
        },
        toggleLoops: function() {
            var a = this.get(0),
                b = a.opt;
            1 == b.loop ? b.loop = 0 : (b.startAt ? a.player.seekTo(b.startAt) : a.player.playVideo(), b.loop = 1)
        },
        stopYTP: function() {
            var a = this.get(0),
                b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPPlaypause");
            c.html(jQuery.mbYTPlayer.controls.play), a.player.stopVideo()
        },
        pauseYTP: function() {
            var a = this.get(0);
            a.opt;
            var c = jQuery("#controlBar_" + a.id),
                d = c.find(".mb_YTPPlaypause");
            d.html(jQuery.mbYTPlayer.controls.play), a.player.pauseVideo()
        },
        seekToYTP: function(a) {
            var b = this.get(0);
            b.player.seekTo(a, !0)
        },
        setYTPVolume: function(a) {
            var b = this.get(0);
            a || b.opt.vol || 0 != b.player.getVolume() ? !a && b.player.getVolume() > 0 || a && b.player.getVolume() == a ? jQuery(b).muteYTPVolume() : b.opt.vol = a : jQuery(b).unmuteYTP(), b.player.setVolume(b.opt.vol)
        },
        muteYTP: function() {
            var a = this.get(0);
            a.player.mute(), a.player.setVolume(0);
            var b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPMuteUnmute");
            c.html(jQuery.mbYTPlayer.controls.unmute), jQuery(a).addClass("isMuted"), jQuery(a).trigger("YTPMuted")
        },
        unmuteYTP: function() {
            var a = this.get(0);
            a.player.unMute(), a.player.setVolume(a.opt.vol);
            var b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPMuteUnmute");
            c.html(jQuery.mbYTPlayer.controls.mute), jQuery(a).removeClass("isMuted"), jQuery(a).trigger("YTPUnmuted")
        },
        manageYTPProgress: function() {
            var a = this.get(0),
                b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPProgress"),
                d = b.find(".mb_YTPLoaded"),
                e = b.find(".mb_YTPseekbar"),
                f = c.outerWidth(),
                g = Math.floor(a.player.getCurrentTime()),
                h = Math.floor(a.player.getDuration()),
                i = g * f / h,
                j = 0,
                k = 100 * a.player.getVideoLoadedFraction();
            return d.css({
                left: j,
                width: k + "%"
            }), e.css({
                left: 0,
                width: i
            }), {
                totalTime: h,
                currentTime: g
            }
        },
        buildYTPControls: function() {
            var YTPlayer = this.get(0),
                data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                var controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                    whiteSpace: "noWrap",
                    position: YTPlayer.isBackground ? "fixed" : "absolute",
                    zIndex: YTPlayer.isBackground ? 1e4 : 1e3
                }).hide();
                YTPlayer.controlBar = controlBar;
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function() {
                        1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).pauseYTP() : jQuery(YTPlayer).playYTP()
                    }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function() {
                        0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).unmuteYTP() : jQuery(YTPlayer).muteYTP()
                    }),
                    idx = jQuery("<span/>").addClass("mb_YTPTime"),
                    vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function() {
                        window.open(vURL, "viewOnYT")
                    }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function() {
                        jQuery(YTPlayer).fullscreen(data.realfullscreen)
                    }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function(a) {
                        timeBar.css({
                            width: a.clientX - timeBar.offset().left
                        }), YTPlayer.timeW = a.clientX - timeBar.offset().left, controlBar.find(".mb_YTPLoaded").css({
                            width: 0
                        });
                        var b = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer.goto = timeBar.outerWidth() * b / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), !0), controlBar.find(".mb_YTPLoaded").css({
                            width: 0
                        })
                    }),
                    loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(controlBar) : (controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(controlBar))
            }
        },
        checkForState: function(YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 10 : 1e3;
            clearInterval(YTPlayer.getState), YTPlayer.getState = setInterval(function() {
                if (!jQuery.contains(document, YTPlayer)) return jQuery(YTPlayer).playerDestroy(), void 0;
                var prog = jQuery(YTPlayer).manageYTPProgress(),
                    $YTPlayer = jQuery(YTPlayer),
                    controlBar = jQuery("#controlBar_" + YTPlayer.id),
                    data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1,
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.player.time != prog.currentTime) {
                    var YTPevent = jQuery.Event("YTPTime");
                    YTPevent.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPevent)
                }
                if (YTPlayer.player.time = prog.currentTime, 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.playYTP()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.pauseYTP())), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 3) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function() {
                            YTPlayer.isEnded = !1
                        }, 2e3), YTPlayer.isPlayList) {
                        clearInterval(YTPlayer.getState);
                        var YTPEnd = jQuery.Event("YTPEnd");
                        return YTPEnd.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPEnd), void 0
                    }
                    data.loop ? YTPlayer.player.seekTo(startAt, !0) : (YTPlayer.player.pauseVideo(), YTPlayer.wrapper.CSSAnimate({
                        opacity: 0
                    }, 1e3, function() {
                        var a = jQuery.Event("YTPEnd");
                        if (a.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(a), YTPlayer.player.seekTo(startAt, !0), !YTPlayer.isBackground) {
                            var b = YTPlayer.videoData.thumbnail.hqDefault;
                            jQuery(YTPlayer).css({
                                background: "rgba(0,0,0,0.5) url(" + b + ") center center",
                                backgroundSize: "cover"
                            })
                        }
                    }))
                }
            }, interval)
        },
        formatTime: function(a) {
            var b = Math.floor(a / 60),
                c = Math.floor(a - 60 * b);
            return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c)
        }
    }, jQuery.fn.toggleVolume = function() {
        var a = this.get(0);
        if (a) return a.player.isMuted() ? (jQuery(a).unmuteYTP(), !0) : (jQuery(a).muteYTP(), !1)
    }, jQuery.fn.optimizeDisplay = function() {
        var a = this.get(0),
            b = a.opt,
            c = jQuery(a.playerEl),
            d = {},
            e = a.wrapper;
        d.width = e.outerWidth(), d.height = e.outerHeight();
        var f = 24,
            g = 100,
            h = {};
        b.optimizeDisplay ? (h.width = d.width + d.width * f / 100, h.height = "16/9" == b.ratio ? Math.ceil(9 * d.width / 16) : Math.ceil(3 * d.width / 4), h.marginTop = -((h.height - d.height) / 2), h.marginLeft = -(d.width * (f / 2) / 100), h.height < d.height && (h.height = d.height + d.height * f / 100, h.width = "16/9" == b.ratio ? Math.floor(16 * d.height / 9) : Math.floor(4 * d.height / 3), h.marginTop = -(d.height * (f / 2) / 100), h.marginLeft = -((h.width - d.width) / 2)), h.width += g, h.height += g, h.marginTop -= g / 2, h.marginLeft -= g / 2) : (h.width = "100%", h.height = "100%", h.marginTop = 0, h.marginLeft -= 0), c.css({
            width: h.width,
            height: h.height,
            marginTop: h.marginTop,
            marginLeft: h.marginLeft
        })
    }, jQuery.shuffle = function(a) {
        for (var b = a.slice(), c = b.length, d = c; d--;) {
            var e = parseInt(Math.random() * c),
                f = b[d];
            b[d] = b[e], b[e] = f
        }
        return b
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.YTPlaylist, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildYTPControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.playYTP, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stopYTP, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pauseYTP, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekToYTP, jQuery.fn.muteYTP = jQuery.mbYTPlayer.muteYTP, jQuery.fn.unmuteYTP = jQuery.mbYTPlayer.unmuteYTP, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setYTPVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageYTPProgress, jQuery.fn.getDataFromFeed = jQuery.mbYTPlayer.getVideoData, jQuery.fn.mb_YTPlayer = jQuery.fn.YTPlayer, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.muteYTP, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmuteYTP
}(jQuery, ytp);



/* 10. fitvids */
(function($) {
    "use strict";
    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById('fit-vids-style')) {
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement('div');
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1])
        }
        if (options) {
            $.extend(settings, options)
        }
        return this.each(function() {
            var selectors = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            if (settings.customSelector) {
                selectors.push(settings.customSelector)
            }
            var ignoreList = '.fitvidsignore';
            if (settings.ignore) {
                ignoreList = ignoreList + ', ' + settings.ignore
            }
            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not("object object");
            $allVideos = $allVideos.not(ignoreList);
            $allVideos.each(function() {
                var $this = $(this);
                if ($this.parents(ignoreList).length > 0) {
                    return
                }
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return
                }
                if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);
                    $this.attr('width', 16)
                }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
                    $this.attr('id', videoID)
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width')
            })
        })
    }
})(window.jQuery || window.Zepto); //