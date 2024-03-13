(function ($) {
    "use strict";

    // Sidebar Toggler 
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

})(jQuery);

const account = document.querySelector('.display-logout-btn');
const loggout = document.querySelector('.Logout');
// account.addEventListener('click', () => {
//     loggout.classList.toggle('active');
// })

// const activenav = document.querySelectorAll('.nav-link');
// if (window.location.pathname == '/dashboard-arrived') {
//     activenav[0].classList.add('active');
//     activenav[1].classList.remove('active');
// } else if (window.location.pathname == '/dashboard-done') {
//     activenav[1].classList.add('active');
//     activenav[0].classList.remove('active');
// }

if (window.location.pathname == '/dashboard-arrived') {
    console.log("first")
    const productSendCheckbox = document.getElementById('order_send_status');
    productSendCheckbox.addEventListener('click', async el => {

        const postData = await axios({
            method: "patch",
            url: "api/v1/product/order-send-to-user",
            data: {
                id: productSendCheckbox.value
            }

        })
        if (postData.data.status === "success") {
            window.location.reload();
        }
    })
}

deletefunc = async () => {
    // live delete the element using element.delete

    const deleteDataDbId = document.getElementById('dbID').innerText;
    const postData = await axios({
        method: "DELETE",
        url: "/api/v1/product/cartDelete",
        data: {
            deleteDataDbId
        }
    })
    console.log(postData)
    if (postData.data.status === 'success') {
        // window.location.reload();
    } else {
        alert('unable to delete the cart item');
    }
}

if (window.location.pathname == '/dashboard-price') {
    const savePrice = document.querySelectorAll('#save-price');
    savePrice.forEach(el => {
        el.addEventListener('click', async ele => {
            const id = el.parentElement.querySelector('#item-id').innerText;
            const price = el.parentNode.parentElement.parentElement.querySelector('#price-no').value;

            const updateData = await axios({
                method: "PATCH",
                url: "/api/v1/product/updatePrice",
                data: {
                    id,
                    price
                }
            })
            if (updateData.data.status === "success") {
                window.location.reload();
            } else {
                alert('please insert a number');
            }

        })
    })
}

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
            alert('your order is on the way')
        }
    })
}

if (window.location.pathname.split("/")[2] === "dashboard_products") {
    const order_send_status = document.querySelectorAll("#order_send_status");

    order_send_status.forEach(el => {
        el.addEventListener("change", async () => {
            console.log(el.value)
            const productSend = await axios({
                method: "PATCH",
                url: "/api/v1/admin_data_controller/sended_product_to_user",
                data: {
                    id: el.value
                }
            })

            console.log(productSend)
        })
    })
}