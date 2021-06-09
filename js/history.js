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

    for (var i=0;i<Object.keys(d).length;i++) {
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

    for (var i=0;i<Object.keys(d).length;i++) {
        $("#TransactionTable").append("<tr class=\"table\"><th scope=\"row\">"+d[i]["at"]+"</th><td>"+d[i]["cryptoIn"]+" GRLC</td><td>$"+d[i]["cryptoOut"]+"</td><td>"+d[i]["txId"].toString()+"</td></tr>")
    }
}

LoadPurchaseData();
LoadTransactionData();