// JavaScript for switching between sections
document.getElementById('myProduct').addEventListener('click', function() {
    displaySection('productSection');
});

document.getElementById('ordersPayment').addEventListener('click', function() {
    displaySection('ordersSection');
});

document.getElementById('deliveryStatus').addEventListener('click', function() {
    displaySection('deliverySection');
});

document.getElementById('viewInventory').addEventListener('click', function() {
    displaySection('inventorySection');
    displayInventory(); // Display inventory when the "View Inventory" section is clicked
});

function displaySection(sectionId) {
    // Hide all sections
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// JavaScript for adding and editing products
let products = []; // Array to store product objects
let editingIndex = -1; // Track which product is being edited

function addOrUpdateProduct() {
    const productName = document.getElementById('productName').value;
    const productPricePerKg = document.getElementById('productPricePerKg').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPhoto = document.getElementById('productPhoto').files[0];

    if (!productPhoto) {
        alert('Please select a product photo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const photoUrl = e.target.result;

        if (editingIndex === -1) {
            // Add new product
            products.push({ name: productName, pricePerKg: productPricePerKg, quantity: productQuantity, photoUrl: photoUrl });
        } else {
            // Update existing product
            products[editingIndex] = { name: productName, pricePerKg: productPricePerKg, quantity: productQuantity, photoUrl: photoUrl };
            editingIndex = -1; // Reset editing index
        }

        document.getElementById('productForm').reset(); // Reset form after submission
        displayProducts(); // Refresh product list
        displayInventory(); // Refresh inventory list
    };
    
    reader.readAsDataURL(productPhoto); // Convert the image file to a data URL
}

function addMultipleProducts() {
    const productName = document.getElementById('productName').value;
    const productPricePerKg = document.getElementById('productPricePerKg').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPhoto = document.getElementById('productPhoto').files[0];

    if (!productPhoto) {
        alert('Please select a product photo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const photoUrl = e.target.result;

        // Loop to add multiple products with dummy data for example
        for (let i = 0; i < 5; i++) {
            products.push({ 
                name: `${productName} ${i+1}`, 
                pricePerKg: productPricePerKg, 
                quantity: productQuantity, 
                photoUrl: photoUrl 
            });
        }

        document.getElementById('productForm').reset(); // Reset form after submission
        displayProducts(); // Refresh product list
        displayInventory(); // Refresh inventory list
    };
    
    reader.readAsDataURL(productPhoto); // Convert the image file to a data URL
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear current product list

    products.forEach((product, index) => {
        productList.innerHTML += `
            <div>
                <p><strong>Product Name:</strong> ${product.name}</p>
                <p><strong>Price per Kg:</strong> $${product.pricePerKg}</p>
                <p><strong>Quantity Available:</strong> ${product.quantity}</p>
                <img src="${product.photoUrl}" alt="${product.name}" class="product-photo">
                <button onclick="editProduct(${index})">Edit</button>
                <button class="remove" onclick="removeProduct(${index})">Remove</button>
                <hr>
            </div>
        `;
    });
}

function editProduct(index) {
    editingIndex = index; // Set index to currently editing product
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPricePerKg').value = product.pricePerKg;
    document.getElementById('productQuantity').value = product.quantity;
    // Clear previous photo selection
    document.getElementById('productPhoto').value = '';
}

function removeProduct(index) {
    products.splice(index, 1); // Remove product from the array
    displayProducts(); // Refresh product list
    displayInventory(); // Refresh inventory list
}

// Function to display inventory
function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear current inventory list

    products.forEach((product) => {
        // If the product quantity is greater than 0, display it
        if (product.quantity > 0) {
            inventoryList.innerHTML += `
                <div>
                    <p><strong>Product Name:</strong> ${product.name}</p>
                    <p><strong>Price per Kg:</strong> $${product.pricePerKg}</p>
                    <p><strong>Quantity Available:</strong> ${product.quantity}</p>
                    <img src="${product.photoUrl}" alt="${product.name}" class="product-photo">
                    <hr>
                </div>
            `;
        }
    });
}

// script2.js

// Function to add or update a product
function addOrUpdateProduct() {
    const productName = document.getElementById("productName").value;
    const productPricePerKg = document.getElementById("productPricePerKg").value;
    const productQuantity = document.getElementById("productQuantity").value;
    const productPhoto = document.getElementById("productPhoto").files[0];

    if (!productPhoto) {
        alert('Please select a product photo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const photoUrl = e.target.result;

        const product = {
            name: productName,
            price: productPricePerKg,
            quantity: productQuantity,
            photo: photoUrl
        };

        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        // Update both "My Product" and "View Inventory" sections
        displayProducts();
        displayInventory();
    };

    reader.readAsDataURL(productPhoto); // Convert image to Base64
}




// Function to display the list of products
function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("productList");
    productList.innerHTML = ''; // Clear existing content

    products.forEach((product, index) => {
        const productHTML = `
            <div class="product-item" id="product-${index}">
                <img src="${product.photo}" alt="${product.name}" class="product-photo">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}/kg</p>
                <p>Quantity: ${product.quantity} kg</p>
                <button class="btn btn-danger remove-product" data-index="${index}">Remove Product</button>
            </div>
        `;
        productList.innerHTML += productHTML;
    });

    // Event listener to handle product removal
    productList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-product")) {
            const productIndex = event.target.getAttribute("data-index");
            removeProductFromStorage(productIndex);
        }
    });
}

// Function to edit a product
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    document.getElementById('productName').value = product.name;
    document.getElementById('productPricePerKg').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productPhoto').value = '';

    // Remove the current product from the list to update it later
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    displayInventory();
}

// Function to remove a product
function removeProductFromStorage(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1); // Remove the product from the array
    localStorage.setItem("products", JSON.stringify(products)); // Update local storage

    // Update both "My Product" and "View Inventory" sections
    displayProducts();
    displayInventory();
}


// Function to display the inventory
function displayInventory() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const inventoryList = document.getElementById("inventoryList");
    inventoryList.innerHTML = ''; // Clear existing content

    products.forEach((product, index) => {
        const inventoryHTML = `
            <div class="inventory-item" id="inventory-${index}">
                <img src="${product.photo}" alt="${product.name}" class="inventory-photo" >
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}/kg</p>
                <p>Quantity: ${product.quantity} kg</p>
                <button class="btn btn-danger remove-product" data-index="${index}">Remove Product</button>
            </div>
        `;
        inventoryList.innerHTML += inventoryHTML;
    });

    // Event listener to handle product removal
    inventoryList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-product")) {
            const productIndex = event.target.getAttribute("data-index");
            removeProductFromStorage(productIndex);
        }
    });
}





