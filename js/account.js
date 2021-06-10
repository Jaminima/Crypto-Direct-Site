let userData;

function UpdateUserData(){
    $("#usrPassword").val("");

    $("#balVal").text(userData["balance"].toFixed(2));
    $("#usrName").val(userData["nickname"]);
    $("#usrEmail").val(userData["email"]);
    $("#usrOutAddress").val(userData["outAddress"]);

    $("#depositAddr").text(userData["inAddress"]);

    $("#withdrawAmount").attr({"max":userData["balance"]});
    $("#withdrawAddr").val(userData["outAddress"]);
}

function SaveUserDetails(){
    let params = "newNickname="+$("#usrName").val()+"&newEmail="+$("#usrEmail").val()+"&grlcOut="+$("#usrOutAddress").val();

    if ($("#usrPassword").val().length>0) params+="&newPassword="+$("#usrPassword").val();

    $.ajax({
            url: "/API/Update?"+params,
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoadDataSuccess,
            error: SaveUserFail
        }
    );
}

function HideUpdateError(){
    $("#updateErrorBox").hide();
}

function SaveUserFail(data){
    $("#updateErrorBox").show();
    $("#updateError").text(data.responseJSON["message"]);
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
    LoadTransactionData();
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
    LoadTransactionData();
}

function WithdrawFail(data){
    $("#WithdrawError").text(data.responseJSON["message"]);
    $("#WithdrawErrorBox").show();
}

function HideWithdrawTx(){
    $("#outTxIdBox").hide();
}

LoadUserData();