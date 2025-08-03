import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDb from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import pizzaRoute from './routes/pizzaRoute.js';
import orderRoute from './routes/orderRoute.js';
import stockRoute from './routes/stockRoute.js';
import protectedRoute from './routes/protectedRoute.js';
import adminRoute from './routes/adminRoute.js';

const app=express();
dotenv.config();
connectDb();

const pizzas=[
    {id:"1",name:"Kadhai Paneer",description:"Take your taste buds on a joyride with juicy marinated paneer, capsicum, and onion, all coated in flavorful Kadhai sauce",price:249,image:"https://tse4.mm.bing.net/th/id/OIP.Y4oWDhQTGE2n4-sZgFMZewHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"},
    {id:"2",name:"Royal Spice Paneer",description:"Indulge in a royal delight with juicy marinated paneer, tomato, onion, and a sauce packed with rich, aromatic spices.",price:359,image:"https://tse1.mm.bing.net/th/id/OIP.Z7EXNE9xfN75JCec82ZhEQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"},
    {id:"3",name:"Southern Fiery Paneer",description:"Spice up your day with pizza topped with juicy marinated paneer, green capsicum, tomato, and a fiery sauce bursting with traditional southern spices.",price:349,image:"https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/southern-fiery-paneer.2016b6a53c922daa654e3ae70867ee2a.1.jpg"},
    {id:"4",name:"Classic Onion Capsicum",description:"Pizza topped with our classic pan sauce, crunchy onion & capsicum and a flavourful dressing.",price:79,image:"https://tse3.mm.bing.net/th/id/OIP.XBaua_9b4ncUxWkXiC70jQHaE_?rs=1&pid=ImgDetMain&o=7&rm=3"},
    {id:"5",name:"Classic Corn",description:"Pizza topped with our classic pan sauce, sweet corn and a flavourful dressing. An all time favorite",price:99,image:"https://images.dominos.co.in/new_cheese_n_corn.jpg"},
    {id:"6",name:"Chatpata Tomato Onion & Chilli",description:"Pizza topped with a spicy tandoori sauce, juicy tomato, crunchy onion & green chilli for an extra zing and a flavourful dressing.",price:129,image:"https://foodoncall.co.in/wp-content/uploads/2017/10/chatpata-paneer-pizza.jpg"},
    {id:"7",name:"Margherita",description:"Pizza topped with our herb-infused signature pan sauce and 100% mozzarella cheese. A classic treat for all cheese lovers out there!",price:139,image:"https://tse2.mm.bing.net/th/id/OIP.Rp6u4rmsNsJ_7t_SeWzuCgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"}
  ]

app.use(express.json());
app.use(cors());
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',pizzaRoute);
app.use('/api/order',orderRoute);
app.use('/api/stock',stockRoute);
app.use('/api/protected',protectedRoute);
app.use('/api/admin',adminRoute);

app.get('',(req,res)=>{
    res.send('Welcome to server');
})
app.get('/api/pizzas',(req,res)=>{
    res.json(pizzas);
});

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgBlue.gray);
})