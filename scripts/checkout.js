import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";


loadProductsFetch()
.then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

