// const { from } = require("form-data");

if (window.location.pathname === "/adminPannel/upload") {
    const upload = document.querySelector('#upload');
    const form = document.querySelector('#form');
    upload.addEventListener('click', async (e) => {
        const product_name = document.querySelector('#product-name').value;
        const material = document.querySelector('#product-material').value;
        const price = document.querySelector('#product-price').value;
        const productImage = document.querySelector('#product-image').files[0];
        const tags = document.querySelector('#product-tags').value;
        const category = document.querySelector('#product-category').value;

        const reader = new FileReader();
        reader.readAsDataURL(productImage);
        reader.onload = async function () {
            console.log('data', reader.result);
            const imageData = reader.result.split(',')[1]; // Remove the data:image/*;base64, prefix
            // Send the image data to the server using an HTTP POST request
            const data = await axios({
                method: 'POST',
                url: '/api/v1/product/upload-product',
                data: {
                    product_name,
                    material,
                    price,
                    tags,
                    category,
                    imageName: product_name,
                    imagePrice: price,
                    imageData: reader.result,
                }
            })
        }


    })
}

if (window.location.pathname === '/adminPannel/login') {
    const signinButton = document.getElementById('signin');
    signinButton.addEventListener('click', async (e) => {
        const password = document.querySelector('#floatingPassword').value;
        const email = document.querySelector('#floatingInput').value;

        const signinAxios = await axios({
            method: 'POST',
            url: '/api/v1/user/adminLogin',
            data: {
                email,
                password
            }
        })
        console.log(signinAxios);
    })
}


