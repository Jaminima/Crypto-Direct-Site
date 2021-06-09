let userData;

function UpdateUserData(){
    $("#balVal").text(userData["balance"].toFixed(2));
    $("#usrNme").text(userData["nickname"]);

    $("#depositAddr").text(userData["inAddress"]);

    $("#withdrawAmount").attr({"max":userData["balance"]});
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
    userData = data["data"];
    UpdateUserData();
}

function GenerateNewAddressConfirmation(){
    $("#GenerateButton").hide();
    $("#GenerateConfirm").show();

}

function GenerateCancel(){
    $("#GenerateButton").show();
    $("#GenerateConfirm").hide();
}

function GenerateNewAddress(){
    $.ajax({
            url: "/API/PayInAddress",
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: GenerateNewSuccess
        }
    );
    GenerateCancel();
}

function GenerateNewSuccess(data){
    userData["inAddress"] = data["data"];
    UpdateUserData();
}

function ConfirmTransaction(){
    let tx = $("#txId").val();
    if (tx.length==0) return;
    $.ajax({
            url: "/API/Confirm?txId="+tx,
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: ConfirmTxSuccess,
            error: ConfrimTXFail
        }
    );
}

function ConfrimTXFail(data){
    $("#txError").text(data.responseJSON["message"]);
    $("#txErrorBox").show();
}

function HideTxError(){
    $("#txErrorBox").hide();
}

function ConfirmTxSuccess(data){
    $("#txErrorBox").hide();
    $("#txId").val("");
    userData = data["data"];
    UpdateUserData();
}

function WithdrawConfirmation(){
    $("#WithdrawButton").hide();
    $("#WithdrawConfirm").show();
}

function WithdrawCancel(){
    $("#WithdrawButton").show();
    $("#WithdrawConfirm").hide();
}

function WithdrawAmount(){
    $.ajax({
            url: "/API/Withdraw?outAddr="+$("#withdrawAddr").val()+"&amount="+$("#withdrawAmount").val(),
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: WithdrawSuccess,
            error: WithdrawFail
        }
    );
    WithdrawCancel();
}

function WithdrawSuccess(data){
    $("#outTxIdBox").show();
    $("#outTxId").text(data["data"]);
    $("#withdrawAddr").val("");
    $("#withdrawAmount").val("");
    LoadUserData();
}

function WithdrawFail(data){
    $("#WithdrawError").text(data.responseJSON["message"]);
    $("#WithdrawErrorBox").show();
}

function HideWithdrawTx(){
    $("#outTxIdBox").hide();
}

LoadUserData();