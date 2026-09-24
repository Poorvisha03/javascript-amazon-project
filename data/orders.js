import { formatCurrency } from "../scripts/utils/money.js";
import {cart, calculateCartQuantity} from "./cart.js"
import { products,loadProductsFetch } from "./products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){
    if(cart && cart.length > 0){
        orders.unshift(order);
        saveToStorage();
        }
    } 
console.log(orders);

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}


function renderOrdersPage(){
    
    let ordersHTML =  '';

    orders.forEach((order) => {
        const orderTime = dayjs(order.orderTime).format('MMMM D')
        
        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTime}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>
                <div class="order-details-grid js-order-details-grid-${order.id}">
                </div>
            </div>`
        });

        const ordersGrid = document.querySelector('.js-orders-grid');
        if(ordersGrid){
            ordersGrid.innerHTML = ordersHTML;
        }

        orders.forEach((order) => {
            let productDetailsHTML = '';

            order.products.forEach((product) => {
                const matchingProduct = products.find((p) => {
                    return p.id ===  product.productId
                    
                });
                console.log(product);
                console.log(matchingProduct)
                const name = matchingProduct ? matchingProduct.name : 'Unknown Product';
                const image = matchingProduct ? matchingProduct.image : 'images/amazon-logo.png';
                const deliveryDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');
                
            
            productDetailsHTML += `
                
                    <div class="product-image-container">
                        <img src="${image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                        ${name}
                        </div>
                        <div class="product-delivery-date">
                        Arriving on: ${deliveryDate}
                        </div>
                        <div class="product-quantity">
                        Quantity: ${product.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </a>
                    </div>
                `
    
            });

        const productDetailsGrid = document.querySelector(`.js-order-details-grid-${order.id}`);
        if(productDetailsGrid){
            productDetailsGrid.innerHTML = productDetailsHTML;
        }
    }); 
    
}
loadProductsFetch().then(() => {
    renderOrdersPage();
    calculateCartQuantity('.js-cart-quantity',false);
})




