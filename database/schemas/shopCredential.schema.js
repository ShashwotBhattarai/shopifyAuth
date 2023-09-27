const mongoose = require("mongoose");

const shopCredentialsSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  access_token: { type: String, required: true },
});

const ShopCredentials = mongoose.model("ShopCredentials", shopCredentialsSchema);
module.exports = ShopCredentials;