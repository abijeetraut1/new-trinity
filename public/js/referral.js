if (window.location.pathname === '/dashboard-referralActivate') {
    console.log($('#find-referral-user')[0]);
    $('#find-referral-user')[0].addEventListener('click', async el => {
        const email = $('#find-referral-user-email')[0].value;
        const findUser = await axios({
            method: 'POST',
            url: '/api/v1/user/finduser',
            data: {
                email
            }
        })

        if (findUser.data.status === "success") {
            $('.container-fluid')[1].innerHTML = `<div class="row pt-4 class-align-items d-flex" style="padding : 0 2rem; font-size: 1.2rem;">
            <div class="container-of-name-and-image d-flex align-items-center justify-content-space-between">
            <div class="image-of-container"><h4 id="name" style="font-size: 1.1rem; ">${findUser.data.checkUser.name}</h4></div></div>
            <div class="container-of-name-and-image d-flex align-items-center justify-content-space-between">
            <div class="image-of-container"><h4 id="name" style="font-size: 1.1rem; ">${findUser.data.checkUser.email}</h4></div></div>
            <div class="container-of-name-and-image d-flex align-items-center justify-content-space-between">
            <h4 id="name" style="font-size: 1.1rem; ">${findUser.data.checkUser.cutoff}</h4>
            
            <div class="image-of-container">
            <input id="cutoff" type="number" name="" placeholder="Referral Percentage" style="margin-left:.5rem; padding-left:0.4rem">
            </div></div>
            <div class="container-of-name-and-text d-flex justify-content-space-around">
            <div class="image-of-container d-flex justify-content-center align-items-center" style="height: fit-content; padding: 1rem 1rem;">
            <button class="send-of-order" id="deactivate-referral-quote">Deactivate </button>
            <button class="send-of-order" id="change-referral-quote" style="margin-left:.3rem;">Activate </button>
            <p id="referral-user-id" style="display:none;">${findUser.data.checkUser._id}</p></div></div></div>`
            
            
            // 640d96d3bc6d964f583b6c42
            if ($('#change-referral-quote')[0]) {
                $('#change-referral-quote')[0].addEventListener('click', async ele => {
                    const userid = $('#referral-user-id')[0].innerText;
                    const cutoff = $('#cutoff')[0].value;

                    const updateCut = await axios({
                        method: 'PATCH',
                        url: '/api/v1/user/activateCutoff',
                        data: {
                            userid,
                            cutoff
                        }
                    })

                    if(updateCut.data.status === 'success'){
                        alert(`updated referral ${cutoff}`)
                    }
                })


                $('#deactivate-referral-quote')[0].addEventListener('click', async ele => {
                    const userid = $('#referral-user-id')[0].innerText;
                   

                    const updateCut = await axios({
                        method: 'PATCH',
                        url: '/api/v1/user/deactivateCutoff',
                        data: {
                            userid
                        }
                    })
                    console.log(updateCut)
                })

            }

        }else {
            alert("please check the email again!");
        }
    })
}