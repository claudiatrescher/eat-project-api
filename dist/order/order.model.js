"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    optionAddress: {
        type: String,
        required: false
    },
    paymentOptions: {
        type: String,
        required: true
    }
});
exports.Order = mongoose.model('Order', orderSchema);
