document.querySelector('.bi-list').addEventListener("click", el => {
    if (document.querySelector('.hidden-part').classList.contains('isHidden')) {
        document.querySelector('.hidden-part').classList.toggle('isHidden');
        document.querySelector('.hidden-part').classList.remove('adder');
        document.querySelector('.hidden-part').classList.toggle('active');
        // alert('active');
        gsap.fromTo('.active', {
            display: 'block',
            height: '0px'
        }, {
            height: '170px',
            duration: .3,
            ease: Power0.easeNone
        });
    } else if (document.querySelector('.hidden-part').classList.contains('active')) {
        // alert('hah')
        document.querySelector('.hidden-part').classList.add('adder');
        document.querySelector('.hidden-part').classList.toggle('isHidden');
        document.querySelector('.hidden-part').classList.toggle('active');
        gsap.fromTo('.isHidden', {
            display: 'block',
            height: '170px'
        }, {
            height: '0px',
            duration: .3,
            ease: Power0.easeNone
        });
    }
});

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
        window.location.assign('/')
    }
}
// })

if (window.location.pathname === '/design' || window.location.pathname.split('/')[1] === "product") {
    $('.bi-list, .bi-bag', '#search-button i').css('font-size', '2.3rem');
    if($('#place-the-order')[0].innerText === 'Place Order'){
        $('#search-button i').css('font-size', '1.3rem');
    }else {
        $('#search-button i').css('font-size', '2.3rem');
    }
    $('.add-cart, .ham-menu').css('overflow', 'hidden');
    $('.header').css('z-index', '25');
} else if (window.location.pathname.split('/')[1] === "product") {
    $('.bi-list, .bi-bag').css('font-size', '2.3rem');
    $('.add-cart, .ham-menu').css('overflow', 'hidden');
}

if($('#loged-in')[0]){
    document.querySelector('#loged-in').addEventListener('click', el => {
        $('#logout')[0].classList.toggle('logout-active')
    })
}

if(window.innerWidth >= 640){
    $('#mobile-only').css('display',"none");
}

