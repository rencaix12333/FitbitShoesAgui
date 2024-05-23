document.addEventListener("DOMContentLoaded", function () {
    // Function to update product details based on the product ID
    function updateProductDetails(productId) {
      // Up date product details based on the product ID
      const productImage = document.getElementById("product-image");
      const productName = document.getElementById("product-name");
      const productPrice = document.getElementById("product-price");
      const productDescription = document.getElementById("product-description");
  
      // Update the product details based on the product ID
      switch (productId) {
        case "mouse 5":
          productImage.src = "13.png";
          productName.textContent = "Elegant Evening Affair High Heels";
          productPrice.textContent = " $ 95.50"; 
          productDescription.textContent = "These Elegant Evening Affair High Heels by LuxeStep exude timeless sophistication, making them the perfect choice for any formal occasion.";
          break;
  
        case "keyboard 3":
          productImage.src = "16.png";
          productName.textContent = "Elysian Stiletto";
          productPrice.textContent = "$ 67.60";
          productDescription.textContent = "The Elysian Stiletto embodies sophistication and elegance, crafted for the modern woman who seeks to make a bold yet graceful statement.";
          break;
  
        case "mouse 4":
          productImage.src = "14.png";
          productName.textContent = "Opulent Orchid Embellished Evening Heels ";
          productPrice.textContent = "$ 89.00";
          productDescription.textContent = "Make a statement with the Opulent Orchid Embellished Evening Heels by Aurora Glamour. These exquisite heels feature a dazzling array of shimmering rhinestones and intricate floral embellishments, adding a touch of glamour to your formal attire.";
          break;
  
        case "laptop 1":
          productImage.src = "15.png";
          productName.textContent = "Midnight Majesty Velvet Mary Janes";
          productPrice.textContent = "$ 1000.90";
          productDescription.textContent = "Embrace timeless elegance with the Midnight Majesty Velvet Mary Janes by Noir Couture. These luxurious heels feature a vintage-inspired Mary Jane silhouette, updated with a modern twist. Crafted from plush black velvet, they exude opulence and sophistication.";
          break;
  
        case "Headset4":
          productImage.src = "17.png";  
          productName.textContent = "Opulence Aura";
          productPrice.textContent = "$ 50.90";
          productDescription.textContent = "The Opulence Aura heels are the epitome of timeless glamour and sophistication. Designed for the discerning woman, these exquisite heels feature a graceful silhouette with a classic almond toe and a slender, four-inch heel that adds height without compromising on comfort.";
          break;
        default:
          // Handle unknown product IDs
          break;
      }
  
      const addToCartButton = document.getElementById("add-to-cart-button");
      addToCartButton.addEventListener("click", addToCart);
    }
  
    // Function to handle adding a product to the cart
    function addToCart() {
      // Get the product details from the page
      const productId = getQueryParam("product");
      const productName = document.getElementById("product-name").textContent;
      const productPriceString = document.getElementById("product-price").textContent;
      const quantity = document.getElementById('quantity-input').value;
      const productImageSrc = document.getElementById("product-image").src;
  
      // Parse the product price as a float
      const productPrice = parseFloat(productPriceString.replace("$", ""));
  
      // Create a new cart item object
      const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: parseInt(quantity),
        imageSrc: productImageSrc,
      };
  
      // Check if the cart array already exists in local storage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );
  
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, increment the quantity
        cart[existingProductIndex].quantity++;
      } else {
        // If the product is not in the cart, add it
        cart.push(cartItem);
      }
  
      // Update the local storage with the modified cart
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Optionally, you can redirect the user to the cart page or show a confirmation message
      alert("Product added to cart!");
    }
  
    // Function to handle product clicks
    function handleProductClick(event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
  
      // Get the product ID from the data attribute of the clicked element
      const productId = event.target.dataset.productId;
  
      // Update the URL with the selected product ID
      history.pushState({}, null, `product-details.html?product=${productId}`);
  
      // Update the product details on the page
      updateProductDetails(productId);
    } 
  
    // Attach click event listeners to each product item
    const productItems = document.querySelectorAll(".col-4 img");
    productItems.forEach((item) => {
      item.addEventListener("click", handleProductClick);
    });
  
    // Call the function to update product details based on the current URL
    const currentProductId = new URLSearchParams(window.location.search).get(
      "product"
    );
    if (currentProductId) {
      updateProductDetails(currentProductId);
    }
  });
  
  // Function to get query parameters from the URL
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }