/**
 *  5-29-2014 Neal Shannon Cruey
 *  https://github.com/shannoncruey/jquery.tutorme
 *
 *  A framework for adding a tutorial overlay to a web page.
 *
 **/

$.tutorme = {
	id : "tutorme",
	init : function(options) {
		// if the tutorial_id is defined in the options.
		if (options.id) {
			this.id += "_" + options.id;
		}

		var $tut = $('<div id="' + this.id + '" class="hidden tutorme"></div>');

		// bind keydown events
		$(document).on("keydown.tutorme", function(e) {
			if (e.keyCode === 27) {// ESC
				e.preventDefault();
				$tut.hide();
			}
		});

		// the close button
		$tut.append('<div id="' + this.id + '-close" class="tutorme-close">X</div>');
		$("#" + $.tutorme.id + "-close").live("click", function() {
			$("#" + $.tutorme.id).hide()
		});

		// the overlay
		$tut.append('<div id="' + $.tutorme.id + '-overlay" class="tutorme-overlay"></div>');

		// this is the page title
		// THE ABSOLUTE POSITIONING IS SCREWIG THINGS UP
		// THIS IS COVERING UP THE CLOSE BUTTON
		//$tut.append('<h2 id="tutorme-title">' + ((options.title) ? options.title : "") + '</h2>');

		$("body").append($tut);

	},
	addbubbles : function(bubbles) {
		$(bubbles).each(function(idx, bubble) {
			var $bbl = $('<div class="tutorme-bubble"><div class="tutorme-bubble-title"></div><div class="tutorme-bubble-text"></div></div>');

			// does it get an ID?
			if (bubble.id) {
				$bbl.attr("id", "tut_" + bubble.id);
			}

			// pages are nothing more than additional classes we stick on the bubble
			// that way the showpage and hidepage functions will know what do hide/show.
			if (bubble.pages) {
				$(bubble.pages).each(function(idx, pagename) {
					$bbl.addClass("tut_page_" + pagename);
				});
			}

			$bbl.find(".tutorme-bubble-title").text((bubble.title) ? bubble.title : "");
			$bbl.find(".tutorme-bubble-text").html((bubble.text) ? bubble.text : "");

			$bbl.css("width", ((bubble.width) ? bubble.width : undefined));

			// can we see it?
			if (bubble.hidden === true) {
				// all "hidden" bubbles get a special class.
				$bbl.addClass("tut_hidden");
				$bbl.hide();
			}

			// arrows?
			if (bubble.arrow) {
				switch (bubble.arrow) {
					case "left":
						$bbl.prepend('<div class="arrow-left" />');
						break;
					case "right":
						$bbl.append('<div class="arrow-right" />');
						break;
					case "up":
						$bbl.prepend('<div class="arrow-up" />');
						$bbl.find(".arrow-up").css("margin-left", (bubble.width / 2) - 20 + "px");
						break;
					case "down":
						$bbl.append('<div class="arrow-down" />');
						break;
				}

			}
			// attachTo coordinates
			var at = bubble.attachTo;
			if (at && at.length > 0) {
				switch (bubble.attachPosition) {
					case "topright":
						break;
					case "bottom":
						$bbl.css("top", at.offset().top + (at.height() + 20) + "px");
						$bbl.css("left", (at.offset().left + (at.width() / 2)) - (bubble.width - (at.width() / 2)) + "px");
						break;
					case "right":
						// in this case, if xPos or yPos were defined, they are interpreted as
						// a SHIFT from the attachTo element.
						var xShift = (bubble.xPos) ? bubble.xPos : 0;
						var yShift = (bubble.yPos) ? bubble.yPos : 0;
						
						$bbl.css("top", at.offset().top + yShift + "px");
						//();
						$bbl.css("left", (at.offset().left + at.outerWidth()) + xShift + "px");
						break;
					// case "over":
					// $bbl.css("top", at.offset().top + "px");
					// $bbl.css("left", at.offset().left + (at.width() / 2) - bubble.width + "px");
					// break;
					default:
						$bbl.css("top", at.offset().top + "px");
						$bbl.css("left", at.offset().left + "px");
				}
			} else {
				// no attachTo?  How about explicit coordinates?
				if (bubble.xPos) {
					$bbl.css("left", bubble.xPos + "px");
				}
				if (bubble.yPos) {
					$bbl.css("top", bubble.yPos + "px");
				}
			}
			// if clickThrough is enabled...
			if (bubble.onClick) {
				$bbl.css("cursor", "pointer");
				$bbl.click(bubble.onClick);
			}

			$("#" + $.tutorme.id).append($bbl);
		});
	},
	show : function() {
		$("#" + this.id).show();
	},
	hide : function() {
		$("#" + this.id).hide();
	},
	showbubble : function(id) {
		$("#tut_" + id).show();
	},
	hidebubble : function(id) {
		$("#tut_" + id).hide();
	},
	showpage : function(pagename) {
		// show all bubbles associated with a certain page.
		$(".tut_page_" + pagename).show();
	},
	hidepage : function(pagename) {
		// utility function to hide all "hidden" bubbles.
		$(".tut_page_" + pagename).hide();
	},
	hideallpages : function() {
		// utility function to hide all "hidden" bubbles.
		$("[class*=tut_page_]").hide();
	}
}
