if (window.location.pathname === '/') {
    // overflow-x: hidden;
    $("*").css("overflow-x", "hidden")
    $(".heroSection").css("overflow-x", "initial")
    $(".heroImage").css("overflow-x", "initial")

    $(".form-switch").css("user-select", "none")
}


if (window.location.pathname === '/login' || window.location.pathname === '/Login') {

    document.getElementById('btn-signUp').addEventListener("click", el => {
        $("#loginDiv").fadeOut(700);
        $("#signUpDiv").fadeIn();
    })

    document.getElementById('toLogin').addEventListener("click", el => {
        $("#signUpDiv").fadeOut(700);
        $("#loginDiv").fadeIn();
    })

    function changeLogin() {
        $("#loginDiv").fadeOut(700);
        $("#signUpDiv").fadeIn();
    }

    function changeSignup() {
        $("#signUpDiv").fadeOut(700);
        $("#loginDiv").fadeIn();
    }

    // extracting login and signin information
    const button = document.querySelectorAll('.btn-success');
    button.forEach(el => {
        el.addEventListener('click', async (e) => {
            // console.log(el);
            // let sendToDb;

            if (el.innerHTML === 'Sign Up') {
                const email = document.querySelector('.signup-email').value;
                const password = document.querySelector('.signup-password').value;
                const name = document.querySelector('.signup-name').value;


                let sendToDb = await axios({
                    method: 'POST',
                    url: '/api/v1/user/signup',
                    data: {
                        email,
                        password,
                        name
                    }
                })
                if (sendToDb.data.status === "success") {
                    location.assign('/');
                } else {
                    $(`.incorrect-email`)[0].style.display = "block";
                }

            } else if (el.innerHTML === 'Login') {
                const email = document.querySelector('.login-email').value;
                const password = document.querySelector('.login-password').value;

                sendToDb = await axios({
                    method: 'POST',
                    url: '/api/v1/user/login',
                    data: {
                        email,
                        password
                    }
                })
                if (sendToDb.data.status === "success") {
                    location.assign('/');
                } else {
                    $(`.incorrect-password`)[0].style.display = "block";
                    $(`#password`)[0].value = "";
                }
            }
        })
    })
}

$('#search-button')[0].addEventListener('click', el => {
    if ($('#search')[0].value === '') {
        alert('please Enter anything');
    } else {
        window.location.assign(`/searched/${$('#search')[0].value.replaceAll(' ', '-')}`);
    }
})


// will be modified
if ($('#place-the-order')[0]) {
    $('#place-the-order')[0].addEventListener('click', async el => {
        const email = $('#order-email')[0].value;
        const number = $('#order-number')[0].value;
        const name = $('#order-username')[0].value;
        const area = $('#order-area')[0].value;
        const address = $('#order-address')[0].value;
        const city = $('#select')[0].value;
        const productId = sessionStorage.getItem('productId');
        const size = sessionStorage.getItem('tshirt_size')
        const color = sessionStorage.getItem('tshirt_color')
        const qnt = sessionStorage.getItem('tshirt_qty')

        if (!email || !city || !address || !area || !name || !number) {
            alert('please fill the information carefully')
        }

        const sendData = await axios({
            method: 'POST',
            url: '/api/v1/product/orderrecord',
            data: {
                email,
                number,
                name,
                area,
                address,
                city,
                productId,
                size,
                qnt,
                color
            }
        })

        if (sendData.data.status === "success") {
            alert('your order is on the way');
            window.location.assign("/delivered");
        }
    })
}

const countReferralClick = 0;
if ($('#apply-referral-code')[0]) {
    $('#apply-referral-code')[0].addEventListener('click', async el => {
        const referralCode = $('#referralCode')[0].value;

        const applyRefer = await axios({
            method: 'POST',
            url: "/api/v1/user/checkCode",
            data: {
                referralCode
            }
        })

        if (applyRefer.data.status === 'success') {
            if ((window.location.pathname.split("/")[1] === "product" && window.location.pathname.split("/")[2] === "order")) {
                if (countReferralClick < 1) {
                    if (applyRefer.data.checkUser.activateReferral === true || applyRefer.data.checkUser.activateReferral) {
                        $("#item-price")[0].innerText = ($("#item-price")[0].innerText * 1) - ($("#item-price")[0].innerText * 1 / 100 * applyRefer.data.checkUser.cutoff);
                        countReferralClick++;
                    } else {
                        alert("code did not matched");
                    }
                } else {
                    alert("already applied");
                }
            } else {
                if (countReferralClick < 1) {
                    if (applyRefer.data.checkUser.activateReferral === true || applyRefer.data.checkUser.activateReferral) {
                        $("#total-price")[0].innerText = ($("#total-price")[0].innerText * 1) - ($("#total-price")[0].innerText * 1 / 100 * applyRefer.data.checkUser.cutoff);
                        $("#item-price")[0].innerText = ($("#item-price")[0].innerText * 1) - ($("#item-price")[0].innerText * 1 / 100 * applyRefer.data.checkUser.cutoff);
                        countReferralClick++;
                    } else {
                        alert("code did not matched");
                    }
                } else {
                    alert("already applied");
                }
            }
        } else {
            alert("code did not matched");
        }

    })
}

// if ((window.location.pathname.split("/")[1] === "product" && window.location.pathname.split("/")[2] === "order")) {
//     // function to change color and remove the previous color 
//     const choose_size = document.querySelectorAll('.size');

//     buttonColor = (onlyClick, className) => {
//         onlyClick.forEach(el => {
//             el.addEventListener('click', e => {
//                 onlyClick.forEach(ele => {
//                     if (ele.classList.contains(className)) {
//                         ele.classList.remove(className)
//                     }
//                 })
//                 return el.classList.toggle(className);
//             })
//         })
//     }

//     buttonColor(choose_size, 'changeColor');
//     $('#designImageDisplay')[0].src = sessionStorage.getItem('designedFrontView');

//     if ($("#directDesignPlaceOrder")) {
//         $("#directDesignPlaceOrder")[0].addEventListener('click', async el => {
//             const email = $('#order-email')[0].value;
//             const number = $('#order-number')[0].value;
//             const name = $('#order-username')[0].value;
//             const area = $('#order-area')[0].value;
//             const address = $('#order-address')[0].value;
//             const city = $('#select')[0].value;
//             const size = $(".changeColor")[0].innerText;
//             const front = sessionStorage.getItem('designedFrontView');
//             const back = sessionStorage.getItem('designedBackView');
//             const sticker = sessionStorage.getItem('image');
//             const material = sessionStorage.getItem('material');

//             let data = {
//                 email: email,
//                 number: number,
//                 name: name,
//                 area: area,
//                 address: address,
//                 city: city,
//                 size: size,
//                 front: front,
//                 back: back,
//                 material: material
//             }
//             if (sticker != null) {
//                 data.sticker = sticker;
//             }

//             const sendData = await axios({
//                 method: 'POST',
//                 url: '/api/v1/product/directorderrecord',
//                 data
//             })

//             if (sendData.data.status === "success") {
//                 alert('your order is on the way');
//                 sessionStorage.clear();
//                 window.location.assign('/');
//             } else {
//                 alert('please fill the information carefully')
//             }
//         })
//     }
// }

if (window.location.pathname.split("/")[1] === "product" && window.location.pathname.split("/")[3] === "order") {
    // function to change color and remove the previous color 
    const choose_size = document.querySelectorAll('.size');

    // buttonColor = (onlyClick, className) => {
    choose_size.forEach(el => {
        el.addEventListener('click', e => {
            choose_size.forEach(ele => {
                if (ele.classList.contains('changeColor')) {
                    ele.classList.remove('changeColor')
                }
            })
            return el.classList.toggle('changeColor');
        })
    })

    if ($("#place-the-order")) {
        $("#place-the-order")[0].addEventListener('click', async el => {
            if ($("#payment-proof")[0].files[0]) {
                const email = $('#order-email')[0].value;
                const number = $('#order-number')[0].value;
                const name = $('#order-username')[0].value;
                const area = $('#order-area')[0].value;
                const address = $('#order-address')[0].value;
                const city = $('#select')[0].value;
                const size = $(".changeColor")[0].innerText;
                const payment = $("#payment-proof")[0].files[0];
                const reader = new FileReader();
                reader.addEventListener('load', async function () {
                    const base64String = reader.result;
                    let data = {
                        email: email,
                        number: number,
                        name: name,
                        area: area,
                        address: address,
                        city: city,
                        size: size,
                        paymeny: base64String
                    }

                    const sendData = await axios({
                        method: 'POST',
                        url: '/api/v1/product/directorderrecord',
                        data
                    })
                    if (sendData.data.status === "success") {
                        sessionStorage.clear();
                        window.location.assign('/delivered');
                    } else {
                        alert('please fill the information carefully');
                    }

                })
                reader.readAsDataURL(payment);
            } else {
                alert("please send the payment proof");
            }
        })

    }
}




// wait
if (window.location.pathname.split("/")[1] === "product" && window.location.pathname.split("/")[2] === "order") {
    $('#designImageDisplayBack')[0].src = sessionStorage.getItem('designedFrontView');
    $('#designImageDisplayFront')[0].src = sessionStorage.getItem('designedBackView');
    $('#material')[0].innerText = sessionStorage.getItem('material');
    $('.bi-bag').css("font-size", "1.3rem")

    // function to change color and remove the previous color 
    const choose_size = document.querySelectorAll('.size');

    // buttonColor = (onlyClick, className) => {
    choose_size.forEach(el => {
        el.addEventListener('click', e => {
            choose_size.forEach(ele => {
                if (ele.classList.contains('changeColor')) {
                    ele.classList.remove('changeColor')
                }
            })
            return el.classList.toggle('changeColor');
        })
    })
    // }

    // buttonColor(choose_size, 'changeColor');

    if ($("#directDesignPlaceOrder")) {
        $("#directDesignPlaceOrder")[0].addEventListener('click', async el => {
            const email = $('#order-email')[0].value;
            const number = $('#order-number')[0].value;
            const name = $('#order-username')[0].value;
            const area = $('#order-area')[0].value;
            const address = $('#order-address')[0].value;
            const city = $('#select')[0].value;
            const size = $(".changeColor")[0].innerText;
            const front = sessionStorage.getItem('designedFrontView');
            const back = sessionStorage.getItem('designedBackView');
            const material = sessionStorage.getItem('material');
            const sticker = $("#inserted-stickers")[0].files;


            if ((email === '') && (number === '') && (name === '') && (area === '') && (address === '') && (city === '') && (size === '')) {
                alert('please fill the information carefully');
            }

            const designs = new FormData();
            designs.append("email", email);
            designs.append("number", number);
            designs.append("name", name);
            designs.append("area", area);
            designs.append("address", address);
            designs.append("city", city);
            designs.append("size", size);
            designs.append("front", front);
            designs.append("back", back);
            designs.append("material", material);

            for (let index = 0; index < sticker.length; index++) {
                designs.append("sticker", sticker[index]);
            }


            const sendData = await axios({
                method: 'POST',
                url: '/api/v1/product/directorderrecord',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: designs
            })
            if (sendData.data.status === "success") {
                // sessionStorage.clear();
                // window.location.assign('/delivered');
            }
        })
    }
}


if (window.innerWidth <= 700) {
    $("#choose_size").css("overflow", "auto");
    $(".delivery-section").css("flex-direction", "column");
    const holdnode = $(".checkout-product-display");
    $(".checkout-product-display")[0] = $(".checkout-product-display")[1];
    // $(".checkout-product-display")[1] = holdnode[0];
    // $(".checkout-product-display")[1];
}

if (window.location.pathname === '/delivered') {
    if (window.innerWidth < 700) {
        $('#gifimage').css("width", "80%")
    }
}



if(window.location.pathname === "/login"){
    const pswShowBtnSignup = $("#password-signup-show")[0];
    pswShowBtnSignup.addEventListener("click", (e) => {
        e.preventDefault();
        if ($("#password-signup").attr("type") === "password") {
            $("#password-signup").attr("type", "text");
        } else {
            $("#password-signup").attr("type", "password");
        }
    });

    const pswShowBtnLogin = $("#password-login-show")[0];
    pswShowBtnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        if ($("#password-login").attr("type") === "password") {
            $("#password-login").attr("type", "text");
        } else {
            $("#password-login").attr("type", "password");
        }
    });
}