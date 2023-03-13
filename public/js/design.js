// if (window.innerWidth <= 700) {
$('.bi-search').css("font-size", "2.2rem")
// }

const clothType = document.querySelector('#cost-selector');
$("#base_cost")[0].innerHTML = `&#8377; ${clothType.value}`;
sessionStorage.setItem("material", $("#cost-selector option:selected").text());

function clickChange() {
    sessionStorage.setItem('material', $("#cost-selector option:selected").text());
    $("#base_cost")[0].innerHTML = `&#8377; ${clothType.value}`;

}

if (window.location.pathname === '/design') {
    if (window.innerWidth <= 700) {
        $('#product').css('height', '500px');
        $('#product').css('width', '100%');
        $('#text').css('height', 'fit-content');
    }
}


if (window.innerWidth <= 700) {
    alert('PLEASE USE THE DESKTOP TO DESIGN')
}




const productColorChooser = document.querySelectorAll('#product_color_chooser div');
const productImageDisplay = document.querySelector('#product');
const change_T_shirt = document.querySelectorAll('#change-t-shirt-button');
const chooserProduct = document.querySelector('#chooseProduct');
const parentElement = document.querySelector('#productDiv');
const deleteElement = document.getElementById('delElem');
const btn = document.querySelectorAll('.changeView'); // -- updated
const colors = document.querySelectorAll('#product_color_chooser div'); // -- updated



// identifies the tshirt front view or back view
let tshirtView = 'front';
displayRespective = (tshirtView) => {
    if (tshirtView === 'front') {
        $('.front').css("display", "block");
        $('.back').css("display", "none");
    } else if (tshirtView === 'back') {
        $('.front').css("display", "none");
        $('.back').css("display", "block");
    }
}


sessionStorage.setItem('selected_type', 'tshirt'); // saves names in session storage for futher refrence
// sessionStorage.setItem('buttons_class', document.querySelector('')); 

// let first = product.style.backgroundColor;

// change tshirt view               -- updated section      -- transferred
btn.forEach(ele => {
    ele.addEventListener('click', el => {
        if (!ele.classList.contains('btn-toggle')) {
            btn.forEach(elem => {
                if (elem.classList.contains('btn-toggle')) {
                    elem.style.color = 'black';
                    elem.classList.remove('btn-toggle')
                    elem.classList.add('btn-default');
                }
            })
            ele.classList.remove('btn-default');
            ele.classList.add('btn-toggle');
            ele.style.color = 'white';

            if (ele.innerText === 'Back') {
                tshirtView = 'back';
                displayRespective(tshirtView);
                if (productImageDisplay.classList.contains('rotateImageFront')) {
                    productImageDisplay.classList.remove('rotateImageFront')
                }
                productImageDisplay.classList.add('rotateImageBack');
                // console.log($('.front').css('dispaly', 'none'))
                setTimeout(() => {
                    // url('product_img/tshirt_front.png')
                    return productImageDisplay.style.backgroundImage = `url(product_img/${sessionStorage.getItem('selected_type')}_back.png)`;
                }, 850)
                if ($('.clicked-item')[0]) {
                    $('.clicked-item')[0].classList.remove('clicked-item');
                }
            } else if (ele.innerText === 'Front') {
                tshirtView = 'front';
                displayRespective(tshirtView);

                if (productImageDisplay.classList.contains('rotateImageBack')) {
                    productImageDisplay.classList.remove('rotateImageBack')
                }
                productImageDisplay.classList.add('rotateImageFront');
                setTimeout(() => {
                    return productImageDisplay.style.backgroundImage = `url(product_img/${sessionStorage.getItem('selected_type')}_front.png)`;;
                }, 850)

                if ($('.clicked-item')[0]) {
                    $('.clicked-item')[0].classList.remove('clicked-item');
                }
            }
        }
    })
})



// change t-shirt color   -- new code
let holdClickedOne = '#ffffff';
productColorChooser.forEach(el => {
    el.addEventListener('click', e => {
        holdClickedOne = el.style.background;
    })
});
productColorChooser.forEach(el => { // -- new code
    el.addEventListener('mouseover', e => {
        product.style.backgroundColor = el.style.background;
    })
    el.addEventListener('mouseout', e => {
        product.style.backgroundColor = holdClickedOne;
    })
});


const close = document.querySelector('.choose-product-close');

changePosition = (top_px, left_px) => {
    parentElement.style.top = top_px + 'px';
    parentElement.style.left = left_px + 'px';
}


// it reset the button classes when types of items is chaged
resetButton = btn => { // --- new code  
    $(".changeView").css("display", "block");
    if (btn[1].classList[2] === 'btn-toggle') {
        btn[0].classList.add('btn-toggle');
        btn[0].classList.remove('btn-default');
        btn[0].style.color = 'white';
        btn[1].classList.add('btn-default');
        btn[1].classList.remove('btn-toggle');
        btn[1].style.color = 'black';
    }
}

// change the product image
chooserProduct.addEventListener('click', el => {
    change_T_shirt.forEach(el => {
        el.addEventListener('click', (e) => {
            const image = el.parentNode.querySelector(`.productCard center img`).src;
            var chooseProductType = document.querySelectorAll(`.productCard center img`);
            var separator = 'product_img/';
            const index = image.indexOf(separator);
            const selectedImage = image.slice(index + separator.length);
            product.style.backgroundImage = `url("/product_img/${selectedImage}")`;
            // console.log(el.parentElement.querySelector('p').innerHTML)

            chooserProduct.innerHTML = el.parentElement.querySelector('p').innerHTML + `<i class="bi bi-chevron-down"></i>`;

            switch (selectedImage) {
                case 'hsrn_tshirt_front.png':
                    $("#sideViewOpt").css('display', 'block');
                    console.log(el.value)

                    changePosition(110, 145);
                    sessionStorage.setItem('selected_type', el.value);

                    resetButton(btn);
                    break;

                case 'women_tee_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(130, 140);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'full_sleeve_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(160, 140);
                    baseCost.innerText = `रु1500`;
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'women_full_sleeve_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(150, 140);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'v_neck_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(130, 140);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'hoodie_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(150, 135);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'sweatshirt_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(120, 140);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'tank_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(190, 145);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'kids_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(135, 145);
                    sessionStorage.setItem('selected_type', el.value);
                    resetButton(btn);
                    break;

                case 'oversize_tshirt_front.png':
                    $("#sideViewOpt").css('display', 'block');

                    changePosition(150, 135);
                    sessionStorage.setItem('selected_type', el.value);
                    $(".changeView").css("display", "none");

                    break;

                case 'joggers_front.png':
                    $("#sideViewOpt").css('display', 'none');
                    changePosition(150, 275);
                    sessionStorage.setItem('selected_type', el.value);
                    $(".changeView").css("display", "none");
                    break;

                case 'throw_pillow.png':
                    $("#sideViewOpt").css('display', 'none');
                    changePosition(170, 110);
                    sessionStorage.setItem('selected_type', el.value);
                    $(".changeView").css("display", "none");
                    break;
            }
        })
    })
})

// apply the image to the t-shirt
const addImage = document.querySelector('#addImage');
parentElement.addEventListener('mouseover', el => {
    parentElement.style.border = '2px solid black';
})

// let countSessionStorageSticker = 0;
addImage.addEventListener('input', el => {
    const file = addImage.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function () {
        const base64String = reader.result;
        const createImg = document.createElement('img');
        createImg.classList.add('newImg', `${$('.btn-toggle')[0].innerText.toLowerCase()}`);
        createImg.src = base64String;
        parentElement.insertBefore(createImg, parentElement.children[1]);

        sessionStorage.setItem(`image`, base64String);

        const newImg = document.querySelectorAll('.newImg');
        newImg.forEach((ele, i) => {
            // countSessionStorageSticker++;
            deleteElement.style.display = 'block';

            parentElement.childNodes.forEach(tshirt_text_click => {
                tshirt_text_click.addEventListener('click', el => {
                    parentElement.childNodes.forEach((ele, i) => {
                        if (i == parentElement.children.length) return;
                        if (parentElement.children[i].classList.contains('clicked-item')) {
                            parentElement.children[i].classList.remove('clicked-item');
                        }
                    })
                    tshirt_text_click.classList.add('clicked-item');
                    if (tshirt_text_click.classList.contains('clicked-item')) {
                        document.querySelector('#myRange_size').addEventListener('input', clicked => {
                            document.querySelector('#rotate_val_size').value = clicked.target.value;
                            $('.clicked-item').css("height", `${clicked.target.value}rem`)
                        })
                    }
                })
            })

            moveitem(ele)
        })
    });

    // Start reading the file as a data URL
    reader.readAsDataURL(file);

})

const spanParenet = document.querySelector('#productDiv');
createSpaner = classes => {
    const createSpan = document.createElement(`span`);
    createSpan.classList.add(classes);
    spanParenet.insertBefore(createSpan, spanParenet.children[0]);
}


// move item position when click and drag
moveitem = (element) => {
    let initialX, initialY;
    let currentX, currentY;
    let xOffset = 0,
        yOffset = 0;
    let isDragging = false;

    // Add event listener for mousedown event
    element.addEventListener("mousedown", dragStart);

    // Add event listener for mousemove event
    document.addEventListener("mousemove", drag);

    // Add event listener for mouseup event
    document.addEventListener("mouseup", dragEnd);

    // Define dragStart function
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === element) {
            isDragging = true;
        }
    }

    // Define drag function
    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, element);
        }
    }

    // Define dragEnd function
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }

    // Define setTranslate function
    function setTranslate(xPos, yPos, el) {
        if (xPos >= 204) {
            // console.log(el)
            xPos -= el.offsetWidth;
            return el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        } else if (xPos <= -50) {
            xPos = 0;
            return el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        } else if (yPos >= 258) {
            yPos -= el.offsetHeight;
            return el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        } else if (yPos <= -27) {
            yPos = 0;
            return el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        } else {
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }
    }
}

// add text
createSpan = (element, className, parent) => {
    const elementCreate = document.createElement(element);
    elementCreate.classList.add(className);
    parent.insertBefore(elementCreate, parent.children[0]);

};

const addText = document.querySelector('#addText');



addText.addEventListener('click', el => {
    let createRemovalbeDiv = document.createElement(`p`);
    
    
    
    createRemovalbeDiv.classList.add('tshirt-text', `${$('.btn-toggle')[0].innerText.toLowerCase()}`);




    createRemovalbeDiv.innerHTML = 'TEXT';

    parentElement.insertBefore(createRemovalbeDiv, parentElement.children[0]);

    const tshirt_text = document.querySelector('.tshirt-text');
    tshirt_text.style = "position: absolute; padding: .5rem;";
    moveitem(tshirt_text);

    // console.log(tshirt_text.length)
    deleteElement.style.display = 'block';


    parentElement.childNodes.forEach(tshirt_text_click => {
        tshirt_text_click.addEventListener('click', el => {
            parentElement.childNodes.forEach((ele, i) => {
                if (i == parentElement.children.length) return;
                if (parentElement.children[i].classList.contains('clicked-item')) {
                    parentElement.children[i].classList.remove('clicked-item');
                }
            })
            tshirt_text_click.classList.add('clicked-item');
            if (tshirt_text_click.classList.contains('clicked-item')) {
                const elementCreate = document.createElement('span');
                const elementCreateBtag = document.createElement('b');
                elementCreate.classList.add(['arrow'], ['up-arrow']);
                elementCreateBtag.innerText = '↖';
                parentElement.insertBefore(elementCreate, parentElement.children[0]);
                // createSpan('span', 'arrow up-left', parentElement);
            }
        })
    })

    // change the text to bold
    document.querySelector('#bold').addEventListener('click', el => {
        tshirt_text.classList.toggle('bold');
    })

    // change teh text to italic
    document.querySelector('#italics').addEventListener('click', el => {
        tshirt_text.classList.toggle('italic');
    })

    // changing the text form input text
    document.querySelector('#changeText').addEventListener('input', el => {
        $('.clicked-item')[0].innerHTML = el.target.value;
    })

    // changing the font-size
    document.querySelector('#fontSize').addEventListener('change', el => {
        tshirt_text.style.fontSize = el.target.value;
    })

    // changing text color
    document.querySelector('#colorChooser').addEventListener('change', el => {
        // $('#colorChooser')[0].style.backgroundColor;
        // console.log(tshirt_text);
        $(".clicked-item").css('color', `${el.target.value}`);
    })



    // dispalying the range value rotation
    document.querySelector('#myRange').addEventListener('input', el => {
        tshirt_text.style.rotate = el.target.value + 'deg';
        // $(".clicked-item").css('rotate',`${el.target.value} + deg`);
        document.querySelector('#rotate_val').value = el.target.value;
    })

    // dispalying the range value text spacing
    document.querySelector('#myRange_textspacing').addEventListener('input', el => {
        tshirt_text.style.letterSpacing = el.target.value + 'px';
        document.querySelector('#rotate_val_textspacing').value = el.target.value;
    })
})



const sellThis = document.querySelector('#saveProductDesign');
var divToCapture = document.getElementById('product');

// sell this button events
if (!($("#for-admin-only")[0])) {

    document.querySelector('#sellThis').addEventListener('click', el => {
        gsap.fromTo('.extracting-design', {
            display: 'flex',
            y: '-100'
        }, {
            y: '-50px',
            duration: 0.5,
            ease: Power0.easeNone
        });
        setTimeout(() => {

            parentElement.style.borderColor = 'transparent';
            if (document.querySelector('.tshirt-text')) {
                document.querySelector('.tshirt-text').style.borderColor = 'transparent';
            }
            html2canvas(divToCapture).then(function (canvas) {
                html2canvas(document.getElementById("product")).then(function (canvas) {
                    var img = canvas.toDataURL('image/png');
                    console.log('buttonimage', img)
                    sessionStorage.setItem(`designed${$('.btn-toggle')[0].innerText}View`, img); // jun view set bhako xa tai ko image linxa
                    if (!($('.btn-toggle')[0].innerText === 'Front')) {
                        $('.front').css("display", "block");
                        $('.back').css("display", "none");
                        productImageDisplay.style.backgroundImage = `url("product_img/${sessionStorage.getItem('selected_type')}_front.png")`;
                        html2canvas(divToCapture).then(function (canvass) {
                            html2canvas(document.getElementById("product")).then(function (canvass) {
                                var backImg = canvass.toDataURL('image/png');
                                console.log('! === front', backImg)
                                sessionStorage.setItem('designedFrontView', backImg); // save the tshirt front view in the local storage
                                productImageDisplay.style.backgroundImage = `url("product_img/${sessionStorage.getItem('selected_type')}_back.png")`;
                            });
                        });
                    } else if (!($('.btn-toggle')[0].innerText === 'Back')) {
                        $('.front').css("display", "none");
                        $('.back').css("display", "block");
                        productImageDisplay.style.backgroundImage = `url("product_img/${sessionStorage.getItem('selected_type')}_back.png")`;
                        html2canvas(divToCapture).then(function (canvass) {
                            html2canvas(document.getElementById("product")).then(function (canvass) {
                                var backImg = canvass.toDataURL('image/png');
                                console.log('! === back', backImg)
                                sessionStorage.setItem('designedBackView', backImg); // save the tshirt front view in the local storage
                                productImageDisplay.style.backgroundImage = `url("product_img/${sessionStorage.getItem('selected_type')}_front.png")`;
                            });
                        });
                    }
                });
                return;
            });
        }, 1000);

        setTimeout(() => {
            gsap.fromTo('.extracting-design', {
                display: 'flex',
                y: '-50'
            }, {
                y: '-100px',
                duration: 0.5,
                ease: Power0.easeNone
            });
            window.location.assign(`/product/order/${sessionStorage.getItem('material')}`)
        }, 5000);
        return;
    })
}

// will be updated later
// send the image and content to database
if ($("#for-admin-only")[0]) {

    document.getElementById('saveProductDesign').addEventListener('click', async el => {
        const title = document.getElementById('ptitle').value;
        const description = document.getElementById('pdescription').value;
        const tags = document.getElementById('tags').value;
        const slug = document.getElementById('chooseUrl').value;
        const markupPrice = document.getElementById('markupPrice').value;

        let data = {
            title,
            description,
            slug,
            markupPrice,
            tags
        }

        parentElement.childNodes.forEach((el, i) => {
            if (i == 0) console.log(el);
            else {
                if (el.classList[0] === 'tshirt-text') {
                    let fontColor = document.querySelector("#colorChooser").value;
                    let fontSize = document.querySelector("#fontSize").value;
                    let letterSpacing = document.querySelector("#rotate_val_textspacing").value;
                    let rotateText = document.querySelector("#rotate_val").value;

                    // attach those item with other objects
                    console.log(fontColor, fontSize, letterSpacing, rotateText)
                    data.fontColor = fontColor;
                    data.fontSize = fontSize;
                    data.letterSpacing = letterSpacing;
                    data.rotateText = rotateText;
                    data.frontImage = sessionStorage.getItem('designedFrontView');
                    data.backImage = sessionStorage.getItem('designedBackView');

                } else if (el.classList[0] === 'newImg') {
                    data.sticker = sessionStorage.getItem('image');
                    data.frontImage = sessionStorage.getItem('designedFrontView');
                    data.backImage = sessionStorage.getItem('designedBackView');
                }
            }
        })

        const postData = await axios({
            method: "POST",
            url: "/api/v1/product/design/upload",
            data
        })
        if (postData.data.status = "success") {
            sessionStorage.removeItem('image');
            window.location.assign(`${window.origin}/product/${slug}`)
        } else {
            alert('plese fill up the information carefully');
        }
        console.log(postData);
    })
}






// deleting the item
deleteElement.addEventListener('click', el => {
    parentElement.childNodes.forEach((ele, i) => {
        if (i == parentElement.children.length) return;
        if (parentElement.children[i].classList.contains('clicked-item')) {
            parentElement.removeChild(parentElement.children[i]);
        }
    })
})





// delete the sessionStorage content when page reload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        console.log('cleared');
        sessionStorage.removeItem('image');
        sessionStorage.removeItem('selectedImage');
    }
};



// form inline html 
if ($(".collapse").is(":visible")) {
    $(".cart-button-mobile").css('display', 'none');
    $(".cart-button-pc").css('display', '');
} else {
    $(".cart-button-pc").css('display', 'none');
    $(".cart-button-mobile").css('display', '');
}
var retrievedCart = localStorage.getItem('cart');
var json = JSON.parse(retrievedCart);
if (json != null) {
    $(".cartItems").html(json.length);
    if (json.length > 0) {
        $(".cartItems").css('display', '');
        $(".shopping_cart").css('margin-top', '-10px');
    } else {
        $(".cartItems").css('display', 'none');
        $(".shopping_cart").css('margin-top', '10px');
    }
} else {
    $(".cartItems").css('display', 'none');
    $(".shopping_cart").css('margin-top', '10px');
}
$(window).resize(function () {
    if ($(".collapse").is(":visible")) {
        $(".cart-button-mobile").css('display', 'none');
        $(".cart-button-pc").css('display', '');
    } else {
        $(".cart-button-pc").css('display', 'none');
        $(".cart-button-mobile").css('display', '');
    }
});


$('#search-button')[0].addEventListener('click', el => {
    if ($('#search')[0].value === '') {
        alert('please Enter anything');
    } else {
        window.location.assign(`/searched/${$('#search')[0].value.replaceAll(' ', '-')}`);
    }
})