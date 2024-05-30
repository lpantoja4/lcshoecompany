document.addEventListener('DOMContentLoaded', () => {
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : {};
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function clearCart() {
        localStorage.removeItem('cart');
    }

    function populateCart() {
        const cart = getCart();
        const cartItems = document.getElementById('cartItems');
        const cartItemCount = document.getElementById('cartItemCount');
        const cartTotal = document.getElementById('cartTotal');
        
        let totalCost = 0;
        let totalItems = 0;

        cartItems.innerHTML = '';

        for (const [shoeName, item] of Object.entries(cart)) {
            totalCost += item.quantity * item.price;
            totalItems += item.quantity;

            const itemElement = document.createElement('li');
            itemElement.className = 'list-group-item d-flex justify-content-between lh-condensed';
            itemElement.innerHTML = `
                <div>
                    <h6 class="my-0">${shoeName} (${item.size})</h6>
                    <small class="text-muted">Quantity: ${item.quantity}</small>
                </div>
                <span class="text-muted">${(item.quantity * item.price).toFixed(2)}</span>
            `;
            cartItems.appendChild(itemElement);
        }

        cartItemCount.innerText = totalItems;
        cartTotal.innerText = totalCost.toFixed(2);
    }

    function isFormFilled() {
        const inputs = document.querySelectorAll('input');
        for (const input of inputs) {
            if (!input.value) {
                return false;
            }
        }
        return true;
    }

    document.getElementById('checkoutBtn').addEventListener('click', (e) => {
        e.preventDefault();

        if (!isFormFilled()) {
            alert('Please fill out all information before checking out.');
            return;
        }

        clearCart();

        window.location.replace('payed.html');
    });

    populateCart();
});
