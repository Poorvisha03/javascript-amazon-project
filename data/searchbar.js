import { products,loadProductsFetch } from "./products.js";
import {renderproductsGrid} from "../scripts/amazon.js"

export let productsToRender = [];

const searchButton = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-bar');

export function redirectToSearch(){
    const searchTerm = searchInput.value.toLowerCase().trim();

    window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`
}
searchButton.addEventListener('click', () =>{
    redirectToSearch();
});

searchInput.addEventListener('keydown',(event) =>{
    if(event.key === 'Enter'){
            redirectToSearch();
    }
    
});

export async function renderStoragePage(){
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const searchTerm = url.searchParams.get('search')?.toLowerCase().trim() || '';

    if (searchInput) searchInput.value = searchTerm;

    if(searchTerm === ''){
        productsToRender = products;
    }else{
        productsToRender = products.filter((product) => {
            const matchesName = product.name?.toLowerCase().includes(searchTerm)
            const matchesKeyWords = product.keywords && product.keywords
                .some(keyword => keyword.toLowerCase().includes(searchTerm));

            return matchesName || matchesKeyWords;
        });
    }

    const productsGrid = document.querySelector('.js-products-grid');
    if(productsGrid){
        if(productsToRender.length === 0){
            productsGrid.innerHTML = `<p>No Products Matched Your Search.</p>`
        }else{
            renderproductsGrid();
        }
    }
}

window.addEventListener('DOMContentLoaded', renderStoragePage);