// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const featuredProductsContainer = document.getElementById('featured-products');
    const productListContainer = document.getElementById('product-list');
    const categoryTitle = document.getElementById('category-title');

    // Fetch featured products for homepage
    if (featuredProductsContainer) {
        fetch('php/products.php?featured=1')
            .then(response => response.json())
            .then(products => {
                featuredProductsContainer.innerHTML = '';
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    featuredProductsContainer.appendChild(productCard);
                });
            })
            .catch(err => {
                featuredProductsContainer.innerHTML = '<p class="text-red-500">Failed to load featured products.</p>';
            });
    }

    // Fetch products by category for category page
    if (productListContainer && categoryTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat') || 'laptop';
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        fetch(`php/products.php?category=${category}`)
            .then(response => response.json())
            .then(products => {
                productListContainer.innerHTML = '';
                if (products.length === 0) {
                    productListContainer.innerHTML = '<p>No products found in this category.</p>';
                } else {
                    products.forEach(product => {
                        const productCard = createProductCard(product);
                        productListContainer.appendChild(productCard);
                    });
                }
            })
            .catch(err => {
                productListContainer.innerHTML = '<p class="text-red-500">Failed to load products.</p>';
            });
    }
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded shadow p-4 flex flex-col';

    const img = document.createElement('img');
    img.src = product.image_path || 'https://via.placeholder.com/150';
    img.alt = product.name;
    img.className = 'mb-4 object-contain h-40 w-full';

    const name = document.createElement('h3');
    name.textContent = product.name;
    name.className = 'text-lg font-semibold mb-2';

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`;
    price.className = 'text-blue-600 font-bold mb-4';

    const button = document.createElement('a');
    button.href = `product_detail.html?id=${product.id}`;
    button.textContent = 'View Details';
    button.className = 'mt-auto bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 transition';

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}
