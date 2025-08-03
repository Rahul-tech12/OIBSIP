import React, { useEffect, useState } from "react";
import axios from "axios";

const Stock = () => {
  const [pizzaName, setPizzaName] = useState([]);
  const [upQuantity, setUpQuantity] = useState([]);
  const [custPizza, setCustPizza] = useState(null);

  const addPizza = async (stockId, stockQuantity) => {
    try {
      const res = await axios.put("http://localhost:8080/api/stock/add-stock", {
        stockId,
        stockQuantity: stockQuantity.stockQuantity + 1,
      });
      setUpQuantity(res && res.data.stock);
      console.log(stockQuantity.stockQuantity);
      setPizzaName((prev) =>
        prev.map((prevInfo) =>
          prevInfo._id === upQuantity._id
            ? { ...prevInfo, quantity: upQuantity.quantity }
            : prevInfo
        )
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPizzaInfo = async () => {
      const res = await axios.get("http://localhost:8080/api/stock/show-stock");
      setPizzaName(res && res.data.stockInfo);
    };

    const getCustInfo=async()=>{
      const custres = await axios.get("http://localhost:8080/api/stock/show-custstock");
      const map=custres.data.custStockInfo[0];
      setCustPizza({
        base:Object.fromEntries(Object.entries(map.base)),
        sauce:Object.fromEntries(Object.entries(map.sauce)),
        cheese:Object.fromEntries(Object.entries(map.cheeseType)),
        veggies:Object.fromEntries(Object.entries(map.veggies))
      });
      console.log(custres.data.custStockInfo[0].base);
      console.log(custPizza)
    }

    getPizzaInfo();
    getCustInfo();
  }, []);
  return (
    <>
      <div className="stock">
        <div className="pizza-stock">
        <h2>Pizza Stock</h2>
        <table>
          <tr>
            <th>Pizza Name</th>
            <th>Quantity</th>
          </tr>
          {pizzaName.map((pizzaInfo, i) => (
            <tr key={i}>
              <td>{pizzaInfo.name}</td>
              <td>{pizzaInfo.quantity}</td>
              <button
                onClick={() =>
                  addPizza(
                    { stockId: pizzaInfo._id },
                    { stockQuantity: pizzaInfo.quantity }
                  )
                }
              >
                Add pizza
              </button>
            </tr>
          ))}
        </table>
      </div>
      <div className="cust-stock">
        <h2>Ingredients Stock</h2>
        <table>
          <tr>
            <th>Pizza Base</th>
            <th>Quantity</th>
          </tr>
          {custPizza && Object.entries(custPizza.base).map(([name,quantity])=>(
           <tr>
              <td>{name}</td>
              <td>{quantity}</td>
              <button>Add quantity</button>
           </tr>
          ))
          }
        </table>
        <table>
          <tr>
            <th>Sauce</th>
            <th>Quantity</th>
          </tr>
          {custPizza && Object.entries(custPizza.sauce).map(([name,quantity])=>(
           <tr>
              <td>{name}</td>
              <td>{quantity}</td>
              <button>Add quantity</button>
           </tr>
          ))}
        </table>
        <table>
          <tr>
            <th>Cheese Type</th>
            <th>Quantity</th>
          </tr>
          {custPizza && Object.entries(custPizza.cheese).map(([name,quantity])=>(
           <tr>
              <td>{name}</td>
              <td>{quantity}</td>
              <button>Add quantity</button>
           </tr>
          ))
          }
        </table>
        <table>
          <tr>
            <th>Veggies</th>
            <th>Quantity</th>
          </tr>
          {custPizza && Object.entries(custPizza.veggies).map(([name,quantity])=>(
           <tr>
              <td>{name}</td>
              <td>{quantity}</td>
              <button>Add quantity</button>
           </tr>
          ))
          }
        </table>
      </div>
      </div>
    </>
  );
};

export default Stock;
