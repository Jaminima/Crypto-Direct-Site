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
    if (d == null){
        setTimeout(LoadPurchaseData, 5000);
        return;
    }

    $("#PurchaseTable")[0].innerHTML="";

    for (var i=0;i<Object.keys(d).length;i++) {
        $("#PurchaseTable").append("<tr class=\"table\"><th scope=\"row\">"+d[i]["at"]+"</th><td>"+d[i]["crypto"]+" GRLC</td><td>$"+d[i]["price"].toFixed(2)+"</td><td>"+d[i]["wentThrough"].toString()+"</td><td>"+d[i]["balPaid"].toString()+"</td></tr>")
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
    if (d == null){
        setTimeout(LoadTransactionData, 5000);
        return;
    }

    $("#TransactionTable")[0].innerHTML="";

    for (var i=0;i<Object.keys(d).length;i++) {

        let flow = 0;
        if (d[i]["cryptoIn"]!=null) flow += d[i]["cryptoIn"];
        else if (d[i]["cryptoOut"]!=null) flow -= d[i]["cryptoOut"];

        $("#TransactionTable").append("<tr class=\"table\"><th scope=\"row\">"+d[i]["at"]+"</th><td>"+flow+" GRLC</td><td>"+d[i]["txId"].toString()+"</td></tr>")
    }
}

LoadPurchaseData();
LoadTransactionData();