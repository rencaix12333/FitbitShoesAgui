// Function to display cart items in the cart page
function displayCartItems() {
    // Get the cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Get the cart table
    const cartTable = document.getElementById("cart-table");
  
    // Remove existing rows from the table
    while (cartTable.rows.length > 1) {
      cartTable.deleteRow(1);
    }
  
    // Loop through each item in the cart
    cart.forEach((item) => {
      // Create a new row
      const row = cartTable.insertRow();
  
      // Create cells for each column
      const productCell = row.insertCell(0);
      const imageCell = row.insertCell(1);
      const quantityCell = row.insertCell(2);
      const subtotalCell = row.insertCell(3);
      const removeCell = row.insertCell(4);
  
      // Set fixed widths for cells
      productCell.style.width = "30%";
      imageCell.style.width = "20%";
      quantityCell.style.width = "15%";
      subtotalCell.style.width = "20%";
      removeCell.style.width = "15%";
  
      // Ensure that both price and quantity are treated as numbers
      const itemPrice = parseFloat(item.price); // Convert price to a floating-point number
      const itemQuantity = parseInt(item.quantity, 10) || 0; // Convert quantity to an integer, default to 0 if not a valid number
  
      // Set the product name, quantity, and subtotal
      productCell.textContent = item.name;
      quantityCell.textContent = item.quantity;
      subtotalCell.textContent = `$ ${(itemPrice * itemQuantity).toFixed(2)}`;
  
      // Create an image element and set its source
      const image = document.createElement("img");
      image.src = item.imageSrc;
      image.alt = item.name;
      image.style.width = ""; // Adjust the width as needed
      imageCell.appendChild(image);
  
      // Create a remove link
      const removeLink = document.createElement("a");
      removeLink.href = "#";
      removeLink.textContent = "Remove";
      removeLink.addEventListener("click", () => removeCartItem(item.id));
      removeCell.appendChild(removeLink);
    });
  
    // Update the total in the cart
    updateCartTotal();
  }
  
 // Function to update the total in the cart
function updateCartTotal() {
    // Get the cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate the subtotal
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    // Calculate tax (adjust the tax rate accordingly)
    const taxRate = 0.10; // 10% tax rate
    const tax = subtotal * taxRate;

    // Calculate the total including tax
    const total = subtotal + tax;

    // Display the subtotal, tax, and total in the cart
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTax = document.getElementById("cart-tax");
    const cartTotal = document.getElementById("cart-total");

    cartSubtotal.textContent = `$ ${subtotal.toFixed(2)}`;
    cartTax.textContent = `$ ${tax.toFixed(2)}`;
    cartTotal.textContent = `$ ${total.toFixed(2)}`;
}

  // Function to remove a cart item
  function removeCartItem(itemId) {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Find the index of the item with the given ID
    const itemIndex = cart.findIndex((item) => item.id === itemId);
  
    // Remove the item from the cart
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // Refresh the displayed cart items
    displayCartItems();
  }
  
  // Call the displayCartItems function when the page loads
  document.addEventListener("DOMContentLoaded", displayCartItems);

