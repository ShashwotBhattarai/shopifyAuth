const express= require('express');
const router = express.Router();
const axios = require('axios');



require('dotenv').config();


const mongoose = require('mongoose');
const ShopCredentials = require('../database/schemas/shopCredential.schema');



const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


router.get('/shopify/auth', (req, res) => {
    const shop = req.query.shop;
    console.log("shop "+shop);
    console.log("inside auth");
    res.redirect(`https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products&redirect_uri=${REDIRECT_URI}`);
  });


  router.get('/shopify/auth/redirect', async (req, res) => {
    const { code, shop } = req.query;
    console.log("code"+code);
    const accessTokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });

    const accessToken = accessTokenResponse.data.access_token;

    console.log(accessToken);

    saveShopCredentials(shop, accessToken);



    res.send('OAuth successful');
  });

  async function saveShopCredentials(shop, access_token) {
    try {
      const newShopCredentials = new ShopCredentials({
        shop: shop,
        access_token: access_token,
      });
      const savedCredentials = await newShopCredentials.save();
  
      console.log('Shop credentials saved:', savedCredentials);
    } catch (error) {
      console.error('Error saving shop credentials:', error);
    } 
  }

  module.exports = router;