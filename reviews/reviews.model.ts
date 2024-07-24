
import * as mongoose from 'mongoose'
import {  Restaurant1 } from '../restaurants/restaurants.model'
import { User } from '../users/users.model'


export interface Review extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId,
    id: string,
    name: string,
    date: Date,
    comments: string,
    rating: number,
    user: mongoose.Types.ObjectId | User
    restaurant: mongoose.Types.ObjectId | Restaurant1 ,


}


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
   

})


export const Review = mongoose.model<Review>('Review', reviewSchema )