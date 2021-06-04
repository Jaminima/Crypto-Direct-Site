function Login(){
    let username = $("#username").val();
    let password = $("#password").val();

    $.ajax({
            url: "/API/Login?nick=" + username,
            method: 'GET',
            xhrFields: { withCredentials: true },
            success: LoginSuccess
        }
    );
    //+"&pword="+password
}

function LoginSuccess(data){
    location.href = "./account.html";
}