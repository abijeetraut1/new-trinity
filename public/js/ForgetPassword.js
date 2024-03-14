const email = $("#forget-psw-email")[0];
const verificationCode = $("#verification-code")[0];

const newPassword = $("#new-password")[0];
const retypeCode = $("#retype-password")[0];
const confirmCode = $("#confirm-password")[0];

// button
const insertedEmailButton = $("#inserted-email")[0];
const verificationSubmitBtn = $("#verification-submit-btn")[0];
const changeBtn = $("#changeBtn")[0];


// forms
const insertEmailForm = $("#insertEmail")[0];
const verifyCodeForm = $("#verifyCode")[0];
const changePassword = $("#changePassword")[0];

insertedEmailButton.addEventListener("click", async (el) => {
    el.preventDefault();
    if (!email.value) return;

    // axios code
    await axios({
        method: "GET",
        url: `/api/v1/user/forgetPassword/${email.value}`
    }).then(data => {
        insertEmailForm.style.display = "none";
        verifyCodeForm.style.display = "block";
        sessionStorage.setItem("l-v-token", data.data.token);
        sessionStorage.setItem("email", email.value);
    }).catch((err) => {
        console.log(err.response.data.status)
        $(".incorrect-password")[0].style.display = "block";
    })
})

verificationSubmitBtn.addEventListener("click", async (ele) => {
    ele.preventDefault();
    if (!verificationCode.value) return;

    if (parseInt(sessionStorage.getItem("l-v-token")) === parseInt(verificationCode.value)) {
        verifyCodeForm.style.display = "none";
        changePassword.style.display = "block";

        changeBtn.addEventListener("click", async (elem) => {
            elem.preventDefault();
            // if (!newPassword.value && !retypeCode.value || !confirmCode.value) return;
        
            if (newPassword.value === retypeCode.value && newPassword.value === confirmCode.value) {
                await axios({
                    method: "PATCH",
                    url: "/api/v1/user/changePassword",
                    data:{
                        email: sessionStorage.getItem("email"),
                        password: newPassword.value
                    }
                }).then(data => {
                    if(data.data.status === "changed"){
                        sessionStorage.clear();
                        window.location.href = "/login";
                    }
                }).catch(err => {
                    alert("please reload");
                }) 
            }
        })        
    }else{
        $(".wrong-verification-code")[0].style.display = "block";
    }

})

