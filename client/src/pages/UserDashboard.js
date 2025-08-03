import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    const fetchPizzas = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/pizzas");
        setPizzas(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPizzas();
  }, []);

  const addToCart = (p) => {
    try {
      const pizzaWithId = { ...p, id: uuidv4() };
      setCart([...cart, pizzaWithId]);
    } catch (error) {
      console.log(error);
    }
  };
  const loadRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handleCheckout = async () => {
    try {
      const name = await cart.map((item) => item.name);
      console.log(name);
      const res = await loadRazorPay();
      if (!res) {
        alert("Razorpay failed to load");
        return;
      }
      const { data } = await axios.post(
        "http://localhost:8080/api/order/create-order",
        { name,
          amount: 1000, currency: "INR" }
      );
      const updateStock=await axios.put('http://localhost:8080/api/stock/remove-stock',{name})
      console.log(updateStock);
      const options = {
        key: process.env.REACT_APP_KEY,
        description: "Contains cheese,tomato.",
        order_id: data.orderSaved.id,
        handler: function (response) {
          navigate("/orders");
          console.log(response);
        },
        prefill: {
          name: "Rahul",
          email: "rahul@gmail.com",
          contact: 44389,
        },
      };
      const rp = new window.Razorpay(options);
      rp.open();
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = (id) => {
    try {
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="user-dashboard">
        <div className="cards">
          {pizzas.map((p, i) => (
            <div className="card" key={i}>
              <img id="image" src={p.image} alt="img" />
              <p id="name">{p.name}</p>
              <p id="desc">{p.description}</p>
              <button type="submit" onClick={() => addToCart(p)}>
                Add <p id="price">₹ {p.price}</p>
              </button>
            </div>
          ))}
        </div>
        <div className="checkout">
          <h1>Your Basket</h1>
          <p id="discount">
            <FontAwesomeIcon icon={faTicket} size="xl" />
            Apply Coupon codes or Gift card &gt;
          </p>
          <div className="listcart">
            {cart.map((selectedPizza, i) => (
              <div key={i}>
                <h5>{selectedPizza.name}</h5>
                <p>₹ {selectedPizza.price}</p>
                <FontAwesomeIcon
                  icon={faXmark} id="close"
                  onClick={() => removeFromCart(selectedPizza.id)}/>
              </div>
            ))}
          </div>
          <button onClick={() => handleCheckout()}>
            Checkout ₹{cart.reduce((total, item) => total + item.price, 0)}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
