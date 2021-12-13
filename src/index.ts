"use strict";
import { strict } from "assert/strict";
import express from "express";
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000 // default port to listen

// define a route handler for the default home page
app.get("/", async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');


    axios.post("https://sandbox.cashfree.com/pg/orders", {
        order_id: "order_" + Math.floor(Math.random() * 1000000) + 1,
        order_amount: 10.12,
        order_currency: "INR",
        customer_details: {
            customer_id: "12345",
            customer_email: "techsupport@cashfree.com",
            customer_phone: "9816512345"
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-version': '2021-05-21',
            'x-client-id': 'your client id',
            'x-client-secret': 'your screte id'
        }
    })
        .then((response: any) => {
            console.log('res', response.data);
            res.send(response.data);
        })
        .catch((error) => {
            console.log('error', error);
            res.send(error);
        })
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});