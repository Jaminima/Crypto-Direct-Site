function windowLayout(){
    if ($(window).width()<$(window).height()){
        $("#mainDiv").css('display','block');
    }
    else{
        $("#mainDiv").css('display','inline-flex');
    }
}

$( window ).resize(windowLayout);
windowLayout();