// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.textContent = 'Total: $0.00';
            checkoutBtn.disabled = true;
            return;
        }

        checkoutBtn.disabled = false;

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'flex justify-between items-center border-b py-4';

            itemDiv.innerHTML = `
                <div>
                    <p class="font-semibold">${item.name}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: 
                        <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    </p>
                </div>
                <button class="remove-btn text-red-600" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;

            cartItemsContainer.appendChild(itemDiv);
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    function updateCartStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-btn')) {
            const id = e.target.dataset.id || e.target.parentElement.dataset.id;
            cart = cart.filter(item => item.id != id);
            updateCartStorage();
            renderCart();
        } else if (e.target.classList.contains('quantity-btn')) {
            const id = e.target.dataset.id;
            const action = e.target.dataset.action;
            const item = cart.find(i => i.id == id);
            if (item) {
                if (action === 'increase') {
                    item.quantity++;
                } else if (action === 'decrease' && item.quantity > 1) {
                    item.quantity--;
                }
                updateCartStorage();
                renderCart();
            }
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        // Send purchase request to backend
        fetch('php/purchase.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you for your purchase!');
                cart = [];
                updateCartStorage();
                renderCart();
            } else {
                alert('Purchase failed: ' + data.message);
            }
        })
        .catch(() => {
            alert('Purchase failed due to network error.');
        });
    });

    renderCart();
});
