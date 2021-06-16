// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe("pk_live_51Izjh5KFVoGzA5vxjGZ2wp161nMGy5s5niJnw61eT2R3Z4jCELE5W5TlEJq25c3BMRT6Rx3KXOVVFicxBsr5l4tD00eKEdOgr3");

function CheckOut(){
    let toBuy = $("#purchaseAmount").val();
    fetch("/API/executebuy", {
        method: "POST",
        headers:{
            "toBuy":toBuy
        }
    })
        .then(function (response) {
            if (response.status==200) return response.json();
            else throw response.json()
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            // If redirectToCheckout fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using error.message.
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            error.then(data=>{
                $("#shopErrorBox").show();
                $("#shopError").text(data["error"]);
            });
        });
}


function HideShopError(){
    $("#shopErrorBox").hide();
}

function LoadUserData(){
    $.ajax({
            url: "/API/Account",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoadDataSuccess,
            error: LoadDataFail
        }
    );
}

function LoadDataFail(){
    location.href="./login.html";
}

function LoadDataSuccess(data){
}

function BuyChanged(){
    let crypto = $("#purchaseAmount").val()*price;
    let fee = crypto * 0.05;

    $("#cryptoPrice").text(crypto.toFixed(2));
    $("#fee").text(fee.toFixed(2));
    $("#totPrice").text((crypto + fee).toFixed(2));
}

LoadUserData();