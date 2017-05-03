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
    v0.3
*/

var jboo = {version: 0.3};

Element.prototype.inject = function(where) {
    $(this).appendTo(where);
    return this;
};

Element.prototype.adopt = function() {
    for (var arg in arguments) {
        $(this).append(arguments[arg]);
    }
    return this;
};

if (typeof(jQuery) != 'undefined'){
    jQuery.fn.extend({
        'inject': function(target){
            $(this[0]).appendTo(target);
        },
        'adopt': function(target){
            $(this[0]).append(target);
        }
    })
}

Function.prototype.bind = function(obj){
    var slice = [].slice,
        args = slice.call(arguments, 1),
        self = this,
        nop = function(){},
        bound = function(){
            return self.apply(this instanceof nop ? this : (obj || {}),
                args.concat(slice.call(arguments)));
        };
    bound.prototype = this.prototype;
    return bound;
};

var Class = (function(obj){
    var fn = (function(){
        if (typeof(fn.initialize) == 'function'){
            fn.initialize.apply(this, arguments);
        }
        for (var o in obj){
            this[o] = obj[o];
        }
    });
    fn.setOptions = function(options){
        if (!fn.options){
            fn.options = {};
        }
        for (var opt in options){
            fn.options[opt] = options[opt];
        }
    };
    for (var o in obj){
        fn[o] = obj[o];
    }
    return fn;
});

var Element = function(tag, obj){
    var el = document.createElement(tag);
    for (var o in obj){
        if (o == 'styles') {
            var styles = '';
            for (var s in obj[o]){
                var v = obj[o][s];
                if (['z-index', 'opacity'].indexOf(s) == -1) {
                    if (!String(v).match(/%$/) && v == parseInt(v)) {
                        v += 'px';
                    }
                }
                styles += s + ':' + v + ';';
            }
            $(el).attr('style', styles);
        } else if (o == 'events'){
            for (var e in obj[o]){
                el.addEventListener(e, obj[o][e]);
            }
        } else if (o == 'text'){
            $(el).text(obj[o]);
        } else if (o == 'html'){
            $(el).html(obj[o]);
        } else {
            $(el).attr(o, obj[o]);
        }
    }
    return el;
};
