function windowLayout(){
    if ($(window).width()<$(window).height() || $(window).width()<$("#mainDiv").width()){
        $("#mainDiv").css('display','block');
    }
    else{
        $("#mainDiv").css('display','inline-flex');
    }
}

$( window ).resize(windowLayout);
windowLayout();