(function ($) {
	$.fn.collapsible = function (customOptions) {     
        var options = {
			collapsed: false,
			heading: ">:header,>legend",
			expandDuration: "fast",
			iconCollapsed: "ui-icon-plus",
			iconExpanded: "ui-icon-plus",
			iconPosition: "right"
		};
        options = $.extend(options, customOptions);

        return this.each(function (i) {
			var $el = $(this),
				collapsibleContain = $el.addClass("ui-collapsible-contain"),
				collapsibleHeading = $el.find(options.heading).eq(0),
				collapsibleContent = collapsibleContain.wrapInner("<div class='ui-collapsible-content'></div>").find(".ui-collapsible-content");

			collapsibleHeading
				.insertBefore(collapsibleContent)		
				.wrapInner('<span class="ui-button-inner" />')
				.addClass("ui-collapsible-heading")
				.addClass((options.iconPosition === "right") ? "ui-btn-icon-right" : "ui-btn-icon-left")
				.append( "<span class='ui-icon'></span>" )
				.wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>");
			
			collapsibleContain
				.bind("collapse", function(event, duration) {
					duration = duration ? duration : options.expandDuration;
					if (!event.isDefaultPrevented() && $(event.target).closest(".ui-collapsible-contain").is(collapsibleContain)) {
						event.preventDefault();

						collapsibleHeading.removeClass("ui-collapsible-heading-expanded").addClass("ui-collapsible-heading-collapsed");
						collapsibleHeading.find(".ui-icon").removeClass(options.iconExpanded).addClass(options.iconCollapsed);
						
						collapsibleContent
							.addClass("ui-collapsible-content-collapsed").attr( "aria-hidden", true )
							.slideUp(duration);
						$el.data('uiCollapsed', true);
					}
				})
				.bind("expand", function(event, duration) {
					duration = duration ? duration : options.expandDuration;

					if (!event.isDefaultPrevented()) {
						event.preventDefault();

						collapsibleHeading.removeClass("ui-collapsible-heading-collapsed").addClass("ui-collapsible-heading-expanded");
						collapsibleHeading.find(".ui-icon").removeClass(options.iconCollapsed).addClass(options.iconExpanded);

						collapsibleContent
							.removeClass("ui-collapsible-content-collapsed").attr("aria-hidden", false)
							.slideDown(options.expandDuration);
						
						$el.data('uiCollapsed', false);
					}
				})
				.trigger( options.collapsed ? "collapse" : "expand", 0 );
			
			collapsibleHeading
				.bind( "click", function(event) {
					var type = collapsibleHeading.is(".ui-collapsible-heading-collapsed") ? "expand" : "collapse";
					collapsibleContain.trigger(type);
					event.preventDefault();
				});		
		});
	};

})(jQuery);