// GLOBALS
var max_video_width = 1280;
var max_video_height = 720;
var menu_padding_top = 35;
var menu_padding_bottom = 50;
var menu_text_size = 20;
var max_background_images = 5;
var max_plays = 7;
var current_dest = 'video';
var menu_hidden = true;
var bio_hidden = true;
var bio_on = false;
var contact_hidden = true;
var contact_on = false;
var events_hidden = true;
var events_on = false;
var active_language = 'en';
var bio_text_size = 15;

// do some pre-load window size computations
var nav_width_cmp = 60;
var width = window.innerWidth - nav_width_cmp -100 -15; // -padding -chrome scrollbar width

// set variables
var vj_main_width = width -1;
    var theatre_main_width = width;
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
    video_width_cmp = max_video_width;
    video_height_cmp = max_video_height;
}

// set the yt iframe width & height
var yt_width = video_width;
var yt_height = video_height;
var yt_paddingLeft = parseInt((width - video_width) / 2);

// set the gallery width
var gallery_width = video_width;
var gallery_paddingLeft = parseInt((width - video_width) / 2);

// set the yt-img width
var yt_img_width = parseInt((video_width) / 3);

// set the theatre-gallery width
var theatre_gallery_width = (window.innerWidth-nav_width_cmp-100-15) * 0.72;

// set the theatre-yt-img width
var theatre_yt_img_width = parseInt((window.innerWidth-nav_width_cmp-100-15) * 0.24);

    // set the menu padding
var menu_margin_left = parseInt((window.innerWidth*0.1 -nav_width_cmp -15) /2);

// set random background
var random = Math.floor((Math.random() * max_background_images) + 1);
var path = 'url("img/bcg/' + random + '_small.jpg") repeat-y top center';
var video_background = path;
var video_background_size =  '100% auto';
var video_background_attachment = 'fixed';

// create CSS
var styleElem = document.createElement('style');
styleElem.type = 'text/css' ;

// fill CSS
var css = '\n'
    css += '.vj-main { width: ' + vj_main_width + '; }\n';
css += '.theatre-main { width: ' + theatre_main_width + '; }\n';
css += '.yt { width: ' + yt_width + '; height: ' + yt_height + '; padding-left: ' + yt_paddingLeft + '; }\n';
css += '.gallery { width: ' + gallery_width + '; padding-left: ' + gallery_paddingLeft + '; }\n';
css += '.yt-img { width: ' + yt_img_width + '; }\n';
css += '.theatre-gallery { width: ' + theatre_gallery_width + '; }\n';
css += '.theatre-yt-img { width: ' + theatre_yt_img_width + '; }\n';
css += '.vj-container { background: ' + path + '; background-size: ' + video_background_size + '; background-attachment: ' + video_background_attachment + '; }\n';
css += '.menu { margin-left: ' + menu_margin_left + '; }\;';

if(styleElem.styleSheet){
        styleElem.styleSheet.cssText = css;
} else {
        styleElem.appendChild(document.createTextNode(css));
}

// append css to head
var head = document.getElementsByTagName('head')[0] ;
head.appendChild(styleElem);
