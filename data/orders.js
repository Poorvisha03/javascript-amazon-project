import {cart, calculateCartQuantity} from "./cart.js"

export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){
    if(cart && cart.length > 0){
        orders.unshift(order);
        saveToStorage();
        }
    } 

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

calculateCartQuantity('.js-cart-quantity',false);