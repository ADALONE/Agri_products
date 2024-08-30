function saveDetails() {
    // Get values from the form fields
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const bidPrice = document.getElementById('bidPrice').value;
    const quantity = document.getElementById('quantity').value;
    const deliveryDate = document.getElementById('deliveryDate').value;

    // Check if all fields are filled
    if (name && phone && email && address && bidPrice && quantity && deliveryDate) {
        // Create an object to store these details
        const orderDetails = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            bidPrice: bidPrice,
            quantity: quantity,
            deliveryDate: deliveryDate
        };

        // Get existing order details from localStorage or initialize an empty array
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Add the new order details to the array
        orders.push(orderDetails);

        // Save the updated array back to localStorage
        localStorage.setItem('orders', JSON.stringify(orders));

        // Alert the user that their details have been saved
        alert('Your details have been saved successfully!');

        // Redirect to the orderarrived.html page after the alert
        window.location.href = 'orderarrived.html';
    } else {
        // If not all fields are filled, show an alert
        alert('Please fill in all the details.');
    }
}
