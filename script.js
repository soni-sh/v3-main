let cart = [];
let cartCount = 0;

function addToCart(product, price, imageUrl) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ product, price, imageUrl, quantity: 1 });
    }
    cartCount++;
    updateCart();
}

function updateCart() {
    // Update cart count in the navbar
    document.getElementById('cart-count').textContent = cartCount;

    // Update the cart items list in the modal
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';

        // Create Product Image
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.product;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.marginRight = '10px';

        // Create Product Info
        const info = document.createElement('div');
        info.style.flexGrow = '1';
        info.textContent = `${item.product} - $${item.price} x ${item.quantity}`;

        // Create Decrease Button
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.style.marginLeft = '10px';
        decreaseBtn.onclick = () => decreaseQuantity(index);

        // Create Increase Button
        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.style.marginLeft = '5px';
        increaseBtn.onclick = () => increaseQuantity(index);

        // Create Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(decreaseBtn);
        li.appendChild(increaseBtn);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    // Update total price
    document.getElementById('cart-total').textContent = total;
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        cartCount--;
    } else {
        removeFromCart(index); // Remove item if quantity is 1
    }
    updateCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    cartCount++;
    updateCart();
}

function removeFromCart(index) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    // Show or hide cart modal
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'flex') ? 'none' : 'flex';
}

function clearCart() {
    // Clear all items from cart
    cart = [];
    cartCount = 0;
    updateCart();
    toggleCart();
}

function placeOrder() {
    // Example action for placing order
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Order placed successfully!');
    clearCart();
}
