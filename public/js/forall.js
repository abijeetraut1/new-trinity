// $('#logout')[0].addEventListener('click', async el => {
// function formatNumber(num) {
//     return num.toFixed(2);
// }

async function logout (){
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
    if($('#place-the-order')){   
        if($('#place-the-order')[0].innerText = 'Place Order'){
            $('#search-button i').css('font-size', '1.3rem');
        }else {
            $('#search-button i').css('font-size', '2.3rem');
        }
    }
    $('.add-cart, .ham-menu').css('overflow', 'hidden');
    $('.header').css('z-index', '25');
} else if (window.location.pathname.split('/')[1] === "product") {
    $('.bi-list, .bi-bag').css('font-size', '2.3rem');
    $('.add-cart, .ham-menu').css('overflow', 'hidden');
}


if(window.innerWidth >= 640){
    $('#mobile-only').css('display',"none");
}

