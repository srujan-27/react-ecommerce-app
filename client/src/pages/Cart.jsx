import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import ProductCard from "../components/product-card/ProductCard";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data); // should be an array of product objects
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, [navigate]);

  return (
    <div className={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.images[0]}
            ratingAverage={item.ratingAverage}
            showAddToCart={false}
          />
        ))
      )}
    </div>
  );
}
