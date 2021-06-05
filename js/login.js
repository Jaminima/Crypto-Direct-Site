function Login(){
    let username = $("#username").val();
    let password = $("#password").val();

    $.ajax({
            url: "/API/Login?nick=" + username+"&pword="+password,
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoginSuccess
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
            success: LoginSuccess
        }
    );
}

function LoginSuccess(data){
    location.href = "./account.html";
}

function GoBack(){
    location.href = "./index.html";
}