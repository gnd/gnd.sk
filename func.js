// GLOBALS
var max_background_images = 5;
var max_plays = 14;
var current_dest = 'vj-container';
var menu_hidden = true;
var bio_hidden = true;
var bio_on = false;
var contact_hidden = true;
var contact_on = false;
var events_hidden = true;
var events_on = false;
var active_language = 'en';
var device_type = 'desktop';


function detect_client() {
    const mq = window.matchMedia('screen and (min-width: 300px) and (max-width: 340px)');
    if (mq.matches) {
        device_type = 'phone';
    }
    const mq2 = window.matchMedia('screen and (min-width: 341px) and (max-width: 365px)');
    if (mq2.matches) {
        device_type = 'phone';
    }
    const mq3 = window.matchMedia('screen and (min-width: 370px) and (max-width: 380px)');
    if (mq3.matches) {
        device_type = 'phone';
    }
    const mq4 = window.matchMedia('screen and (min-width: 400px) and (max-width: 1000px)');
    if (mq4.matches) {
        device_type = 'phone';
    }
    const mq5 = window.matchMedia('screen and (min-width: 700px) and (min-height: 1200px)');
    if (mq5.matches) {
        device_type = "desktop";
    }
    const mq6 = window.matchMedia('screen and (min-width: 1010px) and (max-height: 850px)');
    if (mq6.matches) {
        device_type = "desktop";
    }
    const mq7 = window.matchMedia('screen and (min-width: 1400px) and (min-height: 750px)');
    if (mq7.matches) {
        device_type = "desktop";
    }
};


function navigate(id, speed) {
    if (bio_on) {
        hidebio();
    }
    if (contact_on) {
        hidecontact();
    }
    if (events_on) {
        hideevents();
    }
    if (id != current_dest) {
        // first loading of theatre
        if ((id === 'theatre') && (menu_hidden)) {
            $('#theatre-menu').fadeOut(10);
            document.getElementById('theatre-menu').style.visibility = "visible";
            $('#language-menu').fadeOut(10);
            document.getElementById('language-menu').style.visibility = "visible";
            menu_hidden = false;
        }
        if ((id === 'vj-container') || (id === 'theatre')) {
            unset_strike();
            smooth_horizontal(document.getElementById(id, speed));
            current_dest = id;
        } else {
            if (((current_dest != 'theatre') && (id != String(max_plays))) ||
                ((current_dest != String(max_plays)) && (id != 'theatre'))) {
                smooth_vertical(document.getElementById("play" + id));
                set_strike(id);
                current_dest = id;
            }
        }
    }
}

function set_strike(num) {
    for (var i = 1; i <= max_plays; i++) {
        var elid = "link" + i;
        var el = document.getElementById(elid);
        if (i === parseInt(num)) {
            el.style.textDecoration = "line-through";
        } else {
            el.style.textDecoration = "";
        }
    }
}

function unset_strike() {
    for (var i = 1; i <= max_plays; i++) {
        var elid = "link" + i;
        var el = document.getElementById(elid);
        el.style.textDecoration = "";
    }
}

function smooth_horizontal(target, speed) {
    var scrollContainer = target;

    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollLeft += 1;
    } while (scrollContainer.scrollLeft == 0);

    var targetY = 0;
    do { //find the left of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetLeft;
    } while (target = target.offsetParent);

    // start scrolling
    scrollContainer.scrollTop = 0;
    if (targetY < 100) {
        $('#theatre-menu').fadeOut(speed);
        $('#language-menu').fadeOut(speed);
        $('#menu').animate({
            'marginLeft': '2.5%'
        }, speed);
        $('.menu-text').animate({
            'color': 'black'
        }, speed);
        $('.menu-text').animate({
            'backgroundColor': 'white'
        }, speed);
        $('.nav-container').animate({
            'right': '0%'
        }, speed);
    }
    $('html,body').animate({
        scrollLeft: targetY
    }, speed);
    if (targetY > 100) {
        $("#theatre-menu").fadeIn(speed);
        $("#language-menu").fadeIn(speed);
        $('#menu').animate({
            'marginLeft': '5%'
        }, speed);
        $('.menu-text').animate({
            'color': 'white'
        }, speed);
        $('.menu-text').animate({
            'backgroundColor': 'black'
        }, speed);
        $('.nav-container').animate({
            'right': '97%'
        }, speed);
    }

}

function navigate_mobile(speed) {
    if (current_dest == 'vj-container') {
        id = 'theatre';
    } else {
        id = 'vj-container';
    }
    smooth_horizontal_mobile(id, speed);
    current_dest = id;
}

function smooth_horizontal_mobile(target, speed) {
    if (target == 'vj-container') {
        document.getElementById('vj-container').style.display = 'block';
        document.getElementById('vj-container').style.width = '100%';
        document.getElementById('vj-main').style.width = '90%';
        document.getElementById('vj-main').style.visibility = "visible";
        document.getElementById('theatre').style.display = 'none';
        document.getElementById('theatre-container').style.display = 'none';
        $('#menu').animate({
            'marginLeft': '1%'
        }, speed);
        $('.menu-text').animate({
            'color': 'black'
        }, speed);
        $('.menu-text').animate({
            'backgroundColor': 'white'
        }, speed);
        document.getElementById('menu-mobile').removeChild(document.getElementById('menu-mobile').firstChild);
        document.getElementById('menu-mobile').appendChild(document.createTextNode("THEATRE"));
    }
    if (target == 'theatre') {
        document.getElementById('theatre-container').style.width = '100%';
        document.getElementById('theatre-container').style.display = 'block';
        document.getElementById('vj-container').style.display = 'none';
        document.getElementById('theatre').style.float = 'left';
        document.getElementById('theatre').style.width = '100%';
        document.getElementById('vj-main').style.width = 0;
        document.getElementById('vj-main').style.visibility = 'hidden';
        $('#menu').animate({
            'marginLeft': '3%'
        }, speed);
        $('.menu-text').animate({
            'color': 'white'
        }, speed);
        $('.menu-text').animate({
            'backgroundColor': 'black'
        }, speed);
        document.getElementById('menu-mobile').removeChild(document.getElementById('menu-mobile').firstChild);
        document.getElementById('menu-mobile').appendChild(document.createTextNode("VIDEO"));
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

    $('html,body').animate({
        scrollTop: targetY
    }, 500);
    $('html,body').animate({
        scrollTop: targetY
    }, 500);
}

function bio() {
    if (!bio_on) {
        if (bio_hidden) {
            document.getElementById('bio').style.visibility = "visible";
            bio_hidden = false;
        }
        if (current_dest == 'vj-container') {
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
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        if (events_hidden) {
            document.getElementById('events').style.visibility = "visible";
            events_hidden = false;
        }
        if (current_dest == 'vj-container') {
            document.getElementById('events').style.backgroundColor = 'white';
            document.getElementById('events').style.color = 'black';
            if (device_type == 'desktop') {
                document.getElementById('events').style.left = '30%';
            }
        } else {
            document.getElementById('events').style.backgroundColor = 'black';
            document.getElementById('events').style.color = 'white';
            if (device_type == 'desktop') {
                document.getElementById('events').style.left = '130%';
            }
        }
        $("#events").fadeIn(300);
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
        if (current_dest == 'vj-container') {
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
        [].forEach.call(txts, function(txt) {
            txt.style.display = "block";
        });
        // show sk spans
        var txts = document.getElementsByClassName('sk-span');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "inline";
        });
        // hide en
        var txts = document.getElementsByClassName('en');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "none";
        });
        // hide en spans
        var txts = document.getElementsByClassName('en-span');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "none";
        });
        // change settings
        document.getElementById('link10').textContent = 'ŠEST PŘǏBĚHŮ O VZNIKU A ZÁNIKU';
        document.getElementById('link6').textContent = 'POSLEDNÝ PRÍPAD DETEKTÍVA KONEČNÍKA';
        document.getElementById('link5').textContent = 'KATJA BRUNNER - PEKLO JE TAKY JENOM SAUNA';
        active_language = 'sk';
        document.getElementById('language-link').textContent = 'EN';
    } else if (active_language == 'sk') {
        // show en
        var txts = document.getElementsByClassName('en');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "block";
        });
        // show en spans
        var txts = document.getElementsByClassName('en-span');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "inline";
        });
        // hide sk
        var txts = document.getElementsByClassName('sk');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "none";
        });
        // hide sk spans
        var txts = document.getElementsByClassName('sk-span');
        [].forEach.call(txts, function(txt) {
            txt.style.display = "none";
        });
        // change settings
        document.getElementById('link10').textContent = 'SIX STORIES';
        document.getElementById('link6').textContent = 'LAST CASE OF DETECTIVE KONEČNÍK';
        document.getElementById('link5').textContent = 'KATJA BRUNNER - HELL IS ALSO A SAUNA';
        active_language = 'en';
        document.getElementById('language-link').textContent = 'SK';
    }
}

jQuery(function($) {
    $('body').click(function(e) {
        if (!$(e.target).is('.bioc') && bio_on) {
            hidebio();
        }
        if (!$(e.target).is('.conc') && !$(e.target).is('.email') && contact_on) {
            hidecontact();
        }
        if (!$(e.target).is('.evenc') && events_on) {
            hideevents();
        }
    })
});

/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */

document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    }
);

function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/maxresdefault.jpg">',
        play = '<div class="play"></div>';
    if (id == 'slNGdcOeJ-4') {
        thumb = '<img src="https://i.ytimg.com/vi/ID/0.jpg">';
    }
    return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?rel=0&autoplay=1&vq=hd720p60";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}

// 02.07.2024, navigate fast to theatre 
window.onload = function() {
    // get the client type
    detect_client();

    if (device_type == 'desktop') {
        navigate('theatre', 0);
    } else {
        navigate_mobile('theatre', 0);
    }
};
