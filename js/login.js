function Login(){
    let username = $("#username").val();
    let password = $("#password").val();

    $.ajax({
            url: "/API/Login?nick=" + username+"&pword="+password,
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoginSuccess,
            error: LoginFail
        }
    );
}

function Signup(){
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();

    $.ajax({
            url: "/API/Register?nick=" + username+"&pword="+password+"&email="+email,
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoginSuccess,
            error: LoginFail
        }
    );
}

function LoginSuccess(data){
    location.href = "./account.html";
}

function LoginFail(data){
    $("#loginErrorBox").show();
    $("#loginError").text(data.responseJSON["message"]);
}

function HideLoginError(){
    $("#loginErrorBox").hide();
}

function GoBack(){
    location.href = "./index.html";
}