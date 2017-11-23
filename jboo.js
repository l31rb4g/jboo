/*
     ▄█ ▀█████████▄   ▄██████▄   ▄██████▄
     ███   ███    ███ ███    ███ ███    ███
     ███   ███    ███ ███    ███ ███    ███
     ███  ▄███▄▄▄██▀  ███    ███ ███    ███
     ███ ▀▀███▀▀▀██▄  ███    ███ ███    ███
     ███   ███    ██▄ ███    ███ ███    ███
     ███   ███    ███ ███    ███ ███    ███
 █▄ ▄███ ▄█████████▀   ▀██████▀   ▀██████▀
 ▀▀▀▀▀▀
 -----------------------------------------------
 */

var jboo = {version: 0.5.1};

if (typeof(jQuery) === 'undefined'){
    console.error('jBoo: jQuery not loaded.');
} else {
    Function.prototype.bind = function (obj) {
        var slice = [].slice,
            args = slice.call(arguments, 1),
            self = this,
            nop = function () {},
            bound = function () {
                return self.apply(this instanceof nop ? this : (obj || {}),
                    args.concat(slice.call(arguments)));
            };
        bound.prototype = this.prototype;
        return bound;
    };

    $.fn.extend({
        inject: function(target) {
            this.appendTo(target);
            return this;
        },
        adopt: function() {
            for (var arg in arguments) {
                this.append(arguments[arg]);
            }
            return this;
        }
    });

    var Class = (function (obj) {
        var fn = (function () {
            for (var o in obj) {
                this[o] = obj[o];
            }
            this.setOptions = function (options) {
                if (!fn.options) {
                    fn.options = {};
                }
                for (var opt in options) {
                    fn.options[opt] = options[opt];
                }
            };
            if (typeof(fn.initialize) === 'function') {
                fn.initialize.apply(this, arguments);
            }
        });
        for (var o in obj) {
            fn[o] = obj[o];
        }
        return fn;
    });

    var Element = function (tag, obj) {
        var el = $(document.createElement(tag));
        for (var o in obj) {
            if (o === 'styles') {
                var styles = '';
                for (var s in obj[o]) {
                    var v = obj[o][s];
                    if (['z-index', 'opacity'].indexOf(s) === -1) {
                        if (!String(v).match(/%$/) && v == parseInt(v)) {
                            v += 'px';
                        }
                    }
                    styles += s + ':' + v + ';';
                }
                el.attr('style', styles);
            } else if (o === 'events') {
                for (var e in obj[o]) {
                    el[0].addEventListener(e, obj[o][e]);
                }
            } else if (o == 'text') {
                el.text(obj[o]);
            } else if (o == 'html') {
                el.html(obj[o]);
            } else {
                el.attr(o, obj[o]);
            }
        }
        return el;
    };
}
