function Cart(localStorageKey){
    const cart = {
    cartItems: undefined,

    loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

    if(!this.cartItems){
        this.cartItems = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    };
    },

    saveToStorage(){
    localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    addToCart(productId){
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    let quantitySelectorValue;

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)
    quantitySelectorValue = quantitySelector ? quantitySelector.value : 1;
    

    if(matchingItem){
        matchingItem.quantity += Number(quantitySelectorValue);
    } else {
        this.cartItems.push({
        productId,
        quantity: Number(quantitySelectorValue),
        deliveryOptionId: '1'
    });
    }
    this.saveToStorage();
    },

    removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;
    this.saveToStorage();
    },

    calculateCartQuantity(selector,formatText = false){
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem)=>{
    cartQuantity += Number(cartItem.quantity);
    });
    if(selector){
        const element = document.querySelector(selector);
        if(element){
            element.innerHTML = formatText ? `${cartQuantity} items` : cartQuantity;
        }
    }
    return cartQuantity;
    
    },

    updateQuantity(productId,newQuantity){
    this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
            cartItem.quantity = Number(newQuantity);
        }
    });
    this.saveToStorage()
    },

    updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
    }
    
    };
    return cart;
}



const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');



cart.loadFromStorage();
businessCart.loadFromStorage();



console.log(cart);
console.log(businessCart);
