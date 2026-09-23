import { cart } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){
    if(cart.length > 0){
        orders.unshift(order);
        saveToStorage();
        }
    } 

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}