jquery.tutorme
==============

A jQuery plugin for overlaying a tutorial on any web page.

## Version 0.1.0

Initial version has very specific features needed to meet immediate goals.  Future versions will have better customization options and cross browser testing.

Tested on Chrome 25 and Firefox 22, jQuery 1.7.2.

Usage is simple - just include jquery.tutorme.js and jquery.tutorme.css on your page.

### Initialize

Initialize the TutorMe overlay with a list of 'bubbles' to draw, and an options object.  For example:

```
  $.tutorme.init([{
		title : "BUBBLE ONE",
		text : "This bubble will position itself relative to the specified 'attachTo' element.",
		width : 300,
		arrow : "left",
		attachTo : $(".myelement"),
		attachPosition : "right"
	}, {
		id : "bubbletwo",
		title : "BUBBLE TWO",
		text : "Explicitly positioned bubble.",
		width : 400,
		xPos : 360,
		yPos : 230,
	}])

```

### Showing

```
	$.tutorme.show();
```

### Closing

Press ESC or click the (x) in the upper right to close the overlay.  In script you can call:

```
	$tutorme.hide();
```

### Bubble Properties

Valid bubble properties are:

*title* - a title for the bubble

*text* - the text of the bubble

*width* - width of the bubble (do not add 'px', just an integer).  Bubble will autosize to text content if omitted.

*xPos* - the left (x) coordinates of the bubble

*yPos* - the top (y) coordinates of the bubble

*arrow* - will place an arrow on the edge of the bubble.  (Valid options: left, right, up, down)

*attachTo* - will attempt to attach the bubble to the specified _jQuery Element_.  Ex. $("#my_element")

*attachPosition* - where to attach to the specified element.  (Currently supported: right)
