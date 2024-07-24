"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true,
        maxlength: 500
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
const menuSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: new mongoose.Types.ObjectId(),
        ref: 'Restaurant'
    },
    description: {
        type: String,
        required: true
    }
});
const restSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    deliveryEstimate: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: [],
    },
    reviews: {
        type: [reviewSchema],
        required: false,
        select: false,
        default: [],
    }
});
exports.Restaurant = mongoose.model('Restaurant', restSchema);
