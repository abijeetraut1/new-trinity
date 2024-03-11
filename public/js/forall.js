// $('#logout')[0].addEventListener('click', async el => {
// function formatNumber(num) {
//     return num.toFixed(2);
// }

async function logout() {
    const logout = await axios({
        method: 'GET',
        url: '/api/v1/user/logout',
    })
    if (logout.data.status === "success") {
        console.log("loggin out")
        window.location.assign('/')
    }
}
// })

if (window.location.pathname.split('/')[1] === "product" && window.location.pathname.split('/')[3] === "order") {
    $('.bi-list, .bi-bag', '#search-button i').css('font-size', '2.3rem');
    if ($('#place-the-order')) {
        if ($('#place-the-order')[0].innerText = 'Place Order') {
            $('#search-button i').css('font-size', '1.3rem');
        } else {
            $('#search-button i').css('font-size', '2.3rem');
        }
    }
    $('.add-cart, .ham-menu').css('overflow', 'hidden');
    $('.header').css('z-index', '25');
} else if (window.location.pathname.split('/')[1] === "product") {
    $('.bi-list, .bi-bag').css('font-size', '2.3rem');
    $('.add-cart, .ham-menu').css('overflow', 'hidden');
}


// for changing the user role
if (window.location.pathname.split('/')[2] === 'dashboard-show-users') {
    const changeUserRole = document.querySelectorAll("#change-user-role");
    const deleteUser = document.querySelectorAll("#delete-user");
    
    changeUserRole.forEach(el => {
        el.addEventListener("click", async (ele) => {
                const changeUserRole = await axios({
                    method: "PATCH",
                    url: el.getAttribute("data-role") === "sub-admin" ? "/api/v1/user/remove-sub-admin" : "/api/v1/user/appoint-sub-admin",
                    data: {
                        id: ele.target.value
                    }
                });

                if(changeUserRole.data.status === 200){
                    // change the button color and text
                    el.style.backgroundColor = el.style.backgroundColor === "red" ? "green" : "red";  
                    el.innerText = el.innerText === "Appoint To Admin" ? "Remove As Admin" : "Appoint To Admin";
                }
            });
    });

    deleteUser.forEach(el => {
        el.addEventListener("click", async (ele) => {
                const deleteUser = await axios({
                    method: "DELETE",
                    url: "/api/v1/user/delete-user",
                    data: {
                        id: ele.target.value
                    }
                });

                if(deleteUser.data.status === 200){
                    alert(deleteUser.data.message)
                }
            });
    });

}


if (window.location.pathname.split('/')[2] === 'dashboard-database-clear') {
    console.log("adsfafd")
    $('#clear-database')[0].addEventListener("click", async () => {
        // dashboard-database-clear
        const deleteUser = await axios.delete("/api/v1/product/deleteAllData");

        if(deleteUser.data.status === 200){
            alert("cleared the database");
            window.location.reload();
        }
    })
}