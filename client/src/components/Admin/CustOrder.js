import React, { useEffect, useState } from "react";
import axios from "axios";

const CustOrder = () => {
  const [info, setInfo] = useState([]);
  const [custInfo, setCustInfo] = useState([]);
  const [status, setStatus] = useState("");

  const saveStatus = async (orderId) => {
    const res = await axios.put(
      "http://localhost:8080/api/order/updateStatus",
      { orderId, status }
    );
    const updated = res.data.updateStatus.status;
    console.log(updated);
    setInfo((prev) =>
      prev.map((order) =>
        order._id === updated._id ? { ...order, status: updated } : order
      )
    );
  };
  const saveCustStatus=async(custId)=>{
    try {
      const res=await axios.put('http://localhost:8080/api/v1/user/updateCustStatus',{custId,status});
      const updatedCust=res.data.updateCustStatus.status;
      setCustInfo(prev=>
        prev.map((custOrder)=>
          custOrder._id===updatedCust._id?{...custOrder,status:updatedCust}:custOrder
        )
      )
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const showOrders = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/order/show-orders"
      );
      setInfo(res && res.data.orderInfo);
      setCustInfo(res && res.data.custOrderInfo);
    };
    showOrders();
  }, []);

  return (
    <div className="cust-order">
      <table id="table1">
        <h2>Pizza Orders</h2>
        <tr>
          <th>Customer Name</th>
          <th>Order items</th>
          <th>Contact</th>
          <th>Order status</th>
        </tr>
        {info.map((data, i) => (
          <tr>
            <td>{data.custName}</td>
            <td id="order1">{data.order.join(',')}</td>
            <td id="contact1">{data.contact}</td>
            <td id="status1">
              <select
                key={i}
                onChange={(e) => setStatus(e.target.value)}
                value={data.status}
              >
                <option value="Order received">Order received</option>
                <option value="In the kitchen">In the kitchen</option>
                <option value="Sent to delivery">Sent to delivery</option>
              </select>
            </td>
            <button onClick={() => saveStatus({ orderId: data._id })}>
              Save
            </button>
          </tr>
        ))}
      </table>
      <table id="table2">
        <h2>Custom Pizza Orders</h2>
        <tr>
          <th>Customer name</th>
          <th>Custom Pizza Contents</th>
          <th>Contact</th>
          <th>Order status</th>
        </tr>
        {custInfo.map((custPizza, i) => (
          <tr>
            <td>{custPizza.custName}</td>
            <td id="order2">{custPizza.base},{custPizza.sauce},{custPizza.cheeseType},{custPizza.veggies}</td>
            <td id="contact2">{custPizza.contact}</td>
            <td id="status2">
              <select onChange={(e)=>setStatus(e.target.value)} value={custPizza.status}>
                <option value="Order received">Order received</option>
                <option value="In the kitchen">In the kitchen</option>
                <option value="Sent to delivery">Sent to delivery</option>
              </select>
            </td>
            <button  onClick={()=>saveCustStatus({custId:custPizza._id})}>Save</button>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CustOrder;
