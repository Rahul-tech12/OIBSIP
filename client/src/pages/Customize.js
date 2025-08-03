import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const [base, setBase] = useState("Thin Crust");
  const [sauce, setSauce] = useState("Classic Tomato Basi");
  const [cheese, setCheese] = useState("Mozorella");
  const [veggies, setVeggies] = useState("Bell Peppers");
  const navigate=useNavigate();

  const loadRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handleCheckout=async()=>{
    try {
        const res = await loadRazorPay();
              if (!res) {
                alert("Razorpay failed to load");
                return;
              }
              const { data } = await axios.post(
                "http://localhost:8080/api/v1/user/custom-order",
                { base,sauce,cheeseType:cheese,veggies, amount: 1000, currency: "INR" }
              );
              const options = {
                key: process.env.REACT_APP_KEY,
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
  }
  return (
    <Layout>
      <div className="customize">
        <p className="p1">Select base:</p>
        <select onChange={(e) => setBase(e.target.value)} value={base}>
          Pizza base(any 1)
          <option value="Thin Crust">Thin Crust</option>
          <option value="Thick Crust ">Thick Crust</option>
          <option value="Cheese Burst">Cheese Burst</option>
          <option value="Whole Wheat Base">Whole Wheat Base</option>
          <option value="Gluten-Free Base">Gluten-Free Base</option>
        </select>
        <p className="p1">Select Sauce:</p>
        <select onChange={(e) => setSauce(e.target.value)} value={sauce}>
          Pizza Sauces(any 1)
          <option value="Classic Tomato Basi">Classic Tomato Basi</option>
          <option value="Spicy Arrabbiata ">Spicy Arrabbiata</option>
          <option value="Pesto Sauce">Pesto Sauce</option>
          <option value="Alfredo Sauce">Alfredo Sauce</option>
          <option value="Barbecue Sauce">Barbecue Sauce</option>
        </select>
        <p className="p1">Select Cheese Type:</p>
        <select onChange={(e) => setCheese(e.target.value)} value={cheese}>
          Cheese types(any 1)
          <option value="Mozzarella ">Mozzarella </option>
          <option value="Cheddar">Cheddar </option>
          <option value="Parmesan ">Parmesan </option>
          <option value="Goat Cheese ">Goat Cheese </option>
          <option value="Vegan Cheese">Vegan Cheese</option>
        </select>
       <p className="p1">Select Veggies:</p>
       <select onChange={(e) => setVeggies(e.target.value)} value={veggies}>
          Veggie Toppings(any 1)
          <option value="Bell Peppers">Bell Peppers</option>
          <option value="Onions ">Onions </option>
          <option value="Mushrooms ">Mushrooms </option>
          <option value="Olives ">Olives </option>
          <option value="Sweet Corn">Sweet Corn</option>
        </select>
        </div>
        <div className="checkout">
          <h1>Your Basket</h1>
          <p id="discount">Apply coupon code or Gift card</p>
          <div className="cust-order">
            <ul>
              <li>{base}</li>
              <li>{sauce} </li>
              <li>{cheese}</li>
              <li>{veggies}</li>
            </ul>
          </div>
          <button onClick={()=>handleCheckout()}>Checkout  ₹ 100</button>
        </div>
    </Layout>
  );
};

export default Customize;
