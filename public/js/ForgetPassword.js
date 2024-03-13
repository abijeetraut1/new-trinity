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

    insertEmailForm.style.display = "none";
    verifyCodeForm.style.display = "block";

    // axios code
    
})

verificationSubmitBtn.addEventListener("click", async (ele) => {
    ele.preventDefault();
    if (!verificationCode.value) return;

    verifyCodeForm.style.display = "none";
    changePassword.style.display = "block";
})

changeBtn.addEventListener("click", async(elem) => {
    elem.preventDefault();
    if (!newPassword.value && !retypeCode.value || !confirmCode.value) return;
    

})