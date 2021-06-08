function windowLayout(){
    if ($(window).width()<$(window).height() || $(window).width()<$("#mainDiv").width()){
        $("#mainDiv").css('display','block');
    }
    else{
        $("#mainDiv").css('display','inline-flex');
    }
}

function getWholeBalance(){
    $.ajax({
            url: "/API/Balance",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: setWholeBalance
        }
    );
}

function setWholeBalance(data){
    $("#wholeBalance").text(data);
}

function GotoAccount(){
    location.href = "./account.html";
}


function GotoContact(){
    location.href = "./contact.html";
}

$( window ).resize(windowLayout);
windowLayout();
getWholeBalance();