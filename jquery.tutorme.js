/**
*  5-29-2014 Neal Shannon Cruey
*  https://github.com/shannoncruey/jquery.tutorme
*
*  A framework for adding a tutorial overlay to a web page.
*
**/

$.tutorme = {
	init : function(bubbles, options) {
		var $tut = $('<div id="tutorme" class="hidden tutorme"></div>');

		// bind keydown events
		$(document).on("keydown.tutorme", function(e) {
			if (e.keyCode === 27) {// ESC
				e.preventDefault();
				$tut.hide();
			}
		});

		// the close button
		$tut.append('<div id="tutorme-close">X</div>');
		$("#tutorme-close").live("click", function() {
			$("#tutorme").hide()
		});

		// the overlay
		$tut.append('<div id="tutorme-overlay"></div>');

		// this is the page title
		// THE ABSOLUTE POSITIONING IS SCREWIG THINGS UP
		// THIS IS COVERING UP THE CLOSE BUTTON
		//$tut.append('<h2 id="tutorme-title">' + ((options.title) ? options.title : "") + '</h2>');

		$(bubbles).each(function(idx, bubble) {
			var $bbl = $('<div class="tutorme-bubble"><div class="tutorme-bubble-title"></div><div class="tutorme-bubble-text"></div></div>');

			// does it get an ID?
			if (bubble.id) {
				$bbl.attr("id", bubble.id);
			}

			$bbl.find(".tutorme-bubble-title").text((bubble.title) ? bubble.title : "");
			$bbl.find(".tutorme-bubble-text").html((bubble.text) ? bubble.text : "");

			$bbl.css("width", ((bubble.width) ? bubble.width : undefined));

			// can we see it?
			if (bubble.hidden === true) {
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
						$bbl.append('<div class="arrow-up" />');
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
					case "right":
						$bbl.css("top", at.offset().top + "px");
						$bbl.css("left", at.offset().left + (at.width() + 20) + "px");
						break;
					// case "over":
					// $bbl.css("top", at.offset().top + "px");
					// $bbl.css("left", at.offset().left + (at.width() / 2) - $bbl.width + "px");
					// break;
					default:
						$bbl.css("top", at.offset().top + "px");
						$bbl.css("left", at.offset().left + "px");
				}
			}

			// explicit coordinated override attachTo
			if (bubble.xPos) {
				$bbl.css("left", bubble.xPos + "px");
			}
			if (bubble.yPos) {
				$bbl.css("top", bubble.yPos + "px");
			}

			// if clickThrough is enabled...
			if (bubble.onClick) {
				$bbl.css("cursor", "pointer");
				$bbl.click(bubble.onClick);
			}

			$tut.append($bbl);
			$("body").append($tut);
		});
	},
	show : function() {
		$("#tutorme").show();
	},
	hide : function() {
		$("#tutorme").hide();
	}
}
