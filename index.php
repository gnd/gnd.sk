<?php

require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;
 
if ( $detect->isMobile() ) {
    $kak = file_get_contents('mobile.html');
    echo $kak;
} else if( $detect->isTablet() ){
    $kak = file_get_contents('mobile.html');
    echo $kak;
} else {
    $kak = file_get_contents('imobile.html');
    echo $kak;
}

?>