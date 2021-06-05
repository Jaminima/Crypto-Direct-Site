function Login(){
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val();

    $.ajax({
            url: "/API/Login?nick=" + username+"&pword="+password+"&email="+email,
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