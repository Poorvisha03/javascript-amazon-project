import  {products, loadProductsFetch} from '../data/products.js'
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

async function renderTrackingPage(){

    await loadProductsFetch();
    const url = new URL(window.location.href);     
    const orderId = url.searchParams.get('orderId')
    const productId = url.searchParams.get('productId')

    const matchingOrder = orders.find((order) => order.id === orderId);

    const orderProductDetails = matchingOrder.products.find((p) => p.productId === productId);
    const matchingProduct = products.find((p) => p.id === productId);
    const deliveryDate = dayjs(orderProductDetails.estimatedDeliveryTime).format('MMMM D');

    let trackingHTML = '';

    trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProductDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`

    document.querySelector('.js-order-tracking')
    .innerHTML = trackingHTML;

    const currentTime = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);  
    const deliveryTime = dayjs(orderProductDetails.estimatedDeliveryTime);

    let widthPercent = ((currentTime - orderTime)/(deliveryTime - orderTime)) * 100
    widthPercent  = Math.max(5,Math.min(100, widthPercent));

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = '0%';

    setTimeout(() => {
      progressBar.style.width = `${widthPercent}%`;
    },500)

    const labels = document.querySelectorAll('.progress-label');

    labels.forEach(label => label.classList.remove('current-status'));

    if(widthPercent < 50){
      labels[0].classList.add('current-status');
    }else if(widthPercent >= 50 && widthPercent < 100){
      labels[1].classList.add('current-status');
    }else{
      labels[2].classList.add('current-status');
    }


}

renderTrackingPage();




