$( window ).resize(function(){
    if ($(window).width()<1200){
        $("#mainDiv").css('display','block');
    }
    else{
        $("#mainDiv").css('display','inline-flex');
    }
});