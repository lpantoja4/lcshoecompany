document.addEventListener('DOMContentLoaded', (event) => {
    function toggleCartModal() {
        const modal = document.getElementById('cartModal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        updateCartModal();
    }

    function updateCartModal() {
        const cart = getCart();
        const cartContent = document.getElementById('cartContent');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        cartContent.innerHTML = '';

        let totalCost = 0;

        for (const [key, item] of Object.entries(cart)) {
            const itemCost = item.quantity * item.price;
            totalCost += itemCost;
            const itemElement = document.createElement('div');
            itemElement.innerHTML = 
                item.name + " (" + item.size + ") x" + item.quantity + " - " + itemCost.toFixed(2) +
                '<button class="remove-one" data-shoe="' + key + '">-</button>' +
                '<button class="remove-all" data-shoe="' + key + '">Remove All</button>';
            cartContent.appendChild(itemElement);
        }

        cartTotal.innerText = "Total: " + totalCost.toFixed(2);

        checkoutBtn.style.display = Object.keys(cart).length > 0 ? 'block' : 'none';

        document.querySelectorAll('.remove-one').forEach(button => {
            button.addEventListener('click', () => removeOneFromCart(button.dataset.shoe));
        });
        document.querySelectorAll('.remove-all').forEach(button => {
            button.addEventListener('click', () => removeAllFromCart(button.dataset.shoe));
        });
    }

    function getShoeName() {
        const shoeNameElement = document.getElementById('shoeName');
        return shoeNameElement.innerText;
    }

    function getShoePrice() {
        const shoePriceElement = document.getElementById('shoePrice');
        return parseFloat(shoePriceElement.getAttribute('data-price'));
    }

    function getSelectedSize() {
        const sizes = document.getElementsByName('shoeSize');
        for (const size of sizes) {
            if (size.checked) {
                return size.value;
            }
        }
        return null;
    }

    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : {};
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCounter() {
        const cart = getCart();
        const totalItems = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cartCounter').innerText = "Cart: " + totalItems;
    }

    function addToCart() {
        const shoeName = getShoeName();
        const shoePrice = getShoePrice();
        const selectedSize = getSelectedSize();

        if (!selectedSize) {
            alert('Please choose a size.');
            return;
        }

        const cart = getCart();
        const cartKey = shoeName + "_" + selectedSize;
        
        if (cart[cartKey]) {
            cart[cartKey].quantity += 1;
        } else {
            cart[cartKey] = {
                name: shoeName,
                price: shoePrice,
                quantity: 1,
                size: selectedSize
            };
        }

        saveCart(cart);
        updateCartCounter();
        updateCartModal();  
    }

    function removeOneFromCart(shoeKey) {
        const cart = getCart();

        if (cart[shoeKey]) {
            if (cart[shoeKey].quantity > 1) {
                cart[shoeKey].quantity -= 1;
            } else {
                delete cart[shoeKey];
            }
        }

        saveCart(cart);
        updateCartCounter();
        updateCartModal();
    }

    function removeAllFromCart(shoeKey) {
        const cart = getCart();

        if (cart[shoeKey]) {
            delete cart[shoeKey];
        }

        saveCart(cart);
        updateCartCounter();
        updateCartModal();
    }

    updateCartCounter();

    window.toggleCartModal = toggleCartModal;
    window.addToCart = addToCart;
});



