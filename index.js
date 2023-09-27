const express= require('express');
const app= express();

const SHOPIFY_API_KEY = "54f776fc8540393fb02b6b7cd8d1e7ed";
const SHOPIFY_API_SECRET = "4019bcec519041faa1eb67efed82d95a";
const REDIRECT_URI = "http://localhost:3000/shopify/auth/redirect"


app.listen(3000,()=>{
    console.log("server started at port 3000");
})


app.get('/shopify/auth', (req, res) => {
    const shop = req.query.shop;
    console.log("inside auth");
  
    // Redirect the user to Shopify's authorization URL
    res.redirect(`https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products&redirect_uri=${REDIRECT_URI}`);
  });


  app.get('/shopify/auth/redirect', async (req, res) => {
    const { code, shop } = req.query;
  
    // Exchange the authorization code for an access token
    const accessTokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });
  
    // Store the access token securely (e.g., in a database)
    const accessToken = accessTokenResponse.data.access_token;

    console.log(accessToken);
  
    // Now you can use the accessToken to make API requests on behalf of the user
    // ...
  
    res.send('OAuth successful! You can now make Shopify API requests.');
  });
  