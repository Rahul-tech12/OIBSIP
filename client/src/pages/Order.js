import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [custOrders, setCustOrders] = useState([]);
  useEffect(()=>{
    const showOrders=async()=>{
      const res=await axios.get('http://localhost:8080/api/order/show-orders');
      setOrders(res && res.data.orderInfo);
      setCustOrders(res && res.data.custOrderInfo);
    }
    showOrders();
  },[]);
  return (
    <Layout>
      <div className='pizza-orders'>
        <h3>Pizza Orders</h3>
        {orders.map((item,i)=>(
          <div className='order' key={i}>
            <p id='pizzaName'> {item.order.join(",")}</p>
            <p id='status'>{item.status}</p>
          </div>
        ))}
      </div>
        <div className='custpizza-orders'>
          <h3>Custom Pizza Orders</h3>
        {custOrders.map((item,i)=>(
          <div className='order' key={i}>
            <p id='custPizzaName'> <b>Base: </b>{item.base} <b>Sauce: </b>{item.sauce}   <b> Cheese Type: </b>{item.cheeseType}  <b> Veggies: </b>{item.veggies}</p>
            <p id='status'>{item.status}</p>
          </div>
        ))}
        </div>
    </Layout>
  )
}

export default Order