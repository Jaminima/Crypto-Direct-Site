let userData;

function UpdateUserData(){
    $("#usrPassword").val("");

    $("#balVal").text(userData["balance"]);
    $("#usrName").val(userData["nickname"]);
    $("#usrEmail").val(userData["email"]);
    $("#usrOutAddress").val(userData["outAddress"]);

    $("#depositAddr").text(userData["inAddress"]);

    $("#withdrawAmount").attr({"max":userData["balance"]});
    $("#withdrawAddr").val(userData["outAddress"]);
}

function SaveUserDetails(){
    let headers = {
        "newNickname" : $("#usrName").val(),
        "newEmail":$("#usrEmail").val(),
        "grlcOut":$("#usrOutAddress").val(),
        "newPassword":null
    }

    if ($("#usrPassword").val().length>0) headers.newPassword=$("#usrPassword").val();

    $.ajax({
            url: "/API/Update",
            method: 'GET',
            headers: headers,
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

function WithdrawConfirmation(){
    $("#WithdrawButton").hide();
    $("#WithdrawConfirm").show();
}

function WithdrawCancel(){
    $("#WithdrawButton").show();
    $("#WithdrawConfirm").hide();
}

function SetWithDrawToAll(){
    $("#withdrawAmount").val(userData["balance"]);
}

function WithdrawAmount(){
    $.ajax({
            url: "/API/Withdraw",
            headers:{
                "outAddr":$("#withdrawAddr").val(),
                "amount":$("#withdrawAmount").val()
            },
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