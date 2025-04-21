document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 'p1',
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: { stars: 4.5, count: 93 },
            price: 13.99
        },
        {
            id: 'p2',
            image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
            name: "Plain Hooded Fleece Sweatshirt",
            rating: { stars: 3.5, count: 317 },
            price: 24
        },
        {
            id: 'p3',
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: { stars: 4.5, count: 176 },
            price: 6.00
        },
        {
            id: 'p4',
            image: "images/products/6-piece-non-stick-baking-set.webp",
            name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
            rating: { stars: 4.5, count: 175 },
            price: 34.99
        },
        {
            id: 'p5',
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: { stars: 4, count: 52 },
            price: 10.5
        },
        {
            id: 'p6',
            image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
            name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
            rating: { stars: 5, count: 346 },
            price: 30.74
        },
        {
            id: 'p7',
            image: "images/products/vanity-mirror-silver.jpg",
            name: "Vanity Mirror with Heavy Base - Chrome",
            rating: { stars: 4.5, count: 130 },
            price: 8.49
        },
        {
            id: 'p8',
            image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
            name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
            rating: { stars: 4.5, count: 811 },
            price: 32.50
        },
        {
            id: 'p9',
            image: "images/products/men-chino-pants-beige.jpg",
            name: "Men's Classic-fit Pleated Chino Pants",
            rating: { stars: 4.5, count: 317 },
            price: 12.90
        }
    ];

    // Generate product HTML
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count">${product.rating.count}</div>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-quantity-container">
                <select class="js-quantity-selector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="added-to-cart js-added-to-cart">
                <img src="images/icons/checkmark.png"> Added
            </div>
            <button class="add-to-cart-button button-primary js-add-button"
                data-product-id="${product.id}"
                data-product-name="${product.name}"
                data-product-price="${product.price}"
                data-product-image="${product.image}">
                Add to Cart
            </button>
        </div>`;
    });

    // Display products
    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
    }

    function updateCartQuantity() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.js-cart-quantity').textContent = totalItems;
    }

    function addToCart(productId, productName, productPrice, productImage, quantity) {
        quantity = parseInt(quantity);
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                quantity: quantity
            });
        }
        
        saveCart();
        updateCartQuantity();
        
        // Show added message
        const addedMessage = document.querySelector(`.js-add-button[data-product-id="${productId}"]`)
            .closest('.product-container')
            .querySelector('.js-added-to-cart');
        addedMessage.style.opacity = 1;
        setTimeout(() => {
            addedMessage.style.opacity = 0;
        }, 1500);
    }

    // Add event listeners
    document.querySelectorAll('.js-add-button').forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.product-container');
            const quantity = productContainer.querySelector('.js-quantity-selector').value;
            
            addToCart(
                this.dataset.productId,
                this.dataset.productName,
                this.dataset.productPrice,
                this.dataset.productImage,
                quantity
            );
        });
    });

    // Initialize cart display
    updateCartQuantity();
});