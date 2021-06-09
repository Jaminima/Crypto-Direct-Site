function windowLayout(){
    if ($(window).width()<$(window).height() || $(window).width()<$(".mainDiv").width()){
        $(".mainDiv").css('display','block');
    }
    else{
        $(".mainDiv").css('display','inline-flex');
    }
}

function getSellableBalance(){
    $.ajax({
            url: "/API/SellableBalance",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: setSellableBalance
        }
    );
}

function setSellableBalance(data){
    $("#sellableBalance").text(data["data"]);
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
    price = data["data"];
    $("#curPrice").text(price);
}

function GotoAccount(){
    location.href = "./account.html";
}


function GotoContact(){
    location.href = "./contact.html";
}

$( window ).resize(windowLayout);
windowLayout();
getSellableBalance();
getPrice();