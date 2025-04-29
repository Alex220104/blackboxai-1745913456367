// product_detail.js

document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        productDetailContainer.innerHTML = '<p class="text-red-500">Product ID is missing.</p>';
        return;
    }

    fetch(`php/product_detail.php?id=${productId}`)
        .then(response => response.json())
        .then(product => {
            if (!product) {
                productDetailContainer.innerHTML = '<p class="text-red-500">Product not found.</p>';
                return;
            }
            productDetailContainer.innerHTML = createProductDetailHTML(product);
        })
        .catch(err => {
            productDetailContainer.innerHTML = '<p class="text-red-500">Failed to load product details.</p>';
        });
});

function createProductDetailHTML(product) {
    return `
        <img src="${product.image_path || 'https://via.placeholder.com/300'}" alt="${product.name}" class="w-full md:w-1/3 object-contain rounded" />
        <div class="flex flex-col flex-grow">
            <h2 class="text-2xl font-bold mb-4">${product.name}</h2>
            <p class="mb-4">${product.description || 'No description available.'}</p>
            <p class="text-xl font-semibold text-blue-600 mb-4">$${product.price.toFixed(2)}</p>
            <p class="mb-4">Stock: ${product.stock_quantity}</p>
            <button class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-40">Add to Cart</button>
        </div>
    `;
}
