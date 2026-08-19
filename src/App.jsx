import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Headphones", price: 1200, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Smart Watch", price: 2500, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Shoes", price: 1800, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Backpack", price: 900, image: "https://via.placeholder.com/200" }
];

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function increaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <h1>Cart / E-Commerce Application</h1>

      <div className="container">
        <div className="products">
          <h2>Products</h2>

          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>

                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <p>Item Total: ₹{item.price * item.quantity}</p>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))}

              <h2>Total Price: ₹{totalPrice}</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;