import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const Home = () => {
  const [topPizza, setTopPizza] = useState([]);
  
  useEffect(()=>{
    const findBestSellers=async()=>{
      try {
        const res=await axios.get('http://localhost:8080/api/order/show-orders')
        const pizzaCnt={};
        res.data.orderInfo.forEach(i => {
          i.order.forEach(pizza=>{
            pizzaCnt[pizza]=(pizzaCnt[pizza]|| 0)+1;
          })
        });
        const pizzaInfo=await axios.get('http://localhost:8080/api/pizzas');
        console.log(pizzaInfo);
          const updPizzaInfo=pizzaInfo.data.map(pizza=>({
          ...pizza,orders:pizzaCnt[pizza.name] || 0
        }))
        setTopPizza(updPizzaInfo.sort((a,b)=>b.orders-a.orders).splice(0,3))
      } catch (error) {
        console.log(error);
      }
    }
    findBestSellers();
  },[])
  return (
    <Layout>
      <div className="home-page">
        <div className="offers">
          <h3>🎉✨Ongoing Offers🎉✨</h3>
          <p>Order 2 customizable pizza + 1 pizza free</p>
        </div>
        <div className="features">
          <img id="img1" src="https://img.freepik.com/premium-photo/top-view-pizza-with-tomato-olives-capsicum-ai-generated-high-quality-pizza_1020331-11437.jpg" />
          <p>🍕🔥Hot, Fresh & Delivered To Your Doorstep</p>
          <p id="cust-feature">🍕Build Your Own Pizza — Choose base, sauce, cheese & toppings.</p>
          <img id="img2" src="/cust-pizza.png" />
          <button type="submit"><a href="/customize-pizza">Start building</a></button>
        </div>
          <div className="best-sellers">
            <img src="https://api.dominos.co.in/prod-olo-api/contents/home-cms/aAkqT7DxtxYFTQfcAuPU9XM1e2zYY21KngQDeXBz.png" />
            <h1>Best sellers in India</h1>
          </div>
          <div className="top-3">
            {topPizza.map((item)=>(
            <div className="best-selling">
              <img src={item.image} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button>₹ {item.price}</button>
            </div>
          ))}
          </div>
        <div className="review">
          <h2>Review Section</h2>
          <div className="ratings">
            <div className="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <p>Best pizza in town!</p>
          </div>
          <div className="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <p>Amazing features for customizing pizza!</p>
          </div>
          <div className="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <p>Delivery faster than expected!</p>
          </div>
          <div className="rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <p>Best pizza in town!</p>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Home;
