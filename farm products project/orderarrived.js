function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders have arrived yet.</p>';
        return;
    }

    let ordersHTML = '';
    orders.forEach((order, index) => {
        ordersHTML += `
            <div class="order">
                <h3>Order ${index + 1}</h3>
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Bidding Price:</strong> ₹${order.bidPrice}</p>
                <p><strong>Quantity:</strong> ${order.quantity} kg</p>
                <p><strong>Delivery Date:</strong> ${order.deliveryDate}</p>
            </div>
            <hr>`;
    });

    ordersList.innerHTML = ordersHTML;
}

function clearOrders() {
    if (confirm('Are you sure you want to clear all orders?')) {
        localStorage.removeItem('orders');
        localStorage.removeItem('ordersForPayment');
        loadOrders(); 
    }
}

function goToOrdersPayment() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length > 0) {
        localStorage.setItem('ordersForPayment', JSON.stringify(orders));
    }
    window.location.href = 'index2.html#ordersSection';
}

window.onload = loadOrders;