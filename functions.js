function navigate(id) {
	// when pressed in bio
	if (bio_on) {
		hidebio();
	}
	if (contact_on) {
		hidecontact();
	}
	if (events_on) {
		hideevents();
	}
	// only if necessary
        if (id != current_dest) {
		// first loading of theatre
		if ((id === 'theatre') && (menu_hidden)) {
			$('#theatre-menu').fadeOut(10);
        		document.getElementById('theatre-menu').style.visibility = "visible";
			$('#language-menu').fadeOut(10);
        		document.getElementById('language-menu').style.visibility = "visible";
			menu_hidden = false;
		}
		// is it a horizontal or vertical scroll ?
		// eventually there should be just one function for it
                if ((id === 'video') || (id === 'theatre')) {
			console.log("entering smooth_horizontal");
			smooth_horizontal(document.getElementById(id));
			current_dest = id;
		} else {
			// with sion (play7) on top its the same as theatre
                        if (((current_dest != 'theatre') && (id != '7')) ||
                           ((current_dest != '7') && (id != 'theatre'))) {
				smooth_vertical(document.getElementById("play" + id));
				set_strike(id);
				current_dest = id;
			}
		}
	}
}

function set_strike(num) {
	for (var i=1; i<=max_plays; i++) {
		var elid = "link" + i;
		var el = document.getElementById(elid);
	        if (i === parseInt(num)) {
			el.style.textDecoration = "line-through";
		} else {
			el.style.textDecoration = "";
		}
	}
}

function smooth_horizontal(target) {
    var scrollContainer = target;

    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollLeft += 1;
    } while (scrollContainer.scrollLeft == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetLeft;
    } while (target = target.offsetParent);

    // start scrolling
    scrollContainer.scrollTop = 0;
    if (targetY < 100) {
	$('#theatre-menu').fadeOut(300);
	$('#language-menu').fadeOut(300);
	var menu_margin_left = parseInt((window.innerWidth*0.1 -60 -15)/2);
	$('#menu').animate({'marginLeft': menu_margin_left}, 300);
	$('.menu-text').animate({'color': 'black'}, 300);
	$('.menu-text').animate({'backgroundColor': 'white'}, 300);
    }
    $('html,body').animate({scrollLeft:targetY}, 500);
    if (targetY > 1000) {
    	$("#theatre-menu").fadeIn(500);
	$("#language-menu").fadeIn(500);
        var menu_margin_left = parseInt((window.innerWidth*0.1 -60 -15)/2) + 60;
	$('#menu').animate({'marginLeft': menu_margin_left}, 300);
	$('.menu-text').animate({'color': 'white'}, 300);
	$('.menu-text').animate({'backgroundColor': 'black'}, 300);
    }

}

function smooth_vertical(target) {
    var theatre = document.getElementById("theatre");
    var targetX = theatre.offsetLeft;

    scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scrollContainer.scrollLeft = targetX;
    $('html,body').animate({scrollTop:targetY}, 500);
}

function bio() {
    if (!bio_on) {
	    if (bio_hidden) {
		document.getElementById('bio').style.visibility = "visible";
		bio_hidden = false;
	    }
            if (current_dest == 'video') {
		document.getElementById('bio').style.backgroundColor = 'white';
		document.getElementById('bio').style.color = 'black';
	    } else {
		document.getElementById('bio').style.backgroundColor = 'black';
		document.getElementById('bio').style.color = 'white';
	    }
	    $("#bio").fadeIn(300);
	    if (contact_on) {
		hidecontact();
	    }
	    setTimeout(function() {
		bio_on = true;
	    }, 100);

    } else {
	    if (bio_hidden) {
		document.getElementById('bio').style.visibility = "visible";
		bio_hidden = false;
	    }
	    $("#bio").fadeOut(300);
	    bio_on = false;
    }
}

function hidebio() {
	if (bio_hidden) {
		document.getElementById('bio').style.visibility = "visible";
		bio_hidden = false;
	    }
	    $("#bio").fadeOut(300);
	    bio_on = false;
}

function events() {
    if (!events_on) {
	    if (events_hidden) {
		document.getElementById('events').style.visibility = "visible";
		events_hidden = false;
	    }
	    if (current_dest == 'video') {
		$('html,body').animate({scrollTop:0}, 500);
		document.getElementById('events').style.backgroundColor = 'white';
		document.getElementById('events').style.color = 'black';
		document.getElementById('events').style.left = '30%';
	    } else {
		$('html,body').animate({scrollTop:0}, 500);
		document.getElementById('events').style.backgroundColor = 'black';
		document.getElementById('events').style.color = 'white';
		document.getElementById('events').style.left = window.innerWidth * 1.3 -75;
	    }
	    $("#events").fadeIn(300);
	    if (bio_on) {
		hidebio();
	    }
	    setTimeout(function() {
		events_on = true;
	    }, 100);
    } else {
	    if (events_hidden) {
		document.getElementById('events').style.visibility = "visible";
		events_hidden = false;
	    }
	    $("#events").fadeOut(300);
	    events_on = false;
    }
}

function hideevents() {
	if (events_hidden) {
		document.getElementById('events').style.visibility = "visible";
		events_hidden = false;
	    }
	    $("#events").fadeOut(300);
	    events_on = false;
}

function contact() {
    if (!contact_on) {
	    if (contact_hidden) {
		document.getElementById('contact').style.visibility = "visible";
		contact_hidden = false;
	    }
		if (current_dest == 'video') {
		document.getElementById('contact').style.backgroundColor = 'white';
		document.getElementById('contact').style.color = 'black';
	    } else {
		document.getElementById('contact').style.backgroundColor = 'black';
		document.getElementById('contact').style.color = 'white';
	    }
	    $("#contact").fadeIn(300);
	    if (bio_on) {
		hidebio();
	    }
	    setTimeout(function() {
		contact_on = true;
	    }, 100);
    } else {
	    if (contact_hidden) {
		document.getElementById('contact').style.visibility = "visible";
		bio_hidden = false;
	    }
	    $("#contact").fadeOut(300);
	    contact_on = false;
    }
}

function hidecontact() {
	if (contact_hidden) {
		document.getElementById('contact').style.visibility = "visible";
		bio_hidden = false;
	    }
	    $("#contact").fadeOut(300);
	    contact_on = false;
}

function language() {
	if (active_language == 'en') {
		// show sk
		var txts = document.getElementsByClassName('sk');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "block";
		});
		// show sk spans
		var txts = document.getElementsByClassName('sk-span');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "inline";
		});
		// hide en
		var txts = document.getElementsByClassName('en');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "none";
		});
		// hide en spans
		var txts = document.getElementsByClassName('en-span');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "none";
		});
		// change settings
		document.getElementById('link6').textContent = 'POSLEDNÝ PRÍPAD DETEKTÍVA KONEČNÍKA';
		document.getElementById('link5').textContent = 'KATJA BRUNNER - PEKLO JE TAKY JENOM SAUNA';
		active_language = 'sk';
		document.getElementById('language-link').textContent = 'EN';
	}
	else if (active_language == 'sk') {
		// show en
		var txts = document.getElementsByClassName('en');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "block";
		});
		// show en spans
		var txts = document.getElementsByClassName('en-span');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "inline";
		});
		// hide sk
		var txts = document.getElementsByClassName('sk');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "none";
		});
		// hide sk spans
		var txts = document.getElementsByClassName('sk-span');
		[].forEach.call(txts, function (txt) {
			txt.style.display = "none";
		});
		// change settings
		document.getElementById('link6').textContent = 'LAST CASE OF DETECTIVE KONEČNÍK';
		document.getElementById('link5').textContent = 'KATJA BRUNNER - HELL IS ALSO A SAUNA';
		active_language = 'en';
		document.getElementById('language-link').textContent = 'SK';
	}
}

function set_font_sizes() {
	// so far only setting bio
	var font_size = bio_text_size;
	var txts = document.getElementsByClassName('bio-text');
	[].forEach.call(txts, function (txt) {
		txt.style.fontSize = font_size;
	});
	var positionInfo = document.getElementById('bio').getBoundingClientRect();
	var bottom = parseInt(positionInfo.bottom);
	var height = window.innerHeight;

	while (bottom > height) {
		font_size+= -1;
		var txts = document.getElementsByClassName('bio-text');
		[].forEach.call(txts, function (txt) {
			txt.style.fontSize = font_size;
		});
		positionInfo = document.getElementById('bio').getBoundingClientRect();
		bottom = parseInt(positionInfo.bottom);
		height = window.innerHeight;
	}
}

function set_size() {
	var nav_width = document.getElementById('theatre').offsetWidth;
	var width = document.getElementById('video').offsetWidth - nav_width - 100;

	// set video div dimensions
	var vj_main = document.getElementById('vj-main');
	vj_main.style.width = width -1;

	// set theatre div dimensions
	var theatre_main = document.getElementById('theatre-main');
	theatre_main.style.width = width;

	// set menu dimensions
	var menu_margin_left = parseInt((window.innerWidth*0.1 -60 -15) /2);
        document.getElementById('menu').style.marginLeft = menu_margin_left;

	// set video dimensions
        var video_height = parseInt((width -1) / 1.77777);
	var visible_height = window.innerHeight - menu_padding_top - menu_text_size - menu_padding_bottom;  			//
	var video_width = 0;

	// if video height is bigger as visible space
        if (video_height > visible_height) {
                video_width = parseInt((visible_height-10) * 1.77777); 	// 720p
		video_height = visible_height -10;
	} else {
		wideo_width = width -1;
		video_height = parseInt((width -1) / 1.77777);
	}

	// check if yt bigger as max
	if (video_width > max_video_width) {
		video_width = max_video_width;
		video_height = max_video_height;
	}

	// set the yt iframe width & height
	var yts = document.getElementsByClassName('yt');
	[].forEach.call(yts, function (yt) {
		yt.style.width = video_width;
		yt.style.height = video_height;
		yt.style.paddingLeft = parseInt((width - video_width) / 2);
	});

	// set the gallery width
	var yts = document.getElementsByClassName('gallery');
	[].forEach.call(yts, function (yt) {
		yt.style.width = video_width;
		yt.style.paddingLeft = parseInt((width - video_width) / 2);
	});

	// set the yt-img width
	var yts = document.getElementsByClassName('yt-img');
	[].forEach.call(yts, function (yt) {
		yt.style.width = parseInt((video_width) / 3);
	});

	// set the theatre-gallery width
	width = window.innerWidth - 165 - nav_width/2;  // not sure where 165 comes from (15 from the scrollbar)
	var yts = document.getElementsByClassName('theatre-gallery');
	[].forEach.call(yts, function (yt) {
		yt.style.width = width * 0.72;
		//yt.style.paddingLeft = parseInt((width - video_width) / 2);
	});

	// set the theatre-yt-img width
	var yts = document.getElementsByClassName('theatre-yt-img');
	[].forEach.call(yts, function (yt) {
		yt.style.width = parseInt(width * 0.24);
	});

	// keep aligned to the correct side
	if (current_dest == 'video') {
		$('html,body').animate({scrollLeft:0}, 10);
	} else {
		$('html,body').animate({scrollLeft:width+100+20}, 10);
	}

	// make the bio fit into the screen (copy to onloads too)var txts = document.getElementsByClassName('bio-text');
        set_font_sizes();
}

function fix_bottoms() {
	var height = $(document).height();
	document.getElementById('theatre').style.height = height;
	document.getElementById('vj-main').style.height = height;
}

function run_onloads() {
        fix_bottoms();
	// fix theatre-menu visibility when refreshing
	if (window.pageXOffset > 1000) {
		// actually this would be much better as display: none
		document.getElementById('theatre-menu').style.visibility = 'visible';
		document.getElementById('language-menu').style.visibility = 'visible';
		menu_hidden = false;
		current_dest = 'theatre';
	}
	// fix menu margin-left when refreshing
	if (window.pageXOffset > 1000) {
		var menu_margin_left = parseInt((window.innerWidth*0.1 -60 -15)/2)+60;
		document.getElementById('menu').style.marginLeft = menu_margin_left;
	}
	// fix menu-text color when refreshing
	if (window.pageXOffset > 1000) {
		$('.menu-text').animate({'color': 'white'}, 10);
		$('.menu-text').animate({'backgroundColor': 'black'}, 10);
	}

	document.getElementById('language-link').textContent = 'SK';

	set_font_sizes();

	// if linking to theatre
	if ( window.location.href.indexOf("#") > -1) {
		navigate('theatre');
	}
}

jQuery(function ($) {
	$('body').click(function (e) {
		if ( !$(e.target).is('.bioc') && bio_on) {
			hidebio();
		}
		if ( !$(e.target).is('.conc') && contact_on) {
			hidecontact();
		}
		if ( !$(e.target).is('.evenc') && events_on) {
			hideevents();
		}
	})
});

window.onload = run_onloads;
window.addEventListener('resize', set_size);