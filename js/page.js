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
    $("#wholeBalance").text(data["data"]);
}

let price = 0.08;

function getPrice(){
    $.ajax({
            url: "/API/Price",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: setPrice
        }
    );
}

function setPrice(data){
    $("#curPrice").text(data["data"]);
    price = data;
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
getPrice();