/*
 * MBP - Mobile boilerplate helper functions
 */

 
window.MBP = window.MBP || {}; 
 
// Hide URL Bar for iOS
// http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/

MBP.hideUrlBar = function () {
    /mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function () {
    window.scrollTo(0, 1);
    }, 1000);
}



// Plugins

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
log.history = log.history || [];   // store logs to an array for reference
log.history.push(arguments);
arguments.callee = arguments.callee.caller; 
if(this.console) console.log( Array.prototype.slice.call(arguments) );
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info, log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

// jQuery/helper plugins

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
 
;(function($) {

    var isInputSupported = 'placeholder' in document.createElement('input'),
        isTextareaSupported = 'placeholder' in document.createElement('textarea');
    if (isInputSupported && isTextareaSupported) {
        $.fn.placeholder = function() {
            return this;
        };
        $.fn.placeholder.input = $.fn.placeholder.textarea = true;
    } else {
        $.fn.placeholder = function() {
            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .bind('focus.placeholder', clearPlaceholder)
                .bind('blur.placeholder', setPlaceholder)
            .trigger('blur.placeholder').end();
        };
        $.fn.placeholder.input = isInputSupported;
        $.fn.placeholder.textarea = isTextareaSupported;
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {},
            rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder() {
        var $input = $(this);
        if ($input.val() === $input.attr('placeholder') && $input.hasClass('placeholder')) {
            if ($input.data('placeholder-password')) {
                $input.hide().next().attr('id', $input.removeAttr('id').data('placeholder-id')).show().focus();
            } else {
                $input.val('').removeClass('placeholder');
            }
        }
    }

    function setPlaceholder(elem) {
        var $replacement,
            $input = $(this),
            $origInput = $input,
            id = this.id;
        if ($input.val() === '') {
            if ($input.is(':password')) {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({ type: 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { type: 'text' }));
                    }
                    $replacement
                        .removeAttr('name')
                        // We could just use the `.data(obj)` syntax here, but that wouldn’t work in pre-1.4.3 jQueries
                        .data('placeholder-password', true)
                        .data('placeholder-id', id)
                        .bind('focus.placeholder', clearPlaceholder);
                    $input
                        .data('placeholder-textinput', $replacement)
                        .data('placeholder-id', id)
                        .before($replacement);
                }
                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
            }
            $input.addClass('placeholder').val($input.attr('placeholder'));
        } else {
            $input.removeClass('placeholder');
        }
    }

    $(function() {
        // Look for forms
        $('form').bind('submit.placeholder', function() {
            // Clear the placeholder values so they don’t get submitted
            var $inputs = $('.placeholder', this).each(clearPlaceholder);
            setTimeout(function() {
                $inputs.each(setPlaceholder);
            }, 10);
        });
    });

    // Clear placeholder values upon page reload
    $(window).bind('unload.placeholder', function() {
        $('.placeholder').val('');
    });

}(jQuery));


/*
* matchMedia() polyfill - test whether a CSS media type or media query applies
* authors: Scott Jehl, Paul Irish, Nicholas Zakas
* Copyright (c) 2011 Scott, Paul and Nicholas.
* Dual MIT/BSD license
*/


window.matchMedia = window.matchMedia || (function(doc, undefined){
  
  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement('body'),
      div      = doc.createElement('div');
  
  div.id = 'mq-test-1';
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.appendChild(div);
  
  return function(q){
    
    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
    
    docElem.insertBefore(fakeBody, refNode);
    bool = div.offsetWidth == 42;  
    docElem.removeChild(fakeBody);
    
    return { matches: bool, media: q };
  };
  
})(document);
