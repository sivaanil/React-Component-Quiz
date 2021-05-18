$(document).ready(function() {
    verifyUser()

    function verifyUser() {
        $.ajax({
            url: "/wsvc/in/verifyMember",
            type: "Post",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            success: function(res) {
	          console.log('res', res);
                if (res && typeof(res) != undefined) {
                    var result = JSON.parse(res);
                    if (result.status == 200) {
                        var newRes = JSON.parse(result.Data);
                        var address = newRes.address;
                        var pinCode = newRes.pincode;
                        var mobile = newRes.mobile;
                        var email = newRes.email;
                        var name = newRes.fullname;
                        var url = window.location.href;

                        if (sessionStorage.hasOwnProperty("id")) {
                            sessionStorage.removeItem("id");
                        }
                        sessionStorage.setItem("id", newRes.id);

                        $('#username').text(name);

                        if (url.indexOf('updateprofile') == -1) {
                            if (pinCode == "") {
                                window.location.assign("/content/hyundai/in/en/login/my-account/updateprofile.html")
                            } else {
                                //  window.location.assign(url)
                            }
                        } else {}
                    } else {
                        console.log(result)
                        alert("Please Login")
                        window.location.assign("/content/hyundai/in/en/login/login-page.html")
                    }
                } else {
                    console.log(result)
                    alert("Please Login")
                    window.location.assign("/content/hyundai/in/en/login/login-page.html")
                }
            },
            error: function(err) {}
        });
    }
});
