// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe("pk_test_51Izjh5KFVoGzA5vxHI9fkxGWlqI91yaTslKkPxSTtwV4Xc7p6niViUx09SAAjUPv9w4Ur5dUdMBCzEW43tE83hNm00pfLPyGz4");

function CheckOut(){
    fetch("http://localhost:5000/execute-buy", {
        method: "POST",
    })
        .then(function (response) {
            return response.json();
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
            console.error("Error:", error);
        });
}