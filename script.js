let barsEl = document.querySelector('.bars');
let othersEl = document.querySelector('.others');

barsEl.addEventListener('click',() => {
    othersEl.classList.toggle('show');
});


//SEARCH
function myFunction(){
var input, filter, ul, li, a, i, txtValue;
input = document.getElementById('myInput');
filter = input.value.toUpperCase();
ul = document.getElementsByClassName('items');
li =ul.getElementsByTagName('li');

//loop through all the list items, and hide those who don't match the search query
for(i = 0; i < li.length; i++) {
    a =li[i].getElementsByTagName('a')[0];
    txtValue = a.textContent || a.innerText;
    if(txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else{
        li[i].style.display = "none";
    }
} 
}


//Basket
let basketIcon = document.querySelector(".basket");
let basket = document.querySelector("#basket");
let closeBasket = document.querySelector("#close-basket");

//open basket
basketIcon.onclick = () => {
    basket.classList.add("active");
}
//close basket
closeBasket.onclick = () => {
    basket.classList.remove("active");
}

//basket working
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

//making function
function ready(){
    //remove items from basket
    var removeBasketButtons = document.getElementsByClassName('basket-remove')
    console.log(removeBasketButtons)
    for (var i = 0; i < removeBasketButtons.length; i++){
        var button = removeBasketButtons[i]
        button.addEventListener('click', removeBasketItem)
    }
    //quantity changes
    var quantityInputs = document.getElementsByClassName('basket-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to basket
    var addBasket = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addBasket.length; i++){
        var button = addBasket[i];
        button.addEventListener('click', addBasketClicked);
    } 
    //Buy button work
    document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener('click', buyButtonClicked);
}
//buy button
 function buyButtonClicked(){
    alert('Your order is placed')
    var basketContent = document.getElementsByClassName('basket-content')[0]
    while(basketContent.hasChildNodes()){
        basketContent.removeChild(basketContent.firstChild);
    }
    updateTotal();
}

 //remove items from basket
function removeBasketItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}

//quantity changes
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//Add to basket
function addBasketClicked(event){
    var button = event.target
    var popular = button.parentElement
    var title = popular.getElementsByClassName('product-title')[0].innerText;
    var price = popular.getElementsByClassName('product-price')[0].innerText;
    var productImg = popular.getElementsByClassName('product.image')[0].src;
    addProductToBasket(title, price, productImg);
    updateTotal();
}

function addProductToBasket(title, price, productImg){
    var basketShopBox = document.createElement('div')
    basketShopBox.classList.add('basket-box')
    var basketItems = document.getElementsByClassName('basket-content')[0]
    var basketItemsNames = document.getElementsByClassName('basket-product-title')
    for (var i = 0; i < basketItemsNames.length; i++){
        alert("You have already add this item to basket");
    return;
    }
}
    var basketBoxContent = `
                <img src="${productImg}" alt="pic" class="baske">
                <div class="detail-box">
                <div class="basket-product-title">${title}</div>
                <div class="basket-price">${price}</div>
                <input type="number" value="1" class="basket-quantity">
                </div>
                <!--Remove basket-->
                <i class="fa fa-trash  basket-remove" aria-hidden="true"></i>`;
    basketShopBox.innerHTML = basketBoxContent
    basketItems.append(basketShopBox)
    basketShopBox
    .getElementsByClassName('basket-remove')[0]
    .addEventListener('click', removeBasketItem)
    basketShopBox
    .getElementsByClassName('basket-quantity')[0]
    .addEventListener('change', quantityChanged)

 //update total
 function updateTotal(){
    var basketContent = document.getElementsByClassName('basket-content')[0];
    var basketBoxes = basketContent.getElementsByClassName('basket-box');
    var total = 0;
    for (var i = 0; i < basketBoxes.length; i++){
        var basketBox = basketBoxes[i]
        var priceElement = basketBox.getElementsByClassName('basket-price')[0];
        var quantityElement = basketBox.getElementsByClassName('basket-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //If price contains some cents value
        total = Math.round(total * 100) / 100;


        document.getElementsByClassName('total-price')[0].innerText = '$'+ total;
    
 }  