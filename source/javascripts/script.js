$(function() {  
	
    var initMobileNavigation = function () {
        var $nav = $('nav[role="navigation"]'), 
            $navToggle = $('<div class="navtoggle"><a href="#navigation">Show Menu</div>');
            $navToggleLink = $navToggle.find('a').first();
        
        $nav.collapsible({collapsed: true});
        $navToggle.insertAfter($nav);

        $navToggle.click(function(event) {
            if($nav.data('ui-collapsed') === true) {
                $navToggleLink.text("Hide Menu");
                $nav.trigger('expand');
            } else {
                $navToggleLink.text("Show Menu");
                $nav.trigger('collapse');                
            }
            event.preventDefault();
        
        });    
    
    };   
    
    $('*[data-role="collapsible"]').collapsible({collapsed: true});

    if (window.matchMedia("(max-width: 760px)").matches) {  
        initMobileNavigation();
    }   
});


//scroll to top, hide address bar on mobile devices - 1 for android, 0 for the rest
//Credits: http://pastebin.com/LGk4xwME
(function( win ){
    var doc = win.document;
    
    // If there's a hash, or addEventListener is undefined, stop here
    if( !location.hash || !win.addEventListener ){
        
        //scroll to 1
        window.scrollTo( 0, 1 );
        var scrollTop = 1,
            getScrollTop = function(){
                return "scrollTop" in doc.body ? doc.body.scrollTop : 1;
            },
        
            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
                if( doc.body ){
                    clearInterval( bodycheck );
                    scrollTop = getScrollTop();
                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }   
            }, 15 );
        
        win.addEventListener( "load", function(){
            setTimeout(function(){
                //at load, if user hasn't scrolled more than 20 or so...
                if( getScrollTop() < 20 ){
                    //reset to hide addr bar at onload
                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 0);
        }, false );
    }
})(this);