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
        $("#PurchaseTable").append("<tr class=\"table\"><th scope=\"row\">"+d[i]["at"]+"</th><td>"+d[i]["crypto"]+"</td><td>"+d[i]["price"]+"</td><td>"+d[i]["wentThrough"].toString()+"</td></tr>")
    }
}

LoadPurchaseData();