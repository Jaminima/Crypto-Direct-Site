function LoadPurchaseData(){
    $.ajax({
            url: "/API/Purchases",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoadPurchaseDataSuccess
        }
    );
}

function LoadPurchaseDataSuccess(data){
    let d = data["data"];

    $("#PurchaseTable")[0].innerHTML="";

    for (var i=Object.keys(d).length-1;i>=0;i--) {
        $("#PurchaseTable").append("<tr class=\"table\"><th scope=\"row\">"+d[i]["at"]+"</th><td>"+d[i]["crypto"]+" GRLC</td><td>$"+d[i]["price"].toFixed(2)+"</td><td>"+d[i]["wentThrough"].toString()+"</td></tr>")
    }
}

function LoadTransactionData(){
    $.ajax({
            url: "/API/Transactions",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoadTransactionDataSuccess
        }
    );
}

function LoadTransactionDataSuccess(data){
    let d = data["data"];

    $("#TransactionTable")[0].innerHTML="";

    for (var i=Object.keys(d).length-1;i>=0;i--) {

        let flow = 0;
        if (d[i]["cryptoIn"]!=null) flow += d[i]["cryptoIn"];
        else if (d[i]["cryptoOut"]!=null) flow -= d[i]["cryptoOut"];

        $("#TransactionTable").append("<tr class=\"table\"><th scope=\"row\">"+d[i]["at"]+"</th><td>"+flow+" GRLC</td><td>"+d[i]["txId"].toString()+"</td></tr>")
    }
}

LoadPurchaseData();
LoadTransactionData();