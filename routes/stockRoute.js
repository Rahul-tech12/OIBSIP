import express from "express";
import stockModel from "../models/Admin model/stockModel.js";
import custStockModel from "../models/Admin model/custStockModel.js";
import nodemailer from 'nodemailer';
const router = express.Router();

//stock
router.put("/add-stock", async (req, res) => {
  try {
    const { stockId, stockQuantity } = req.body;
    console.log(stockQuantity);
    const stock = await stockModel.findByIdAndUpdate(
      stockId.stockId,
      { quantity: stockQuantity },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Stock added successfully",
      stock,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.put("/remove-stock", async (req, res) => {
  try {
    const { name } = req.body;
    const checkQuantity = await stockModel.find({ name });
    checkQuantity.map((orderedItem) => {
        if(orderedItem.quantity<1){
            console.log(orderedItem.name,"is not available");
        }
  });
    const updatedStock = await stockModel.updateMany({name},{$inc:{quantity:-1}});
    const updatedQuantity = await stockModel.find({ name });
    updatedQuantity.map((orderedItem) => {
        if(orderedItem.quantity<20){
            lessStockAlert(orderedItem.name,orderedItem.quantity)
        }
  });
    res.status(200).send({
      message: "Stock removed",
      updatedStock,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

const lessStockAlert=async(name,quantity)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER_EMAIL,
            pass:'dqqp cxns kizx nnoe'
    }
})
    const body={
      from:`"Pizza App" <1122rahulchoudhary@gmail.com>`,
      to:process.env.ADMIN_EMAIL,
      subject:`Low Stock Alert: ${name}`,
      html:`
        <p>Dear Admin,</p>
    <p>This is an automated notification to inform you that the stock level for the following item has fallen below the defined threshold:</p>
    <ul>
      <li><strong>Item:</strong> ${name}</li>
      <li><strong>Current Stock:</strong> ${quantity} units</li>
      <li><strong>Threshold:</strong> 20 units</li>
    </ul>
    <p>Please review the inventory and take appropriate action to replenish the stock to avoid potential order fulfillment issues.</p>
    <p>If you have any questions or require assistance, feel free to contact the operations team.</p>
    <br/>
    <p>Best regards,<br/><strong>Pizza Delivery System</strong></p>
    <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
      `
    }

    try {
      await transporter.sendMail(body);
      console.log('email sent successfully');
    } catch (error) {
      console.log(error);
    }
}

router.get("/show-stock", async (req, res) => {
  try {
    const stockInfo = await stockModel.find({});
    res.status(200).send({
      stockInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.get("/show-custstock", async (req, res) => {
  try {
    const custStockInfo = await custStockModel.find({});
    console.log(custStockInfo[0]);
    res.status(200).send({
      custStockInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

export default router;
